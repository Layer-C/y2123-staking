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
        <div className='leading-5'>
          Claim your $OXGN tokens before unstaking.
          <br />
          Any unclaimed $OXGN tokens will be lost.
          <br />
          <br /> You can select which NFTs to unstake.
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            control.hide();
            router.push(`/unstake/${clanId}`);
          }}>
          SELECT NFTS
        </Button>
        <Button colorScheme='default' onClick={control.hide}>
          CANCEL
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
