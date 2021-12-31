import { Button, Divider, Modal } from 'components';
import { VisibilityControlProps } from 'types';
import Link from 'next/link';
import { useNotification } from 'hooks';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & {};

// eslint-disable-next-line no-empty-pattern
export const ClaimDetailsModal = ({ control }: Props) => {
  const notification = useNotification();

  return (
    <Modal control={control}>
      <Modal.Title>UNSTAKING FAILED</Modal.Title>
      <Modal.Content>
        <div className='w-[364px]'>
          <div className='flex justify-between'>
            <div>Claimable</div>
            <div className='font-bold'>21.23 $OXGN</div>
          </div>
          <div className='flex justify-between mt-2'>
            <div>Donation</div>
            <div className='font-bold'>21.23 $OXGN</div>
          </div>
          <div className='flex justify-between mt-2'>
            <div>Sub Total</div>
            <div className='font-bold'>21.23 $OXGN</div>
          </div>
          <Divider />
          <div className='flex justify-between mt-2'>
            <div>Tax (20%)</div>
            <div className='font-bold'>21.23 $OXGN</div>
          </div>
          <Divider />
          <div className='flex justify-between mt-2 font-bold'>
            <div>Total Claimable</div>
            <div>21.23 $OXGN</div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Link href='/dashboard' passHref>
          <Button
            onClick={() => {
              notification.show({ content: 'CLAiming SUCCESSFUL', type: 'success' });
              control.hide();
            }}>
            Proceed
          </Button>
        </Link>
        <Button variant='outline' colorScheme='default' onClick={control.hide}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
