import { AppLayout, Button, CsStakeSelectSection, Form } from 'components';
import { useRouter } from 'next/router';
import { FaCheckSquare, FaChevronLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useStake, useNotification } from 'hooks';
import { CitizenScientist } from 'types/citizenScientist';
import Link from 'next/link';
import TimesSquare from 'public/icons/times-square.svg';

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
    try {
      router.push('/dashboard');
      notification.show({
        content: (
          <div className='flex items-center font-bold uppercase font-disketMono'>
            <FaCheckSquare className='mr-1' size={20} />
            STAKING SUCCESSFUL
          </div>
        ),
      });
    } catch {
      notification.show({
        type: 'error',
        content: (
          <div className='flex items-center font-bold uppercase font-disketMono'>
            <TimesSquare className='mr-1' />
            STAKING FAILED
          </div>
        ),
      });
    }
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
          <CsStakeSelectSection />
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
