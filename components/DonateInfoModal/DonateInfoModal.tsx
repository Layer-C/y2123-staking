import { Button, Modal } from 'components';
import { VisibilityControlProps } from 'types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = VisibilityControlProps & {};

// eslint-disable-next-line no-empty-pattern
export const DonateInfoModal = ({ control }: Props) => {
  return (
    <Modal control={control}>
      <Modal.Title>ABOUT DONATION</Modal.Title>
      <Modal.Content>
        <div>$OXGN for CONSERVATION</div>
        <br />
        <div>
          Connecting our project to in-real-life conservation is and always will be the core of why we exist. When you
          donate an $OXGN token, it will be transferred to our conservation wallet.
        </div>
        <br />
        <div>
          Once we collect enough tokens, we&apos;ll put it towards a conservation group or NGO, vetted by our Scientist
          advisor, and selected by the community.
        </div>
        <br />
        <div>
          To learn more about our conservation framework, please visit our website for more info.
          <span className=' inline-block'>
            <a href='https://www.y2123.com/' className='text-blue-1 font-bold'>
              https://www.y2123.com/
            </a>
          </span>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={control.hide}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
};
