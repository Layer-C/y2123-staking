import { AppLayout, Button, CsSelectSection, Form } from 'components';
import { useNotification, useStake } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';
import { CitizenScientist } from 'types/citizenScientist';

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
    data: { unstakedCs },
  } = useStake();

  const notification = useNotification();

  const handleSubmit = (value: any) => {
    router.push('/dashboard');

    if (Math.random() > 0.5) {
      notification.show({
        type: 'success',
        content: 'STAKING SUCCESSFUL',
      });
      return;
    }

    notification.show({
      type: 'error',
      content: 'STAKING FAILED',
    });
  };

  return (
    <AppLayout background='/dashboard-background.png'>
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
                    unstakedCs.map(({ id }: CitizenScientist) => id)
                  )
                }>
                Select All
              </Button>
            </div>
          </div>
          <CsSelectSection label='PLEASE SELECT Citizen scientist to stake' cs={unstakedCs} />
          <div className='fixed bottom-0 left-0 w-full h-20 bg-blue-1'>
            <div className='w-[740px] h-full mx-auto flex items-center justify-between'>
              <div className='text-base font-bold text-white font-disketMono'>
                {selectedCs?.length} scientists selected
              </div>
              <Button variant='outline' colorScheme='default' disabled={!selectedCs?.length} type='submit'>
                Stake Now
              </Button>
            </div>
          </div>
        </Form>
      </AppLayout.MainContent>
    </AppLayout>
  );
};

export default Stake;