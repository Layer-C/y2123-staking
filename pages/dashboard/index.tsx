import { StakeApis } from 'apis/stake';
import { AppLayout, StakingSection, ClanSection, LeaderBoardSection, Carousel, ConditionalWrapper } from 'components';
import { useServerSideProps } from 'hooks/useServerSideProps';
import type { InferGetServerSidePropsType } from 'next';
import { FaCog } from 'react-icons/fa';
import Xmas from 'public/icons/xmas.svg';
import { useViewport } from 'hooks';

export async function getServerSideProps() {
  const data = await StakeApis.get();

  return {
    props: { data },
  };
}

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useServerSideProps('stakeData', data);
  const { viewport } = useViewport();

  return (
    <AppLayout background='/dashboard-background.png'>
      <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2 backdrop-blur-[50px]'></AppLayout.Header>
      <AppLayout.MainContent>
        <div className='grid grid-cols-2 gap-3 mb-[57px] sm:grid-cols-1'>
          <ConditionalWrapper active={viewport === 'sm'} component={Carousel} max={2} dots arrows={false}>
            <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} index={0}>
              <AppLayout.Section className='p-5 font-disketMono'>
                <div className='font-bold text-md'>ANNOUNCEMENTS</div>
                <div className='flex items-center justify-between mt-7'>
                  <div>
                    <div className='text-xl font-bold'>XMAS SALES!</div>
                    <div className='text-xs'>5% OFF TRANSACTION FEE for the month of december!</div>
                  </div>
                  <Xmas className='flex-shrink-0' />
                </div>
              </AppLayout.Section>
            </ConditionalWrapper>
            <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} index={1}>
              <AppLayout.Section className='p-5 font-disketMono'>
                <div className='flex items-center justify-between'>
                  <div className='font-bold text-md'>NEWS or maintainence</div>
                  <FaCog size={20} />
                </div>
                <div className='mt-5 text-xs'>
                  to maintain stability of the server, we will be offline at 14:00 to 22:00 on 21/01/2021
                </div>
              </AppLayout.Section>
            </ConditionalWrapper>
          </ConditionalWrapper>
        </div>
        <StakingSection />
        <ClanSection className='mt-[57px]' />
      </AppLayout.MainContent>
    </AppLayout>
  );
};

export default Home;
