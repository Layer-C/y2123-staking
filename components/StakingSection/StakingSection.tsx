import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { AppLayout, Button, Tabs } from 'components';
import { NumberUtils } from 'utils/number';
import { CsList } from './CsList';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useClans } from 'hooks/useClans';
import { useAccountContext } from 'contexts/Account';
import InfoIcon from 'public/icons/info.svg';
import StakingIcon from 'public/icons/staking.svg';
import MarketIcon from 'public/icons/market.svg';
import NewLabelIcon from 'public/icons/newLabel.svg';
import ExpandIcon from 'public/icons/expand.svg';
import FilterIcon from 'public/icons/filter.svg';
import HollowCircle from 'public/icons/hollow-circle.svg';

const unselectedLabelBackgroundStyle = {
  background: 'linear-gradient(98.86deg, rgba(27, 29, 44, 0.5) 55.16%, rgba(27, 29, 44, 0.5) 99.64%)',
  backdropFilter: 'blur(50px)',
  border: '1px solid #8F97B4',
};

export const StakingSection = () => {
  const [isShowStaking, setIsShowStaking] = useState(true);
  const [selectedTab, setSelectedTab] = useState('citizen');
  const [isFilterUnstaked, setIsFilterUnstaked] = useState(true);
  const [landQuantity, setLandQuantity] = useState(1);
  const { active, account } = useWeb3React();
  const { data: clans } = useClans();
  const {
    accountData: { allCs, unstakedNft, stakedNft, claimable, totalClaim, totalCS, clanId },
  } = useAccountContext();

  const selectedClan = useMemo(() => clans.find(clan => clan.id === clanId), [clanId, clans]);

  useEffect(() => {
    setLandQuantity(1);
  }, [isShowStaking]);

  const staking = (
    <>
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
              <div className='text-gray-1'>$OXGN Rewards/ DAY / CS</div>
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
        value={selectedTab}
        onChange={newValue => setSelectedTab(newValue)}
        tabs={[
          {
            label: (
              <span className='font-bold font-disketMono text-xs leading-3.5'>
                CITIZEN ({NumberUtils.pad(allCs.length)})
              </span>
            ),
            content: (
              <div>
                <div className='flex justify-between'>
                  <div className=' text-xs text-gray-1'>
                    {unstakedNft.length} Unstaked Citizen <br /> {stakedNft.length} Staked Citizen <br />{' '}
                    {unstakedNft.length + stakedNft.length} Total Citizen <br />
                  </div>
                  <div className='flex items-center gap-1 uppercase font-disketMono text-[10px] font-bold'>
                    <FilterIcon />
                    <div
                      className={classNames(
                        'px-2 py-1 cursor-pointer',
                        isFilterUnstaked ? 'text-white ' : 'text-gray-1 border border-gray-1'
                      )}
                      style={
                        isFilterUnstaked
                          ? {
                              background: 'rgba(58, 129, 255, 0.2)',
                            }
                          : {}
                      }
                      onClick={() => setIsFilterUnstaked(true)}>
                      UNSTAKED
                    </div>
                    <div
                      className={classNames(
                        'px-2 py-1 cursor-pointer',
                        !isFilterUnstaked ? 'text-white ' : 'text-gray-1 border border-gray-1'
                      )}
                      style={
                        !isFilterUnstaked
                          ? {
                              background: 'rgba(58, 129, 255, 0.2)',
                            }
                          : {}
                      }
                      onClick={() => setIsFilterUnstaked(false)}>
                      STAKED
                    </div>
                  </div>
                </div>
                {isFilterUnstaked
                  ? !!unstakedNft.length && <CsList items={unstakedNft} />
                  : !!stakedNft.length && <CsList items={stakedNft} />}

                {!allCs.length && (
                  <div className='flex flex-col items-center mt-5'>
                    <div className='text-center'>
                      You do not have any Citizen Scientists reporting to you. Purchase now.
                    </div>
                    <a href={process.env.NEXT_PUBLIC_OPENSEA_URL} target='_blank' rel='noreferrer'>
                      <Button className='mt-4 uppercase'>BUY NOW</Button>
                    </a>
                  </div>
                )}
              </div>
            ),
            value: 'citizen',
          },
          {
            label: (
              <div className='relative'>
                <span className='font-bold font-disketMono text-xs leading-3.5'>LAND ({NumberUtils.pad(0)})</span>{' '}
                {selectedTab !== 'land' ? (
                  <NewLabelIcon className='absolute bottom-full left-full transform translate-x-0 ' />
                ) : null}
              </div>
            ),
            content: (
              <div className='flex flex-col items-center mt-5'>
                <div className='text-center'>You do not hold any Land. Purchase now.</div>
                <a href={process.env.NEXT_PUBLIC_OPENSEA_URL} target='_blank' rel='noreferrer'>
                  <Button className='mt-4 uppercase'>BUY NOW</Button>
                </a>
              </div>
            ),
            value: 'land',
          },
        ]}
        collapsible
        showHeaderAsDropdownOnMobile={false}
      />
    </>
  );

  const marketPlace = (
    <Tabs
      className=' '
      showHeaderAsDropdownOnMobile={false}
      tabs={[
        {
          label: (
            <>
              <span className='font-bold font-disketMono text-xs leading-3.5'>LAND</span>{' '}
              <NewLabelIcon className='absolute top-0 -right-2 transform -translate-y-1/2' />{' '}
            </>
          ),
          className: 'h-full pt-5 overflow-hidden',
          content: (
            <div className='flex gap-10 sm:flex-col sm:gap-5'>
              <div className='relative min-w-75 w-75 max-w-75 h-75 sm:self-center'>
                <Image className='' src='/assets/land.jpeg' width={300} height={300} alt='land-nft' />
                <ExpandIcon className='absolute bottom-2 right-2 cursor-pointer' />
              </div>
              <div className='sm:pl-1'>
                <div className='text-sm text-gray-1 mb-2'>Land NFT</div>
                <div className='font-disketMono text-xl leading-5 font-bold mb-2'>SAVANNAH HABITAT</div>
                <div className='text-xs font-avenirNext mb-5'>
                  The savannah ecosystem is a tropical grassland with warm temperatures year-round, with its highest
                  seasonal rainfall in the summer. The savannah is characterized by grasses and small or dispersed trees
                  that do not form a closed canopy, allowing sunlight to reach the ground.
                  <br />
                  Credit: National Geographic
                </div>
                <div className='text-gray-1 mb-1'>Sales progress</div>
                <div className='flex items-center justify-start w-full gap-2 mb-3'>
                  <div className='text-blue-1 text-[44px] leading-10 font-disketMono font-bold'>
                    {NumberUtils.pad(1)}
                  </div>
                  <div className='text-sm leading-4.5'>
                    <div>/500</div>
                    <div>Land Minted</div>
                  </div>
                </div>
                <div className='text-gray-1 mb-2.5'>Quantity</div>
                <div className='flex font-disketMono mb-5'>
                  <div
                    className='select-none w-6 h-6 flex justify-center items-center cursor-pointer ring-1 ring-[#8F97B4]'
                    onClick={() => setLandQuantity(q => Math.max(q - 1, 1))}>
                    -
                  </div>
                  <div
                    className='h-6 w-18 flex items-center justify-center '
                    style={{ background: 'rgba(58, 129, 255, 0.2)' }}>
                    {landQuantity}
                  </div>
                  <div
                    className='select-none w-6 h-6 flex justify-center items-center cursor-pointer ring-1 ring-[#8F97B4]'
                    onClick={() => setLandQuantity(q => Math.min(q + 1, 500))}>
                    +
                  </div>
                </div>

                <div
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(43, 242, 255, 0.2) 0%, rgba(43, 242, 255, 0.2) 0.01%, rgba(43, 242, 255, 0) 100%, rgba(43, 242, 255, 0.17) 100%)',
                  }}
                  className={classNames(
                    'flex pl-4 mb-2 items-center justify-between border-l-4 border-solid border-cyan-1 h-[66px]'
                  )}>
                  <div>
                    <div className='flex items-center text-xl font-disketMono font-bold'>
                      <HollowCircle className='mr-2' width={24} height={24} />
                      10 $OXGN
                    </div>
                    <div className='text-gray-1 text-xs'>Gas fees excluded</div>
                  </div>
                  <div>
                    <Link href='/claim' passHref>
                      <Button>BUY</Button>
                    </Link>
                  </div>
                </div>
                <div className='text-gray-1 text-xs'>Designs are randomised.</div>
              </div>
            </div>
          ),
          value: 'land',
        },
      ]}
    />
  );

  return (
    <AppLayout.Section
      label={
        <div className='absolute max-w-[80%] top-0 left-0  uppercase transform -translate-y-1/2 font-disketMono flex cursor-pointer'>
          <div
            className={classNames(
              'flex justify-center items-center gap-1 px-4 py-2 leading-4.5 box-border',
              isShowStaking ? ' text-gray-900 bg-white' : 'text-gray-1'
            )}
            style={isShowStaking ? {} : unselectedLabelBackgroundStyle}
            onClick={() => setIsShowStaking(true)}>
            <StakingIcon className='fill-current' />
            STAKING
          </div>
          <div
            className={classNames(
              'flex justify-center items-center gap-1 px-4 py-2 leading-4.5 box-border relative',
              !isShowStaking ? ' text-gray-900 bg-white' : 'text-gray-1'
            )}
            style={isShowStaking ? unselectedLabelBackgroundStyle : {}}
            onClick={() => setIsShowStaking(false)}>
            <MarketIcon className='fill-current' />
            MARKETPLACE
            {isShowStaking ? <NewLabelIcon className='absolute top-0 -right-2 transform -translate-y-1/2' /> : null}
          </div>
        </div>
      }>
      {isShowStaking ? staking : marketPlace}
    </AppLayout.Section>
  );
};
