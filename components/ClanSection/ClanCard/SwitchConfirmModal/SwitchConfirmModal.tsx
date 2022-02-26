import { Button, Modal } from 'components';
import Image from 'next/image';
import { Clan, VisibilityControl, VisibilityControlProps } from 'types';
import ArrowIcon from 'public/icons/arrow.svg';
import { useAccountContext } from 'contexts/Account';
import { useNotification } from 'hooks';

type Props = VisibilityControlProps & { clan: Clan; selectedClan?: Clan; switchErrorModalControl: VisibilityControl };

export const SwitchConfirmModal = ({ control, clan, selectedClan, switchErrorModalControl }: Props) => {
  const notification = useNotification();
  const { name, defaultAvatar, id } = clan;
  const {
    accountData: { claimable },
  } = useAccountContext();

  const switchClan = () => {
    control.hide();

    notification.show({
      type: 'success',
      content: 'WELCOME TO YOUR NEW COLONY',
    });
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
          on the other side. Are you sure you want to proceed?
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            if (+claimable > 0) {
              control.hide();
              switchErrorModalControl.show();
              return;
            }
            switchClan();
          }}>
          Confirm
        </Button>
        <Button colorScheme='default' variant='outline' onClick={control.hide}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
