import { Button, Modal } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { Clan, VisibilityControlProps } from 'types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & { clan: Clan; isStakeMore: boolean };

// eslint-disable-next-line no-empty-pattern
export const StakeConfirmModal = ({ control, clan, isStakeMore }: Props) => {
  const { name, defaultAvatar, id } = clan;

  return (
    <Modal control={control}>
      <Modal.Title className='text-center'>
        JOIN A COLONY <br /> BY STAKING YOUR NFTS
      </Modal.Title>
      <Modal.Content>
        <Image src={defaultAvatar} alt='' width={52} height={55} />
        <div className='mt-7'>
          {isStakeMore ? 'Stake your NFTs and' : 'Stake at least 1 NFT to'} join{' '}
          <span className='font-bold'>{name}</span>.
          <br /> Team up, play together, earn together, and fight climate change together!
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Link href={`/stake/${id}`} passHref>
          <Button onClick={control.hide}>SELECT NFTS</Button>
        </Link>
        <Button colorScheme='default' variant='outline' onClick={control.hide}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
