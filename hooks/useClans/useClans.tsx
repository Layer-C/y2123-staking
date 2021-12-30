import { useWeb3React } from '@web3-react/core';
import { ClanApis } from 'apis';
import { useServerSideProps } from 'hooks';
import React from 'react';
import useSWR from 'swr';
import { Clan } from 'types';

const defaultData: Clan[] = [];

export const useClans = () => {
  const { props } = useServerSideProps('clans');
  const { active, account } = useWeb3React();

  const swrReturn = useSWR<Clan[]>(active && account && '/clans', () => ClanApis.getList(), {
    fallbackData: active && account && props,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data || defaultData }), [swrReturn]);
};
