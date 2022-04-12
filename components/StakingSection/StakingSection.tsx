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
import TokenIcon from 'public/icons/token.svg';
import Wallet from 'public/icons/account_balance_wallet.svg';
import InsufficientOxygenTokenTooltip from 'public/icons/insufficientOxygenTokenTooltip.svg';
import { createContractByABI } from 'contract';
import OxygenContract from 'contract/Oxygen.json';
import LandContract from 'contract/Land.json';
import { BigNumber } from 'ethers';
import { useVisibilityControl } from 'hooks/useVisibilityControl';
import { InsufficientFundsModal } from './InsufficientFundsModal';
import { useNotification } from 'hooks/useNotification';
import ReactTooltip from 'react-tooltip';

const OXGN_REWARDS_PER_DAY = 24;
const OXGN_PER_LAND = 500;

enum FilterType {
  UNSTAKED = 'Unstaked',
  STAKED = 'Staked',
  ALL = 'All',
}

enum TabType {
  CITIZEN = 'citizen',
  LAND = 'land',
}

const unselectedLabelBackgroundStyle = {
  background: 'linear-gradient(98.86deg, rgba(27, 29, 44, 0.5) 55.16%, rgba(27, 29, 44, 0.5) 99.64%)',
  backdropFilter: 'blur(50px)',
  border: '1px solid #8F97B4',
};

const getOxygenTokenBalance = async (accountAddress: string, callback?: (balance: number) => void): Promise<number> => {
  const oxgnContract = createContractByABI(OxygenContract.abi);
  const bigNumberBalance: BigNumber = await oxgnContract.balanceOf(accountAddress);
  const balance = bigNumberBalance.toNumber();
  callback && callback(balance);
  return balance;
};

export const StakingSection = () => {
  const [isShowStaking, setIsShowStaking] = useState(true);
  const [selectedTab, setSelectedTab] = useState(TabType.CITIZEN);
  const [filterType, setFilterType] = useState(FilterType.UNSTAKED);
  const [landQuantity, setLandQuantity] = useState(0);
  const { active, account } = useWeb3React();
  const { data: clans } = useClans();
  const {
    accountData: { allCs, unstakedNft, stakedNft, claimable, totalClaim, totalCS, clanId },
  } = useAccountContext();

  const selectedNFTs =
    filterType === FilterType.UNSTAKED ? unstakedNft : filterType === FilterType.STAKED ? stakedNft : allCs;

  const [balanceOfOxygenToken, setBalanceOfOxygenToken] = useState(0);
  const insufficientFundsModalControl = useVisibilityControl();
  const notification = useNotification();
  const neededBalance = landQuantity * OXGN_PER_LAND;

  const selectedClan = useMemo(() => clans.find(clan => clan.id === clanId), [clanId, clans]);

  useEffect(() => {
    if (account) {
      getOxygenTokenBalance(account, balance => {
        setBalanceOfOxygenToken(balance);
        setLandQuantity(Math.floor(balance / OXGN_PER_LAND) ? 1 : 0);
      });
    }
    ReactTooltip.rebuild();
  }, [account, isShowStaking]);

  const buyLand = async () => {
    try {
      if (account == null) {
        return;
      }
      const balance = await getOxygenTokenBalance(account);
      setBalanceOfOxygenToken(balance);
      if (balance < neededBalance) {
        insufficientFundsModalControl.show();
        return;
      }
      const landContract = createContractByABI(LandContract.abi);
      await landContract.paidMint(landQuantity);
      setIsShowStaking(true);
      setSelectedTab(TabType.LAND);
      notification.show({ content: 'PURCHASE SUCCESSFUL', type: 'success' });
    } catch (error) {
      console.log(error);
      notification.show({ content: 'PURCHASE FAILED', type: 'error' });
    }
  };

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
              <div className='text-xl font-disketMono'>{OXGN_REWARDS_PER_DAY}</div>
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
                    {selectedNFTs.length} {filterType} Citizen
                  </div>
                  <div className='flex items-center gap-1 uppercase font-disketMono text-[10px] font-bold'>
                    <FilterIcon />
                    {Object.values(FilterType).map(value => (
                      <div
                        key={value}
                        className={classNames(
                          'px-2 py-1 cursor-pointer uppercase',
                          filterType === value ? 'text-whit bg-purplish-gray-1' : 'text-gray-1 border border-gray-1'
                        )}
                        onClick={() => setFilterType(value)}>
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
                {!!selectedNFTs.length && <CsList items={selectedNFTs} />}

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
            value: TabType.CITIZEN,
          },
          {
            label: (
              <div className='relative'>
                <span className='font-bold font-disketMono text-xs leading-3.5'>LAND ({NumberUtils.pad(0)})</span>{' '}
                {selectedTab !== TabType.LAND ? (
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
            value: TabType.LAND,
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
                <div className='text-gray-1 text-xs'>Designs are randomised.</div>

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
                    <div>/{OXGN_PER_LAND}</div>
                    <div>Land Minted</div>
                  </div>
                </div>
                <div className='text-gray-1 mb-2.5'>Quantity</div>
                <div className='flex font-disketMono mb-5'>
                  <div
                    className='select-none w-6 h-6 flex justify-center items-center cursor-pointer ring-1 ring-[#8F97B4]'
                    onClick={() => setLandQuantity(q => Math.max(q - 1, 0))}>
                    -
                  </div>
                  <div
                    className={`relative h-6 w-18 flex items-center justify-center bg-purplish-gray-1 ${
                      balanceOfOxygenToken < neededBalance ? ' text-red-1' : ''
                    }`}>
                    {landQuantity}
                    {balanceOfOxygenToken < neededBalance ? (
                      <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1'>
                        <InsufficientOxygenTokenTooltip />
                      </div>
                    ) : null}
                  </div>
                  <div
                    className='select-none w-6 h-6 flex justify-center items-center cursor-pointer ring-1 ring-[#8F97B4]'
                    onClick={() => setLandQuantity(q => q + 1)}>
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
                      <TokenIcon className='mr-2' width={24} height={24} />
                      {OXGN_PER_LAND * landQuantity} $OXGN
                    </div>
                    <div className='text-gray-1 text-xs'>Gas fees excluded</div>
                  </div>
                  <div>
                    <Button onClick={buyLand}>BUY</Button>
                  </div>
                </div>
                <div className='text-gray-1 text-xs flex items-center gap-1'>
                  <Wallet />
                  {balanceOfOxygenToken} $OXGN in Wallet
                </div>
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
      <InsufficientFundsModal
        control={insufficientFundsModalControl}
        neededBalance={neededBalance}
        onOkay={() => setIsShowStaking(true)}
      />
      {isShowStaking ? staking : marketPlace}
    </AppLayout.Section>
  );
};
