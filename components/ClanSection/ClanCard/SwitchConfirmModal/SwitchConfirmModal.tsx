import { Button, Modal } from 'components';
import Image from 'next/image';
import { Clan, VisibilityControlProps } from 'types';
import ArrowIcon from 'public/icons/arrow.svg';
import { useRouter } from 'next/router';

type Props = VisibilityControlProps & { clan: Clan; selectedClan?: Clan };

export const SwitchConfirmModal = ({ control, clan, selectedClan }: Props) => {
  const router = useRouter();
  const { name, defaultAvatar, id } = clan;

  const switchClan = async () => {
    router.push(`/stake/${id}`);
    control.hide();
  };
  return (
    <Modal control={control}>
      <Modal.Title>SWITCHING COLONY</Modal.Title>
      <Modal.Content>
        <div className='flex justify-between items-center gap-10'>
          <Image src={selectedClan?.defaultAvatar || ''} alt='' width={52} height={55} />
          <div>
            <ArrowIcon />
          </div>
          <Image src={defaultAvatar} alt='' width={52} height={55} />
        </div>
        <div className='mt-7'>
          To switch to <span className='font-bold'>{name}</span>, you need to stake at least 1 additional NFT.
          <br />
          <br /> When you switch colony, all your currently staked NFTs will be transferred to the new colony with no
          additional gas fees.
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={switchClan}>SELECT NFTS</Button>
        <Button colorScheme='default' variant='outline' onClick={control.hide}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
