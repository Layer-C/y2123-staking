import { Button, Modal } from 'components';
import TimesSquare from 'public/icons/times-square.svg';
import { VisibilityControlProps } from 'types';

type Props = VisibilityControlProps & { neededBalance: number; onOkay: () => void };

export const InsufficientFundsModal = ({ control, neededBalance, onOkay }: Props) => {
  const handleOkay = () => {
    onOkay();
    control.hide();
  };
  return (
    <Modal control={control}>
      <Modal.Title>INSUFFICIENT FUNDS</Modal.Title>
      <Modal.Content>
        <div className='flex justify-between items-center gap-10'>
          <TimesSquare width={72} height={72} className='text-red-1' />
        </div>
        <div className='mt-7'>
          You would need {neededBalance} $OXGN to purchase Land NFT. Claim your available $OXGN now or stake an Citizen
          Scientist NFT to proceed.
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleOkay}>CLAIM NOW</Button>
        <Button colorScheme='default' variant='outline' onClick={control.hide}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
