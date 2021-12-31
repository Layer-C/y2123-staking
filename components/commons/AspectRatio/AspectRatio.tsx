import classNames from 'classnames';
import React from 'react';

export type Ratio = '1-1' | '4-3' | '16-9' | null;

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: React.ReactNode;
  ratio: string;
  className?: string;
};

export const AspectRatio = ({ ratio, children, className, ...restProps }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [x, y] = ratio?.split('-') || [];

  return ratio === null ? (
    <>{children}</>
  ) : (
    <div className={classNames('aspect-ratio', 'relative w-full', className)} {...restProps}>
      <div style={{ paddingTop: (+y / +x) * 100 + '%' }} ref={ref}></div>
      <div className='absolute top-0 bottom-0 left-0 right-0'>{children}</div>
    </div>
  );
};
