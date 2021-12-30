const mockCs = new Array(50)
  .fill(null)
  .map((_, idx) => ({ id: idx.toString(), name: `ID No.${idx}`, staked: Math.random() > 0.5 }));

const get = () => {
  return {
    clan:
      Math.random() > 0.5
        ? null
        : {
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            id: '1',
            members: 123456789,
            name: 'Clan A',
            tokens: 9999,
            defaultAvatar: '/clan-a.png',
          },
    totalTokensEarned: 50,
    lastTokensEarned: 50,
    claimableTokens: 10,
    unstakedCs: mockCs.filter(({ staked }) => !staked),
    stakedCs: mockCs.filter(({ staked }) => staked),
    allCs: mockCs,
  };
};

export const StakeApis = { get };
