import classNames from 'classnames';
import { AppLayout, Carousel } from 'components';
import { ConditionalWrapper } from 'components/commons/ConditionalWrapper';
import { useClans } from 'hooks/useClans';
import { useViewport } from 'hooks/useViewport';
import { ClassName } from 'types';
import { ClanCard } from './ClanCard';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const ClanSection = ({ className }: Props) => {
  const { data: clans } = useClans();
  const { viewport } = useViewport();

  return (
    <AppLayout.Section label='COLONY' id='clans' className={classNames('sm:block', className)}>
      <div className={classNames('grid grid-cols-3 gap-2 sm:block')}>
        <ConditionalWrapper active={viewport === 'sm'} component={Carousel} max={3}>
          {clans.map((clan, index) => (
            <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} key={clan.id} index={index}>
              <ClanCard clan={clan} />
            </ConditionalWrapper>
          ))}
        </ConditionalWrapper>
      </div>
      <div className='text-center font-disketMono mt-5' style={{ fontSize: 10 }}>
        You can only be in 1 colony at a time. <br />
        When you switch colony, all your staked NFTs will be transferred to the new colony with no additional gas fees.
      </div>
    </AppLayout.Section>
  );
};
