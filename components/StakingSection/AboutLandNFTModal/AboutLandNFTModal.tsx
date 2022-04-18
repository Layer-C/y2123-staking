import { Button, Modal } from 'components';
import { VisibilityControlProps } from 'types';

type Props = VisibilityControlProps;

export const AboutLandNFTModal = ({ control }: Props) => {
  return (
    <Modal control={control}>
      <Modal.Title>ABOUT LAND NFT</Modal.Title>
      <Modal.Content className='-mt-4'>
        LAND NFTs are the foundational NFTs upon which you play the game on. Land cannot be staked and does not yield
        $OXGN tokens. Instead, it acts as a multiplier.
        <br /> <br />
        When your land is healthy with the right balance of flora and fauna, your land will reward you with a multiplier
        of your staking rewards.
        <br /> <br />
        This means if you are earning 24 $OXGN tokens/day from your staked NFTs, and your land gives you a multiplier of
        1.5x, you will earn 36 $OXGN tokens/day.
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={control.hide}>OK</Button>
      </Modal.Actions>
    </Modal>
  );
};
