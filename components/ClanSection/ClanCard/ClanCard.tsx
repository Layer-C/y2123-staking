import { AspectRatio, Button } from 'components';
import { Clan } from 'types';
import Image from 'next/image';
import Wallet from 'public/icons/account_balance_wallet.svg';
import HollowCircle from 'public/icons/hollow-circle.svg';
import { useWeb3React } from '@web3-react/core';
import { StakeConfirmModal } from './StakeConfirmModal';
import { useVisibilityControl } from 'hooks/useVisibilityControl';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  clan: Clan;
};

// eslint-disable-next-line no-empty-pattern
export const ClanCard = ({ clan }: Props) => {
  const { description, id, name, tokens, members, defaultAvatar } = clan;
  const { active, account } = useWeb3React();

  const modalControl = useVisibilityControl();

  return (
    <div className='border border-solid border-gray-1'>
      <StakeConfirmModal control={modalControl} clan={clan} />
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
          <HollowCircle className='mr-2' />
          {members}
        </div>
        <div className='mt-4 text-xs text-gray-1'>{description}</div>
        <div className='my-4 border-t border-solid border-gray-1'></div>
        <Button className='w-full' disabled={!active || !account} onClick={modalControl.show}>
          Stake
        </Button>
      </div>
    </div>
  );
};
