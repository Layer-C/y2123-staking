import noop from 'lodash/noop';
import React from 'react';
import { Children } from 'types';

export type ServerSidePropNames = 'stakeData';

export type ServerSidePropsState = Partial<Record<ServerSidePropNames, any>>;

type ServerSidePropsProviderValue = {
  props: ServerSidePropsState;
  setProps: React.Dispatch<React.SetStateAction<ServerSidePropsState>>;
};

export const serverSidePropsContext = React.createContext<ServerSidePropsProviderValue>({
  props: {},
  setProps: noop,
});

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & {};

export const ServerSidePropsProvider = ({ children }: Props) => {
  const [props, setProps] = React.useState<ServerSidePropsState>({});

  const value = React.useMemo(() => ({ setProps, props }), [props]);

  return <serverSidePropsContext.Provider value={value}>{children}</serverSidePropsContext.Provider>;
};
