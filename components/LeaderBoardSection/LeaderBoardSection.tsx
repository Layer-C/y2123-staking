import { ClassName } from 'types';
import { AppLayout } from '..';
import { LeaderBoardCard } from './LeaderBoardCard';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const LeaderBoardSection = ({ className }: Props) => {
  return (
    <AppLayout.Section label='Leaderboard' className={className}>
      <div className='grid grid-cols-3 gap-2'>
        <LeaderBoardCard />
        <LeaderBoardCard />
        <LeaderBoardCard />
      </div>
    </AppLayout.Section>
  );
};
