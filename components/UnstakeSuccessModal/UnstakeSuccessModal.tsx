import { Button, Modal } from 'components';
import { FaCheckSquare } from 'react-icons/fa';
import { VisibilityControlProps } from 'types';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & {};

// eslint-disable-next-line no-empty-pattern
export const UnstakeSuccessModal = ({ control }: Props) => {
  return (
    <Modal control={control}>
      <Modal.Title>UNSTAKING SUCCESSFUL</Modal.Title>
      <Modal.Content>
        <FaCheckSquare size={72} className='text-green-1' />
      </Modal.Content>
      <Modal.Actions>
        <Link href='/' passHref>
          <Button onClick={control.hide}>OK</Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};
