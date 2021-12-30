import classNames from 'classnames';
import { Portal } from 'components';
import { useScrollDisable, VisibilityControl } from 'hooks';
import React from 'react';
import { Children, ClassName } from 'types';
import { ClassNameUtils } from 'utils';

const Title = ({
  children,
  className,
  ...restProps
}: Children & ClassName & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={ClassNameUtils.withTwReplaceable('justify-')(
        'flex items-center justify-center mb-7 text-xl font-disketMono font-bold',
        className
      )}
      {...restProps}>
      {children}
    </div>
  );
};

const Actions = ({
  children,
  className,
  ...restProps
}: Children & ClassName & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div className={classNames('flex flex-col justify-center mt-8 w-[182px] mx-auto', className)} {...restProps}>
      {children}
    </div>
  );
};

export type Props = Partial<Children> &
  ClassName &
  Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'ref'> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
    control: VisibilityControl;
    onHideByBackdropClick?: () => void;
  };

export const Modal = ({ className, children, size = 'auto', control, onHideByBackdropClick, ...restProps }: Props) => {
  useScrollDisable(control.visible);

  const handleBackdropClick = () => {
    control.hide();

    onHideByBackdropClick?.();
  };

  if (!control.visible) return null;

  return (
    <Portal>
      <div className={ClassNameUtils.withTwReplaceable('opacity-', 'z-')('fixed top-0 left-0 w-screen h-screen z-50')}>
        <div className={classNames('w-full h-full opacity-50 bg-purplish-black-1')} onClick={handleBackdropClick}></div>
        <div
          style={{
            background: 'linear-gradient(98.86deg, rgba(27, 29, 44, 0.5) 55.16%, rgba(63, 82, 208, 0.5) 99.64%)',
          }}
          className={ClassNameUtils.withTwReplaceable('top-', 'left-', 'transform', 'p-', 'rounded', 'w-')(
            'absolute top-[140px] left-1/2 transform -translate-x-1/2 rounded-xl p-12 opacity-1 shadow-2xl max-w-9/10 backdrop-blur-[50px] min-w-[552px]',
            { 'w-108': size === 'sm' },
            { 'w-175': size === 'md' },
            { 'w-225': size === 'lg' },
            { 'w-320': size === 'xl' },
            className
          )}
          {...restProps}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.Actions = Actions;
Modal.Title = Title;
