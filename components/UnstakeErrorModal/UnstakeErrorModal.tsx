import { Button, Modal } from 'components';
import { Clan, VisibilityControlProps } from 'types';
import TimesSquare from 'public/icons/times-square.svg';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & {};

// eslint-disable-next-line no-empty-pattern
export const UnstakeErrorModal = ({ control }: Props) => {
  return (
    <Modal control={control}>
      <Modal.Title>UNSTAKING FAILED</Modal.Title>
      <Modal.Content>
        <TimesSquare width={72} height={72} className='text-red-1' />
        <div className='mt-7'>
          You would need at least 2 days worth of tokens in total claimable, before you can unstake. Please wait X more
          day for unstaking
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={control.hide}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
};
