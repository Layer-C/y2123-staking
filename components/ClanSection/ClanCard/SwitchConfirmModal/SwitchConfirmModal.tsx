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
    router.push(`/dashboard/stake/${id}`);
    control.hide();
  };
  return (
    <Modal control={control}>
      <Modal.Title>SWITCHING OF COLONY</Modal.Title>
      <Modal.Content>
        <div className='flex justify-between items-center gap-10'>
          <Image src={selectedClan?.defaultAvatar || ''} alt='' width={52} height={55} />
          <div>
            <ArrowIcon />
          </div>
          <Image src={defaultAvatar} alt='' width={52} height={55} />
        </div>
        <div className='mt-7'>
          You have selected to switch to <span className='font-bold'>{name}</span>. The grass may not always be greener
          on the other side. Are you sure you want to proceed? Note: To join a new colony, you need to stake at least 1
          additional NFT.
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={switchClan}>Confirm</Button>
        <Button colorScheme='default' variant='outline' onClick={control.hide}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
