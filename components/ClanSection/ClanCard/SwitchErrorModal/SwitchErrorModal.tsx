import { Button, Modal } from 'components';
import { Clan, VisibilityControlProps } from 'types';
import TimesSquare from 'public/icons/times-square.svg';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & {};

// eslint-disable-next-line no-empty-pattern
export const SwitchErrorModal = ({ control }: Props) => {
  const router = useRouter();
  return (
    <Modal control={control}>
      <Modal.Title>SWITCHING COLONY FAILED</Modal.Title>
      <Modal.Content>
        <TimesSquare width={72} height={72} className='text-red-1' />
        <div className='mt-7'>You need to claim all your tokens before switching to a new colony. </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            router.push('/claim');
          }}>
          CLAIM NOW
        </Button>
        <Button colorScheme='default' onClick={control.hide}>
          CANCEL
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
