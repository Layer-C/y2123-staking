import classNames from 'classnames';
import { Children, ClassName } from 'types/common';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & Children & { label?: string; id?: string };

export const Section = ({ className, children, label, id }: Props) => {
  return (
    <div
      id={id}
      style={{
        background: 'linear-gradient(98.86deg, rgba(27, 29, 44, 0.5) 55.16%, rgba(63, 82, 208, 0.5) 99.64%)',
        border: '1px solid',
        borderImageSource: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.7) 100%)',
      }}
      className={classNames('relative backdrop-blur-[50px] text-white w-full p-10 sm:px-5', className)}>
      {!!label && (
        <div className='absolute max-w-[80%] top-0 left-0 px-5 py-2 text-black uppercase transform -translate-y-1/2 bg-white font-disketMono'>
          {label}
        </div>
      )}
      {children}
    </div>
  );
};
