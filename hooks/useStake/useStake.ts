import { useWeb3React } from '@web3-react/core';
import { useServerSideProps } from 'hooks';
import { StakeApis } from 'apis';
import React from 'react';
import useSWR from 'swr';

const defaultData = {
  clan: null,
  totalTokensEarned: 0,
  lastTokensEarned: 0,
  claimableTokens: 0,
  unstakedCs: [],
  stakedCs: [],
  allCs: [],
};

export const useStake = () => {
  const { props } = useServerSideProps('stakeData');
  const { active, account } = useWeb3React();

  const swrReturn = useSWR(active && account && '/stake', () => StakeApis.get(), {
    fallbackData: active && account && props,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data || defaultData }), [swrReturn]);
};
