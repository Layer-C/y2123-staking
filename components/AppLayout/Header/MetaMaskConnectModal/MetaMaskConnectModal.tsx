import { Button, Modal } from 'components';
import { VisibilityControl } from 'hooks';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  control: VisibilityControl;
};

// eslint-disable-next-line no-empty-pattern
export const MetaMaskConnectModal = ({ control }: Props) => {
  return (
    <Modal control={control}>
      <Modal.Title>Connect to metamask</Modal.Title>
      <div className='flex flex-col items-center justify-center'>
        <Image src='/metamask.png' alt='' width={80} height={80} />
        <div className='w-[364px] text-center mt-7'>
          Download Metamask Chrome Extension now to start connecting to your account.
        </div>
      </div>
      <Modal.Actions>
        <Button target='_blank' as='a' href='https://metamask.io/' onClick={control.hide}>
          Download
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
