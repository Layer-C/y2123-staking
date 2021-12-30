import classNames from 'classnames';
import React from 'react';
import { Children, ClassName } from 'types';

export type Type = 'info' | 'error' | 'none';

type NotificationProps = Children &
  ClassName & {
    onHide: () => void;
    type?: Type;
  };

export const Notification = ({ children, onHide, type = 'info', className }: NotificationProps) => {
  return (
    <div
      className={classNames(
        'py-2 px-6 text-purplish-black-1',
        {
          'bg-green-1': type === 'info',
          'bg-red-1': type === 'error',
        },
        className
      )}>
      {children}
    </div>
  );
};
