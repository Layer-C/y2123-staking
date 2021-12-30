import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { AppLayout, Button, Tabs } from 'components';
import { useStake } from 'hooks';
import { NumberUtils } from 'utils/number';
import { CsList } from './CsList';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const StakingSection = ({}: Props) => {
  const {
    data: { allCs, claimableTokens, clan, lastTokensEarned, stakedCs, totalTokensEarned, unstakedCs },
  } = useStake();

  const { active, account } = useWeb3React();

  return (
    <AppLayout.Section label='staking'>
      <div className='flex justify-between'>
        <div>
          <div className='text-gray-1'>Total Citizen Scientist Owned</div>
          <div className='text-blue-1 text-[44px] font-disketMono font-bold'>{NumberUtils.pad(allCs.length)}</div>
          <div className='flex items-center gap-10'>
            <div>
              <div className='text-gray-1'>Total $OXGN Earned Ever</div>
              <div className='text-xl font-disketMono'>{NumberUtils.pad(totalTokensEarned)}</div>
            </div>
            <div>
              <div className='text-gray-1'>$OXGN Earned Since Last Claim</div>
              <div className='text-xl font-disketMono'>{NumberUtils.pad(lastTokensEarned)}</div>
            </div>
          </div>
        </div>
        <div className='w-[120px] h-[120px] flex flex-col items-center justify-center border border-solid border-gray-1'>
          <div className='box-content w-1 h-1 border-[10px] border-solid rounded-full border-gray-2 mb-2'></div>
          <div className='text-gray-1'>No Clan</div>
          <Button variant='link' size='sm' as='a' href='#clans'>
            Stake Now
          </Button>
        </div>
      </div>

      <div
        style={{
          background:
            'linear-gradient(90deg, rgba(43, 242, 255, 0.2) 0%, rgba(43, 242, 255, 0.2) 0.01%, rgba(43, 242, 255, 0) 100%, rgba(43, 242, 255, 0.17) 100%)',
        }}
        className={classNames(
          'flex mt-5 pl-4 items-center justify-between border-l-4 border-solid border-cyan-1 h-[74px]'
        )}>
        <div className='flex items-center'>
          <div className='font-disketMono text-[44px] font-bold'>{NumberUtils.pad(claimableTokens)}</div>
          <div className='ml-2 text-sm uppercase break-words whitespace-pre'>{'OXGN\nClaimable'}</div>
        </div>
        {active && account && <Button disabled={claimableTokens === 0}>CLAIM TOKEN</Button>}
      </div>

      <Tabs
        className='mt-10'
        tabs={[
          {
            label: 'UNSTAKED',
            content: (
              <div>
                <div className='text-gray-1'>{unstakedCs.length} Unstaked CS</div>
                {!!unstakedCs.length && <CsList items={unstakedCs} />}
              </div>
            ),
            value: 'unstaked',
          },
          {
            label: 'STAKE',
            content: (
              <div>
                <div className='text-gray-1'>{stakedCs.length} Staked CS</div>
                {!!stakedCs.length && <CsList items={stakedCs} />}
              </div>
            ),
            value: 'stake',
          },
          {
            label: 'ALL',
            content: (
              <div>
                <div className='text-gray-1'>{allCs.length} CS</div>
                {!!allCs.length && <CsList items={allCs} />}
              </div>
            ),
            value: 'all',
          },
        ]}
        collapsible
      />

      {!allCs.length && (
        <div className='flex flex-col items-center mt-5'>
          <div>No Citizen Scientist Owned. Purchase now to start the game.</div>
          <Button className='mt-4 uppercase'>BUY NOW</Button>
        </div>
      )}
    </AppLayout.Section>
  );
};