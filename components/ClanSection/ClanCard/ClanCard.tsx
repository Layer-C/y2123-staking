import { useWeb3React } from '@web3-react/core';
import { ClanApis } from 'apis/clan';
import { AspectRatio, Button, UnstakeErrorModal } from 'components';
import { useStake } from 'hooks';
import { useVisibilityControl } from 'hooks/useVisibilityControl';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Wallet from 'public/icons/account_balance_wallet.svg';
import HollowCircle from 'public/icons/hollow-circle.svg';
import { useEffect } from 'react';
import { Clan } from 'types';
import { StakeConfirmModal } from './StakeConfirmModal';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  clan: Clan;
};

// eslint-disable-next-line no-empty-pattern
export const ClanCard = ({ clan }: Props) => {
  const { description, id, name, tokens, members, defaultAvatar } = clan;
  const { active, account } = useWeb3React();
  const { data: stake } = useStake();

  const router = useRouter();

  const stakeModalControl = useVisibilityControl();
  const unstakeErrorModalControl = useVisibilityControl();

  const isStaked = stake?.clan?.id === id;

  const handleUnstakeClick = () => {
    if (Math.random() > 0.5) {
      router.push(`/dashboard/unstake/${id}`);
      return;
    }

    unstakeErrorModalControl.show();
  };

  useEffect(() => {
    ClanApis.getById(clan.id).then(res => {
      console.log(res);
    });
  }, [clan]);

  return (
    <div className='border border-solid border-gray-1'>
      <UnstakeErrorModal control={unstakeErrorModalControl} />
      <StakeConfirmModal control={stakeModalControl} clan={clan} />
      <AspectRatio ratio='1-1'>
        <div className='flex items-center justify-center w-full h-full'>
          <Image src={defaultAvatar} alt='' width='100%' height='100%' />
        </div>
      </AspectRatio>
      <div className='p-4'>
        <div className='text-xl font-bold uppercase font-disketMono'>{name}</div>
        <div className='flex items-center mt-5 font-bold'>
          <Wallet className='mr-2' />
          {tokens}
        </div>
        <div className='flex items-center mt-3 font-bold'>
          <HollowCircle className='mr-2' width={24} height={24} />
          {members}
        </div>
        <div className='mt-4 text-xs text-gray-1'>{description}</div>
        <div className='my-4 border-t border-solid border-gray-1'></div>
        {isStaked ? (
          <Button colorScheme='default' className='w-full' disabled={!active || !account} onClick={handleUnstakeClick}>
            Unstake
          </Button>
        ) : (
          <Button
            className='w-full'
            disabled={!active || !account || (stake.clan && !isStaked)}
            onClick={stakeModalControl.show}>
            Stake
          </Button>
        )}
      </div>
    </div>
  );
};
