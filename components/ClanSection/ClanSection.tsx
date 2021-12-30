import classNames from 'classnames';
import { AppLayout } from 'components';
import { Clan, ClassName } from 'types';
import { ClanCard } from './ClanCard';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

const mockClans: Clan[] = [
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    id: '1',
    members: 123456789,
    name: 'Clan A',
    tokens: 9999,
    defaultAvatar: '/clan-a.png',
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    id: '2',
    members: 123456789,
    name: 'Clan B',
    tokens: 9999,
    defaultAvatar: '/clan-b.png',
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    id: '3',
    members: 123456789,
    name: 'Clan C',
    tokens: 9999,
    defaultAvatar: '/clan-c.png',
  },
];

// eslint-disable-next-line no-empty-pattern
export const ClanSection = ({ className }: Props) => {
  return (
    <AppLayout.Section label='Clans' id='clans' className={classNames('grid grid-cols-3 gap-2', className)}>
      {mockClans.map(clan => (
        <ClanCard clan={clan} key={clan.id} />
      ))}
    </AppLayout.Section>
  );
};
