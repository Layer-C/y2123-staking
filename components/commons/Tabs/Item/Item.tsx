import React from 'react';
import { TabsContext } from '../Tabs';

type TabItemRenderProp = (props: { onClick: () => void; isActive: boolean }) => React.ReactNode;

export type Props = {
  value: any;
  children: TabItemRenderProp;
};

export const Item = ({ value: valueProp, children }: Props) => {
  const { value, handleChange } = React.useContext(TabsContext);

  const onClick = React.useCallback(() => {
    handleChange(valueProp);
  }, [handleChange, valueProp]);

  const isActive = valueProp === value;

  return <>{children({ onClick, isActive })}</>;
};
