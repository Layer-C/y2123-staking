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
    <AppLayout.Section label='Clans' id='clans' className={classNames('grid grid-cols-3 gap-2 sm:block', className)}>
      <ConditionalWrapper active={viewport === 'sm'} component={Carousel} max={3}>
        {clans.map((clan, index) => (
          <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} key={clan.id} index={index}>
            <ClanCard clan={clan} />
          </ConditionalWrapper>
        ))}
      </ConditionalWrapper>
    </AppLayout.Section>
  );
};
