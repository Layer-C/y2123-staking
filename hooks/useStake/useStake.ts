import { useServerSideProps } from 'hooks';
import { StakeApis } from 'apis';
import React from 'react';
import useSWR from 'swr';

const defaultData = {
  clan: null,
  totalTokensEarned: 50,
  lastTokensEarned: 50,
  claimableTokens: 10,
  unstakedCs: [],
  stakedCs: [],
  allCs: [],
};

export const useStake = () => {
  const { props } = useServerSideProps('stakeData');

  const swrReturn = useSWR('/stake', () => StakeApis.get(), { fallbackData: props });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data || defaultData }), [swrReturn]);
};
