import classNames from 'classnames';
import { AppLayout } from 'components';
import { useClans } from 'hooks/useClans';
import { ClassName } from 'types';
import { ClanCard } from './ClanCard';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const ClanSection = ({ className }: Props) => {
  const { data: clans } = useClans();

  return (
    <AppLayout.Section label='Clans' id='clans' className={classNames('grid grid-cols-3 gap-2', className)}>
      {clans.map(clan => (
        <ClanCard clan={clan} key={clan.id} />
      ))}
    </AppLayout.Section>
  );
};
