import { Button, Modal } from 'components';
import { VisibilityControlProps } from 'types';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & { clanId: string };

// eslint-disable-next-line no-empty-pattern
export const UnstakeAlertModal = ({ control, clanId }: Props) => {
  const router = useRouter();
  return (
    <Modal control={control}>
      <Modal.Title>WARNING</Modal.Title>
      <Modal.Content>
        <div className='leading-8'>
          Claim your $OXGN tokens before unstaking.
          <br /> If you unstake, any unclaimed tokens will be lost.
          <br /> Do you wish to proceed?
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            control.hide();
            router.push(`/dashboard/unstake/${clanId}`);
          }}>
          Yes
        </Button>
        <Button colorScheme='default' onClick={control.hide}>
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
