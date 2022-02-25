import { AppLayout, Button, CsSelectSection, Form } from 'components';
import { useAccountContext } from 'contexts/Account';
import { createContract } from 'contract';
import { useNotification } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';
import { CitizenScientist } from 'types/citizenScientist';

const Stake = () => {
  const router = useRouter();

  const clanId = (router.query.id || '') as string;

  const methods = useForm();
  const { watch, setValue } = methods;
  const selectedCs = watch('selectedCs');
  const {
    accountData: { unstakedNft: unstakedCs },
    getAccountData,
  } = useAccountContext();

  const notification = useNotification();

  const handleSubmit = async () => {
    try {
      const contract = createContract();
      contract.on('Stake', (from, to, amount, event) => {
        getAccountData();
        contract.removeAllListeners();
      });
      await contract.stake(process.env.NEXT_PUBLIC_Y2123_CONTRACT, selectedCs, clanId);
      notification.show({
        type: 'success',
        content: 'STAKING SUCCESSFUL',
      });
    } catch (error) {
      notification.show({
        type: 'error',
        content: 'STAKING FAILED',
      });
    }
    router.push('/dashboard');
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
                    unstakedCs.map(({ name }: CitizenScientist) => name.split('#')[1])
                  )
                }>
                Select All
              </Button>
            </div>
          </div>
          <CsSelectSection label='PLEASE SELECT Citizen scientist to stake' cs={unstakedCs} />
          <div className='fixed bottom-0 left-0 w-full h-20 bg-blue-1'>
            <div className='max-w-[740px] h-full mx-auto flex items-center justify-between px-6'>
              <div className='text-base font-bold text-white font-disketMono'>
                {selectedCs?.length || 0} scientists selected
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
