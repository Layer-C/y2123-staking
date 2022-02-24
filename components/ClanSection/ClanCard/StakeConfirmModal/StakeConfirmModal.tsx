import { Button, Modal } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { Clan, VisibilityControlProps } from 'types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & { clan: Clan };

// eslint-disable-next-line no-empty-pattern
export const StakeConfirmModal = ({ control, clan }: Props) => {
  const { name, defaultAvatar, id } = clan;

  return (
    <Modal control={control}>
      <Modal.Title>STAking confirmation</Modal.Title>
      <Modal.Content>
        <Image src={defaultAvatar} alt='' width={52} height={55} />
        <div className='mt-7'>
          You have selected to join <span className='font-bold'>{name}</span>. Team up, play together, earn together,
          and fight climate change together!
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Link href={`/dashboard/stake/${id}`} passHref>
          <Button onClick={control.hide}>Confirm</Button>
        </Link>
        <Button colorScheme='default' variant='outline' onClick={control.hide}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
