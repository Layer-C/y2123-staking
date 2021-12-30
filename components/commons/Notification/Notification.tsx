import classNames from 'classnames';
import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { Children, ClassName } from 'types';
import TimesSquare from 'public/icons/times-square.svg';

export type Type = 'info' | 'error' | 'none' | 'success';

type NotificationProps = Children &
  ClassName & {
    onHide: () => void;
    type?: Type;
  };

export const Notification = ({ children, onHide, type = 'info', className }: NotificationProps) => {
  const icon = (() => {
    switch (type) {
      case 'success':
        return <FaCheckSquare className='mr-1' size={20} />;
      case 'error':
        return <TimesSquare className='mr-1' width={14} height={14} />;
    }
  })();

  return (
    <div
      className={classNames(
        'py-2 px-6 text-purplish-black-1',
        {
          'bg-green-1': type === 'success',
          'bg-red-1': type === 'error',
        },
        className
      )}>
      <div className='flex items-center font-bold uppercase font-disketMono'>
        {icon}
        {children}
      </div>
    </div>
  );
};
