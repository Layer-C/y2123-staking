import { AppLayout, Button, CsSelectSection, Form } from 'components';
import { useAccountContext } from 'contexts/Account';
import { createContract } from 'contract';
import { useNotification } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaChevronLeft } from 'react-icons/fa';
import { CitizenScientist } from 'types/citizenScientist';

let timeoutId: NodeJS.Timeout;

const Stake = () => {
  const router = useRouter();

  const clanId = (router.query.id || '') as string;

  const methods = useForm();
  const { watch, setValue, reset } = methods;
  const selectedCs = watch('selectedCs');
  const {
    accountData: { unstakedNft: unstakedCs },
    getAccountData,
    setShowLoading,
  } = useAccountContext();

  const notification = useNotification();

  const handleSubmit = async () => {
    try {
      const contract = createContract();
      contract.on('Stake', async (from, to, amount, event) => {
        contract.removeAllListeners();
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(async () => {
          await getAccountData();
          notification.show({
            type: 'success',
            content: 'STAKING SUCCESSFUL',
          });
        }, 1000);
      });
      await contract.stake(process.env.NEXT_PUBLIC_Y2123_CONTRACT, selectedCs, clanId);
      setShowLoading(true);
    } catch (error) {
      console.log(error);
      notification.show({
        type: 'error',
        content: 'STAKING FAILED',
      });
    }
    router.push('/');
  };

  return (
    <AppLayout background='/dashboard-background.png'>
      <AppLayout.Header title='Y2123' className='bg-purplish-gray-2 backdrop-blur-[50px]'></AppLayout.Header>
      <AppLayout.MainContent className='pb-20'>
        <Form methods={methods} onSubmit={handleSubmit}>
          <div className='flex items-center justify-between'>
            <Link href='/' passHref>
              <Button colorScheme='secondary'>
                <FaChevronLeft size={10} className='mr-2' />
                Back
              </Button>
            </Link>
            <div>
              <Button colorScheme='default' variant='link' className='underline' onClick={() => reset()}>
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
          <CsSelectSection label='SELECT NFTs TO STAKE' cs={unstakedCs} />
          <div className='fixed bottom-0 left-0 w-full h-20 bg-blue-1'>
            <div className='max-w-[740px] h-full mx-auto flex items-center justify-between px-6'>
              <div className='text-base font-bold text-white font-disketMono'>
                {selectedCs?.length || 0} NFTs SELECTED
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
