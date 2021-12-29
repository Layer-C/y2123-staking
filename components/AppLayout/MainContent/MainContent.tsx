import classNames from 'classnames';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export const MainContent = ({ children }: Props) => {
  return <div className={classNames('flex-1 w-full h-full overflow-x-auto relative')}>{children}</div>;
};
