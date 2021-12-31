import { ClassName } from 'types';
import { AppLayout, Carousel, ConditionalWrapper } from 'components';
import { LeaderBoardCard } from './LeaderBoardCard';
import { useViewport } from 'hooks/useViewport';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const LeaderBoardSection = ({ className }: Props) => {
  const { viewport } = useViewport();

  return (
    <AppLayout.Section label='Leaderboard' className={className}>
      <div className='grid grid-cols-3 gap-2 sm:block'>
        <ConditionalWrapper active={viewport === 'sm'} component={Carousel} max={3}>
          <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} index={0}>
            <LeaderBoardCard />
          </ConditionalWrapper>
          <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} index={1}>
            <LeaderBoardCard />
          </ConditionalWrapper>
          <ConditionalWrapper active={viewport === 'sm'} component={Carousel.Item} index={2}>
            <LeaderBoardCard />
          </ConditionalWrapper>
        </ConditionalWrapper>
      </div>
    </AppLayout.Section>
  );
};
