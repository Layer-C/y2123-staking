import { useWeb3React } from '@web3-react/core';
import { AccountApis } from 'apis/account';
import { createContext, useContext, useState, ReactElement, ReactNode, useEffect, useCallback } from 'react';

type Props = {
  children: ReactNode;
};

const initialAccountData = {
  allCs: [],
  unstakedNft: [],
  stakedNft: [],
  claimable: '0',
  totalClaim: '0',
  lastClaim: '0',
  totalCS: '0',
  clanId: '0',
};

type AccountData = typeof initialAccountData;

type ContextProps = {
  accountData: AccountData;
  getAccountData: () => Promise<AccountData>;
};

const AccountContext = createContext({} as ContextProps);

export function AccountProvider({ children }: Props): ReactElement {
  const { active, account } = useWeb3React();
  const [accountData, setAccountData] = useState(initialAccountData);

  const getAccountData = useCallback(() => {
    return AccountApis.get(account).then((res: AccountData) => {
      if (res) {
        setAccountData({ ...res, allCs: [...res.unstakedNft, ...res.stakedNft] });
      }
      return res;
    });
  }, [account, setAccountData]);

  useEffect(() => {
    getAccountData();
    return () => {
      setAccountData(initialAccountData);
    };
  }, [account, active, getAccountData]);

  return <AccountContext.Provider value={{ accountData, getAccountData }}>{children}</AccountContext.Provider>;
}

export function useAccountContext(): ContextProps {
  return useContext(AccountContext);
}
