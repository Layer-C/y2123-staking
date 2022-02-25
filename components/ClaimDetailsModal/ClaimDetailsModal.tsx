import { Button, Divider, Modal } from 'components';
import { VisibilityControlProps } from 'types';
import Link from 'next/link';
import { useNotification } from 'hooks';
import { useWeb3React } from '@web3-react/core';
import { ClaimApis } from 'apis/claim';
import { createContract } from 'contract';
import { useAccountContext } from 'contexts/Account';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & { donateAmount: string };

// eslint-disable-next-line no-empty-pattern
export const ClaimDetailsModal = ({ control, donateAmount }: Props) => {
  const { account } = useWeb3React();
  const notification = useNotification();

  const {
    accountData: { claimable },
    getAccountData,
  } = useAccountContext();

  const subTotal = +claimable - +donateAmount;
  const tax = subTotal * 0.2;
  const finalClamable = subTotal - tax;

  return (
    <Modal control={control}>
      <Modal.Title>CLAIM DETAILS</Modal.Title>
      <Modal.Content>
        <div className='max-w-[364px] w-full'>
          <div className='flex justify-between'>
            <div>Claimable</div>
            <div className='font-bold'>{claimable} $OXGN</div>
          </div>
          <div className='flex justify-between mt-2'>
            <div>Donation</div>
            <div className='font-bold'>{donateAmount} $OXGN</div>
          </div>
          <div className='flex justify-between mt-2'>
            <div>Sub Total</div>
            <div className='font-bold'>{subTotal} $OXGN</div>
          </div>
          <Divider />
          <div className='flex justify-between mt-2'>
            <div>Tax (20%)</div>
            <div className='font-bold'>{tax} $OXGN</div>
          </div>
          <Divider />
          <div className='flex justify-between mt-2 font-bold'>
            <div>Total Claimable</div>
            <div>{finalClamable} $OXGN</div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Link href='/dashboard' passHref>
          <Button
            onClick={async () => {
              if (account != null) {
                const res = await ClaimApis.claim(account, donateAmount);
                if (res != null) {
                  const {
                    oxgnTokenClaim,
                    oxgnTokenDonate,
                    clanTokenClaim,
                    benificiaryOfTax,
                    oxgnTokenTax,
                    timestamp,
                    joinSignature,
                  } = res;
                  const contract = createContract();
                  contract.on('Claim', (from, to, amount, event) => {
                    getAccountData();
                    contract.removeAllListeners();
                  });
                  const transaction = await contract.claim(
                    oxgnTokenClaim,
                    oxgnTokenDonate,
                    clanTokenClaim,
                    benificiaryOfTax,
                    oxgnTokenTax,
                    timestamp,
                    joinSignature
                  );
                  console.log(transaction);
                }

                notification.show({ content: 'CLAiming SUCCESSFUL', type: 'success' });
              }

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
