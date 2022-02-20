import { AppLayout, Button, CsSelectSection, Form } from 'components';
import { useRouter } from 'next/router';
import { FaCheckSquare, FaChevronLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useStake, useNotification, useVisibilityControl } from 'hooks';
import { CitizenScientist } from 'types/citizenScientist';
import Link from 'next/link';
import TimesSquare from 'public/icons/times-square.svg';
import { UnstakeErrorModal } from 'components/UnstakeErrorModal';
import { UnstakeSuccessModal } from 'components/UnstakeSuccessModal';
import { createContract } from 'contract';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
const Stake = ({}: Props) => {
  const router = useRouter();

  const clanId = (router.query.id || '') as string;

  const methods = useForm();
  const { watch, setValue } = methods;
  const selectedCs = watch('selectedCs');

  const {
    data: { stakedCs },
  } = useStake();

  const notification = useNotification();

  const handleSubmit = async (value: any) => {
    try {
      const contract = createContract();
      const transaction = await contract.unstake(process.env.Y2123_CONTRACT, selectedCs);
      unstakeSuccessModalControl.show();
      return transaction;
    } catch (error) {
      notification.show({ type: 'error', content: 'UNSTAKING FAILED' });
      router.push('/dashboard');
    }
  };

  const unstakeSuccessModalControl = useVisibilityControl();

  return (
    <AppLayout background='/dashboard-background.png'>
      <UnstakeSuccessModal control={unstakeSuccessModalControl} />
      <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2 backdrop-blur-[50px]'></AppLayout.Header>
      <AppLayout.MainContent className='pb-20'>
        <Form methods={methods} onSubmit={handleSubmit}>
          <div className='flex items-center justify-between'>
            <Link href='/dashboard' passHref>
              <Button colorScheme='secondary'>
                <FaChevronLeft size={10} className='mr-2' />
                Back
              </Button>
            </Link>
            <div>
              <Button
                colorScheme='default'
                variant='link'
                className='underline'
                onClick={() => setValue('selectedCs', [])}>
                Reset
              </Button>
              <Button
                colorScheme='default'
                variant='link'
                className='ml-5 underline'
                onClick={() =>
                  setValue(
                    'selectedCs',
                    stakedCs.map(({ id }: CitizenScientist) => id)
                  )
                }>
                Select All
              </Button>
            </div>
          </div>
          <CsSelectSection label='PLEASE SELECT Citizen scientist to UNSTAKE' cs={stakedCs} />
          <div className='fixed bottom-0 left-0 w-full h-20 bg-blue-1'>
            <div className='w-[740px] h-full mx-auto flex items-center justify-between'>
              <div className='text-base font-bold text-white font-disketMono'>
                {selectedCs?.length || 0} scientists selected
              </div>
              <Button variant='outline' colorScheme='default' disabled={!selectedCs?.length} type='submit'>
                Unstake Now
              </Button>
            </div>
          </div>
        </Form>
      </AppLayout.MainContent>
    </AppLayout>
  );
};

export default Stake;
