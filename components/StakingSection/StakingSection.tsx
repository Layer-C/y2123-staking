import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { AppLayout, Button, Tabs } from 'components';
import { useStake } from 'hooks';
import { NumberUtils } from 'utils/number';
import { CsList } from './CsList';
import Image from 'next/image';
import Link from 'next/link';
import { AccountApis } from 'apis/account';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const StakingSection = ({}: Props) => {
  const {
    data: { allCs, claimableTokens, clan, lastTokensEarned, stakedCs, totalTokensEarned, unstakedCs },
  } = useStake();

  const { active, account } = useWeb3React();

  const [accountData, setAccountData] = useState<any>({ unstakedNftz: [], stakedNft: [] });

  useEffect(() => {
    AccountApis.get(account).then(res => res && setAccountData(res));
  }, [account, active]);

  return (
    <AppLayout.Section label='staking'>
      <div className='flex flex-row-reverse justify-between gap-5 sm:flex-col'>
        <div className='w-[120px] h-[120px] flex flex-col items-center justify-center border border-solid border-gray-1 sm:mx-auto'>
          {clan ? (
            <Link href='#clans' passHref>
              <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                <Image src={clan.defaultAvatar} alt='' width={52} height={55} />
              </div>
            </Link>
          ) : (
            <>
              <div className='box-content w-1 h-1 border-[10px] border-solid rounded-full border-gray-2 mb-2'></div>
              <div className='text-gray-1'>No Clan</div>
              <Link href='#clans' passHref>
                <Button variant='link' size='sm'>
                  Stake Now
                </Button>
              </Link>
            </>
          )}
        </div>
        <div>
          <div className='text-gray-1'>Total Citizen Scientist Owned</div>
          <div className='grid items-center w-full grid-cols-2 gap-10 sm:gap-3'>
            <div className='text-blue-1 text-[44px] font-disketMono font-bold'>
              {NumberUtils.pad(accountData.totalCS)}
            </div>
            {active && (
              <div>
                <Button>Buy More</Button>
              </div>
            )}
          </div>
          <div className='grid items-center grid-cols-2 gap-10 sm:grid-cols-1 sm:items-start sm:gap-3'>
            <div>
              <div className='text-gray-1'>Total $OXGN Earned Ever</div>
              <div className='text-xl font-disketMono'>{NumberUtils.pad(accountData.totalClaim)}</div>
            </div>
            <div>
              <div className='text-gray-1'>$OXGN Earned Since Last Claim</div>
              <div className='text-xl font-disketMono'>{NumberUtils.pad(accountData.lastClaim)}</div>
            </div>
          </div>
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
          <div className='font-disketMono text-[44px] font-bold'>{NumberUtils.pad(accountData.claimable)}</div>
          <div className='ml-2 text-sm uppercase break-words whitespace-pre'>{'OXGN\nClaimable'}</div>
        </div>
        {active && account && (
          <div className='sm:hidden'>
            <Link href='/dashboard/claim' passHref>
              <Button disabled={claimableTokens === 0}>CLAIM TOKEN</Button>
            </Link>
          </div>
        )}
      </div>
      {active && account && (
        <div className='justify-center hidden mt-5 sm:flex'>
          <Link href='/dashboard/claim' passHref>
            <Button disabled={claimableTokens === 0}>CLAIM TOKEN</Button>
          </Link>
        </div>
      )}

      <Tabs
        className='mt-10'
        tabs={[
          {
            label: 'UNSTAKED',
            content: (
              <div>
                <div className='text-gray-1'>{accountData.unstakedNft?.length} Unstaked CS</div>
                {!!unstakedCs.length && <CsList items={accountData.unstakedNft} />}
              </div>
            ),
            value: 'unstaked',
          },
          {
            label: 'STAKE',
            content: (
              <div>
                <div className='text-gray-1'>{accountData.stakedNft?.length} Staked CS</div>
                {!!stakedCs.length && <CsList items={accountData.stakedNft} />}
              </div>
            ),
            value: 'stake',
          },
          {
            label: 'ALL',
            content: (
              <div>
                <div className='text-gray-1'>{accountData.unstakedNft?.length + accountData.stakedNft?.length} CS</div>
                {!!(accountData.unstakedNft?.length + accountData.stakedNft?.length) && (
                  <CsList items={[...accountData.unstakedNft, ...accountData.stakedNft]} />
                )}
              </div>
            ),
            value: 'all',
          },
        ]}
        collapsible
      />

      {!allCs.length && (
        <div className='flex flex-col items-center mt-5'>
          <div className='text-center'>No Citizen Scientist Owned. Purchase now to start the game.</div>
          <Button className='mt-4 uppercase'>BUY NOW</Button>
        </div>
      )}
    </AppLayout.Section>
  );
};
