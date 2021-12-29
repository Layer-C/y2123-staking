import { Children } from 'types/common';
import { HTMLButtonProps } from 'types/htmlElements';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & HTMLButtonProps;

export const Button = (props: Props) => {
  return (
    <button
      type='button'
      className='inline-flex items-center px-4 py-2 text-xs font-medium text-white border border-transparent rounded shadow-sm bg-blue-1 focus:outline-none focus:ring-2 focus:ring-offset-2'
      {...props}></button>
  );
};
