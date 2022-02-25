import { Button, Modal } from 'components';
import { Clan, VisibilityControlProps } from 'types';
import TimesSquare from 'public/icons/times-square.svg';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & {};

// eslint-disable-next-line no-empty-pattern
export const UnstakeErrorModal = ({ control }: Props) => {
  const router = useRouter();
  return (
    <Modal control={control}>
      <Modal.Title>UNSTAKING FAILED</Modal.Title>
      <Modal.Content>
        <TimesSquare width={72} height={72} className='text-red-1' />
        <div className='mt-7'>You must claim your tokens before unstaking</div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            router.push('/dashboard/claim');
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
