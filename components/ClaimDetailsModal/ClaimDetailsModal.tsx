import { Button, Divider, Modal } from 'components';
import { VisibilityControlProps } from 'types';
import Link from 'next/link';
import { useNotification } from 'hooks';
import { useWeb3React } from '@web3-react/core';
import { ClaimApis } from 'apis/claim';
import { createContract } from 'contract';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & { donateAmount: string };

// eslint-disable-next-line no-empty-pattern
export const ClaimDetailsModal = ({ control, donateAmount }: Props) => {
  const { account } = useWeb3React();
  const notification = useNotification();

  return (
    <Modal control={control}>
      <Modal.Title>CLAIM DETAILS</Modal.Title>
      <Modal.Content>
        <div className='max-w-[364px] w-full'>
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
            onClick={async () => {
              if (account != null) {
                const res = await ClaimApis.claim(account, donateAmount);
                const contract = createContract();
                const transaction = await contract.claim(res);
                console.log(res, transaction);
              }

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
