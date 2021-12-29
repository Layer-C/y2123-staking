const mockCs = new Array(50)
  .fill(null)
  .map((_, idx) => ({ id: idx.toString(), name: `ID No.${idx}`, staked: Math.random() > 0.5 }));

const get = () => {
  return {
    clan: null,
    totalTokensEarned: 50,
    lastTokensEarned: 50,
    claimableTokens: 10,
    unstakedCs: mockCs.filter(({ staked }) => !staked),
    stakedCs: mockCs.filter(({ staked }) => staked),
    allCs: mockCs,
  };
};

export const StakeApis = { get };
