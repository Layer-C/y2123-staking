import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { AppLayout, Button, Tabs } from 'components';
import { NumberUtils } from 'utils/number';
import { CsList } from './CsList';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useClans } from 'hooks/useClans';
import { useAccountContext } from 'contexts/Account';
import InfoIcon from 'public/icons/info.svg';

export const StakingSection = () => {
  const { active, account } = useWeb3React();
  const { data: clans } = useClans();
  const {
    accountData: { allCs, unstakedNft, stakedNft, claimable, totalClaim, totalCS, clanId },
  } = useAccountContext();

  const selectedClan = useMemo(() => clans.find(clan => clan.id === clanId), [clanId, clans]);

  return (
    <AppLayout.Section label='staking'>
      <div className='flex flex-row-reverse justify-between gap-5 sm:flex-col'>
        <div className='w-[120px] h-[120px] flex flex-col items-center justify-center border border-solid border-gray-1 sm:mx-auto'>
          {clanId && selectedClan && stakedNft.length > 0 ? (
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
              <div className='text-gray-1'>Total $OXGN Claimed Ever</div>
              <div className='text-xl font-disketMono'>{NumberUtils.pad(totalClaim)}</div>
            </div>
            <div>
              <div className='text-gray-1'>$OXGN rewards/day/NFT</div>
              <div className='text-xl font-disketMono'>{24}</div>
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
          <div className='ml-2 text-sm uppercase break-words whitespace-pre'>
            <span>
              /1200{' '}
              <div
                className='inline-block'
                data-html={true}
                data-tip={`Claim your tokens before it hits the maximum OXGN tank capacity of 1200.<br/>You will stop earning OXGN tokens if your OXGN tank is maxed out.`}>
                <InfoIcon />
              </div>
            </span>
            <br />
            $OXGN Claimable
          </div>
        </div>
        {active && account && (
          <div className='sm:hidden'>
            <Link href='/claim' passHref>
              <Button disabled={Number(claimable) === 0}>CLAIM TOKEN</Button>
            </Link>
          </div>
        )}
      </div>
      {active && account && (
        <div className='justify-center hidden mt-5 sm:flex'>
          <Link href='/claim' passHref>
            <Button disabled={Number(claimable) === 0}>CLAIM TOKEN</Button>
          </Link>
        </div>
      )}
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
