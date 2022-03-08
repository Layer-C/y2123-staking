import { AppLayout, Button, CsSelectSection, Form } from 'components';
import { FaChevronLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useNotification } from 'hooks';
import { CitizenScientist } from 'types/citizenScientist';
import Link from 'next/link';
import { createContract } from 'contract';
import { useAccountContext } from 'contexts/Account';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

let timeoutId: NodeJS.Timeout;

const Stake = () => {
  const router = useRouter();
  const methods = useForm();
  const { watch, setValue, reset } = methods;
  const selectedCs = watch('selectedCs');
  const {
    accountData: { stakedNft: stakedCs },
    getAccountData,
    setShowLoading,
  } = useAccountContext();

  const notification = useNotification();

  const handleSubmit = async () => {
    try {
      const contract = createContract();
      contract.on('Unstake', (from, to, amount, event) => {
        contract.removeAllListeners();
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(async () => {
          await getAccountData();
          router.replace('/?unstake-successful=true');
        }, 1000);
      });
      await contract.unstake(process.env.NEXT_PUBLIC_Y2123_CONTRACT, selectedCs);
      setShowLoading(true);
    } catch (error) {
      console.log(error);
      notification.show({ type: 'error', content: 'UNSTAKING FAILED' });
    }
    router.push('/');
  };

  useEffect(() => {
    getAccountData();
  }, []);

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
                    stakedCs.map(({ name }: CitizenScientist) => name.split('#')[1])
                  )
                }>
                Select All
              </Button>
            </div>
          </div>
          <CsSelectSection label='SELECT NFTS TO UNSTAKE' cs={stakedCs} />
          <div className='fixed bottom-0 left-0 w-full h-20 bg-blue-1'>
            <div className='w-[740px] h-full mx-auto flex items-center justify-between'>
              <div className='text-base font-bold text-white font-disketMono'>
                {selectedCs?.length || 0} NFTs SELECTED
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
