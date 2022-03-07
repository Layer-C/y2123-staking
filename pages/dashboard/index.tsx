import { StakeApis } from 'apis/stake';
import { AppLayout, StakingSection, ClanSection, Carousel, ConditionalWrapper, UnstakeSuccessModal } from 'components';
import { useServerSideProps } from 'hooks/useServerSideProps';
import type { InferGetServerSidePropsType } from 'next';
import { FaCog } from 'react-icons/fa';
import Image from 'next/image';
import { useViewport, useVisibilityControl } from 'hooks';
import { useAccountContext } from 'contexts/Account';
import NoSSR from 'components/NoSSR';
import ReactTooltip from 'react-tooltip';
import { useLocation } from 'react-use';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps() {
  const data = await StakeApis.get();

  return {
    props: { data },
  };
}

export const LoadingOverlay = () => (
  <div
    className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black opacity-50'
    style={{ zIndex: 100 }}>
    <svg
      className='animate-spin -ml-1 mr-3 h-10 w-10 text-white'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
    </svg>
  </div>
);

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useServerSideProps('stakeData', data);
  const { viewport } = useViewport();
  const location = useLocation();
  const router = useRouter();
  const { showLoading } = useAccountContext();
  const unstakeSuccessModalControl = useVisibilityControl();

  useEffect(() => {
    if (location.search?.includes('unstake-successful=true')) {
      unstakeSuccessModalControl.show();
      router.replace('/dashboard');
    }
  }, [location.search]);

  return (
    <>
      <AppLayout background='/dashboard-background.png'>
        <UnstakeSuccessModal control={unstakeSuccessModalControl} />
        <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2 backdrop-blur-[50px]'></AppLayout.Header>
        <AppLayout.MainContent>
          {showLoading && <LoadingOverlay />}
          <div className='grid grid-cols-2 gap-3 mb-[57px] sm:grid-cols-1'>
            <ConditionalWrapper active={viewport === 'sm'} component={Carousel} max={2} dots arrows={false}>
              <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} index={0}>
                <AppLayout.Section className='p-5 font-disketMono'>
                  <div className='font-bold text-md'>EARN $OXGN, BUY LAND</div>
                  <div className='flex items-center justify-between mt-7 gap-1'>
                    <div>
                      <div className='text-xl font-bold'></div>
                      <div className='text-xs'>
                        Land Sales coming soon in April 2022.Only available for purchase with $OXGN.
                      </div>
                    </div>
                    <Image src='/Y2123-Land.gif' alt='' width='150px' height='150px' />
                  </div>
                </AppLayout.Section>
              </ConditionalWrapper>
              <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} index={1}>
                <AppLayout.Section className='p-5 font-disketMono'>
                  <div className='flex items-center justify-between'>
                    <div className='font-bold text-md'>1 $OXGN = 1 $OXGN</div>
                    <FaCog size={20} />
                  </div>
                  <div className='mt-5 text-xs'>
                    $OXGN is an ERC-20 token that has no monetary value. Rebuilding Earth is a dangerous endeavour. Play
                    at your own risk.
                  </div>
                </AppLayout.Section>
              </ConditionalWrapper>
            </ConditionalWrapper>
          </div>
          <StakingSection />
          <ClanSection className='mt-[57px]' />
        </AppLayout.MainContent>
      </AppLayout>
      <NoSSR>
        <ReactTooltip place='top' effect='solid' />
      </NoSSR>
    </>
  );
};

export default Home;
