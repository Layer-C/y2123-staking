import { useWeb3React } from '@web3-react/core';
import { ClanApis } from 'apis/clan';
import { AspectRatio, Button } from 'components';
import { useAccountContext } from 'contexts/Account';
import { useVisibilityControl } from 'hooks/useVisibilityControl';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Wallet from 'public/icons/account_balance_wallet.svg';
import HollowCircle from 'public/icons/hollow-circle.svg';
import { useEffect, useState } from 'react';
import { Clan } from 'types';
import { StakeConfirmModal } from './StakeConfirmModal';
import PlusIcon from 'public/icons/plus.svg';
import StakeMoreTooltip from 'public/icons/stake-more-tooltip.svg';
import classNames from 'classnames';
import { SwitchConfirmModal } from './SwitchConfirmModal';
import { useClans } from 'hooks/useClans';
import { SwitchErrorModal } from './SwitchErrorModal';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  clan: Clan;
};

// eslint-disable-next-line no-empty-pattern
export const ClanCard = ({ clan }: Props) => {
  const { data: clans } = useClans();
  const { description, id, name, defaultAvatar } = clan;
  const { active, account } = useWeb3React();
  const [clanData, setClanData] = useState(clan);
  const {
    accountData: { clanId, stakedNft, unstakedNft },
  } = useAccountContext();
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const stakeModalControl = useVisibilityControl();
  const switchingModalControl = useVisibilityControl();
  const switchErrorModalControl = useVisibilityControl();
  const isStaked = clanId === id && stakedNft.length > 0;
  const isStakingOnOtherClan = !isStaked && Number(clanId) > 0 && stakedNft.length > 0;
  const canSwitchClan = isStakingOnOtherClan && unstakedNft.length > 0;

  const selectedClan = clans.find(clan => clan.id === clanId);

  const handleUnstakeClick = () => {
    router.push(`/dashboard/unstake/${id}`);
  };

  useEffect(() => {
    ClanApis.getById(clan.id).then(res => {
      setClanData({ ...clan, tokens: res.totalStaked, members: res.uniqueAccount });
    });
  }, [clan]);

  return (
    <div className='border border-solid border-gray-1'>
      <StakeConfirmModal control={stakeModalControl} clan={clan} />
      <SwitchConfirmModal
        control={switchingModalControl}
        selectedClan={selectedClan}
        clan={clan}
        switchErrorModalControl={switchErrorModalControl}
      />
      <SwitchErrorModal control={switchErrorModalControl} />
      <AspectRatio ratio='1-1'>
        <div className='flex items-center justify-center w-full h-full'>
          <Image src={defaultAvatar} alt='' width='100%' height='100%' />
        </div>
      </AspectRatio>
      <div className='p-4'>
        <div className='text-xl font-bold uppercase font-disketMono'>{name}</div>
        <div className='flex items-center mt-5 font-bold'>
          <Wallet className='mr-2' />
          {clanData.tokens}
        </div>
        <div className='flex items-center mt-3 font-bold'>
          <HollowCircle className='mr-2' width={24} height={24} />
          {clanData.members}
        </div>
        <div className='mt-4 text-xs text-gray-1 h-14'>{description}</div>
        <div className='my-4 border-t border-solid border-gray-1'></div>
        {isStaked ? (
          <div className='flex gap-1'>
            <Button
              colorScheme='default'
              className='w-full'
              disabled={!active || !account}
              onClick={handleUnstakeClick}>
              Unstake
            </Button>
            {unstakedNft.length > 0 && (
              <Button
                className='w-14 relative group'
                disabled={!active || !account}
                onClick={stakeModalControl.show}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}>
                <PlusIcon />
                <div
                  className={classNames('absolute left-1/2 transform -translate-x-1/2', {
                    ' hidden': !showTooltip,
                  })}
                  style={{ top: -32 }}>
                  <StakeMoreTooltip />
                </div>
              </Button>
            )}
          </div>
        ) : (
          <Button
            className='w-full'
            disabled={!active || !account || (isStakingOnOtherClan && !canSwitchClan)}
            onClick={isStakingOnOtherClan && canSwitchClan ? switchingModalControl.show : stakeModalControl.show}>
            {isStakingOnOtherClan ? 'JOIN' : 'JOIN & STAKE'}
          </Button>
        )}
      </div>
    </div>
  );
};
