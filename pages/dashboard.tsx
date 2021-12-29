import classNames from 'classnames';
import { AppLayout, Button, Tabs } from 'components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <AppLayout background='/dashboard-background.png'>
      <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2 backdrop-blur-[50px]'></AppLayout.Header>
      <AppLayout.MainContent>
        <AppLayout.Section label='staking'>
          <div className='flex justify-between'>
            <div>
              <div className='text-gray-1'>Total Citizen Scientist Owned</div>
              <div className='text-blue-1 text-[44px] font-disketMono font-bold'>00</div>
              <div className='flex items-center gap-10'>
                <div>
                  <div className='text-gray-1'>Total $OXGN Earned Ever</div>
                  <div className='text-xl font-disketMono'>00</div>
                </div>
                <div>
                  <div className='text-gray-1'>$OXGN Earned Since Last Claim</div>
                  <div className='text-xl font-disketMono'>00</div>
                </div>
              </div>
            </div>
            <div className='w-[120px] h-[120px] flex flex-col items-center justify-center border border-solid border-gray-1'>
              <div className='box-content w-1 h-1 border-[10px] border-solid rounded-full border-gray-2 mb-2'></div>
              <div className='text-gray-1'>No Clan</div>
              <Button variant='link' size='sm'>
                Stake Now
              </Button>
            </div>
          </div>

          <div
            style={{
              background:
                'linear-gradient(90deg, rgba(43, 242, 255, 0.2) 0%, rgba(43, 242, 255, 0.2) 0.01%, rgba(43, 242, 255, 0) 100%, rgba(43, 242, 255, 0.17) 100%)',
            }}
            className={classNames('flex mt-5 px-4 items-center border-l-4 border-solid border-cyan-1 h-[74px]')}>
            <div className='font-disketMono text-[44px] font-bold'>00</div>
            <div className='ml-2 text-sm uppercase break-words whitespace-pre'>{'OXGN\nClaimable'}</div>
          </div>

          <Tabs
            className='mt-10'
            tabs={[
              { label: 'UNSTAKED', content: <div className='text-gray-1'>0 Unstaked CS</div>, value: 'unstaked' },
              { label: 'STAKE', content: <div className='text-gray-1'>0 Staked CS</div>, value: 'stake' },
              { label: 'ALL', content: <div className='text-gray-1'>0 CS</div>, value: 'all' },
            ]}
            collapsible
          />

          <div className='flex flex-col items-center mt-5'>
            <div>No Citizen Scientist Owned. Purchase now to start the game.</div>
            <Button className='mt-4 uppercase'>BUY NOW</Button>
          </div>
        </AppLayout.Section>
      </AppLayout.MainContent>
    </AppLayout>
  );
};

export default Home;
