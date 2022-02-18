import { resolveResponse } from 'utils/response';
import config from './config';

const CLAN_URL = config.BASE_URL + '/clan';

const getList = () => {
  return [
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
};

const getById = async (id: string) => {
  try {
    const res = await fetch(CLAN_URL + `?id=${id}`);
    return resolveResponse(res);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const ClanApis = { getList, getById };
