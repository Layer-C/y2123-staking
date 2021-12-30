import classNames from 'classnames';
import React from 'react';
import { Children, ClassName } from 'types';

type Props = Children & ClassName;

export const MainContent = ({ children, className }: Props) => {
  return (
    <div className={classNames('flex-1 w-full h-full overflow-x-auto relative py-10', className)}>
      <div className='max-w-[740px] mx-auto'>{children}</div>
    </div>
  );
};
