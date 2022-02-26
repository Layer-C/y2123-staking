import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { AppLayout, Button, Tabs, UnstakeErrorModal } from 'components';
import { NumberUtils } from 'utils/number';
import { CsList } from './CsList';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useClans } from 'hooks/useClans';
import { useAccountContext } from 'contexts/Account';
import { useRouter } from 'next/router';
import { useVisibilityControl } from 'hooks/useVisibilityControl';

export const StakingSection = () => {
  const router = useRouter();
  const { active, account } = useWeb3React();
  const { data: clans } = useClans();
  const {
    accountData: { allCs, unstakedNft, stakedNft, claimable, totalClaim, lastClaim, totalCS, clanId },
  } = useAccountContext();
  const unstakeErrorModalControl = useVisibilityControl();

  const selectedClan = useMemo(() => clans.find(clan => clan.id === clanId), [clanId, clans]);

  useEffect(() => {
    if (router.query['show-unskate-error-model'] === 'hasClaimable' && !unstakeErrorModalControl.visible) {
      unstakeErrorModalControl.show();
      router.replace('/dashboard');
    }
  }, []);

  return (
    <AppLayout.Section label='staking'>
      <UnstakeErrorModal control={unstakeErrorModalControl} />
      <div className='flex flex-row-reverse justify-between gap-5 sm:flex-col'>
        <div className='w-[120px] h-[120px] flex flex-col items-center justify-center border border-solid border-gray-1 sm:mx-auto'>
          {clanId && selectedClan ? (
            <Link href='#clans' passHref>
              <div className='flex items-center justify-center w-full h-full cursor-pointer'>
                <Image src={selectedClan.defaultAvatar} alt='' width={52} height={55} />
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
          <div className='text-gray-1'>Total NFT(s) Owned</div>
          <div className='grid items-center w-full grid-cols-2 gap-10 sm:gap-3'>
            <div className='text-blue-1 text-[44px] font-disketMono font-bold'>{NumberUtils.pad(totalCS)}</div>
            {active && (
              <div>
                <a href={process.env.NEXT_PUBLIC_OPENSEA_URL} target='_blank' rel='noreferrer'>
                  <Button>Buy More</Button>
                </a>
              </div>
            )}
          </div>
          <div className='grid items-center grid-cols-2 gap-10 sm:grid-cols-1 sm:items-start sm:gap-3'>
            <div>
              <div className='text-gray-1'>Total $OXGN Earned Ever</div>
              <div className='text-xl font-disketMono'>{NumberUtils.pad(totalClaim)}</div>
            </div>
            <div>
              {/* <div className='text-gray-1'>$OXGN Earned Since Last Claim</div>
              <div className='text-xl font-disketMono'>{NumberUtils.pad(lastClaim)}</div> */}
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
          <div className='font-disketMono text-[44px] font-bold'>{NumberUtils.pad(claimable, 2, 2)}</div>
          <div className='ml-2 text-sm uppercase break-words whitespace-pre'>{'OXGN\nClaimable'}</div>
        </div>
        {active && account && (
          <div className='sm:hidden'>
            <Link href='/dashboard/claim' passHref>
              <Button disabled={Number(claimable) === 0}>CLAIM TOKEN</Button>
            </Link>
          </div>
        )}
      </div>
      <Tabs
        className='mt-10'
        tabs={[
          {
            label: `UNSTAKED (${unstakedNft?.length})`,
            content: <div>{!!unstakedNft.length && <CsList items={unstakedNft} />}</div>,
            value: 'unstaked',
          },
          {
            label: `STAKED (${stakedNft?.length})`,
            content: <div>{!!stakedNft.length && <CsList items={stakedNft} isStaked />}</div>,
            value: 'stake',
          },
          {
            label: `ALL (${allCs?.length})`,
            content: <div>{!!allCs.length && <CsList items={allCs} />}</div>,
            value: 'all',
          },
        ]}
        collapsible
      />

      {!allCs.length && (
        <div className='flex flex-col items-center mt-5'>
          <div className='text-center'>No NFTs Owned. Purchase now to start the game.</div>
          <a href={process.env.NEXT_PUBLIC_OPENSEA_URL} target='_blank' rel='noreferrer'>
            <Button className='mt-4 uppercase'>BUY NOW</Button>
          </a>
        </div>
      )}
    </AppLayout.Section>
  );
};
