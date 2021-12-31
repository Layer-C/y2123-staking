import classNames from 'classnames';
import { PaginationItem, usePagination, UsePaginationProps } from 'hooks';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ClassName } from 'types/common';

type Props = UsePaginationProps & ClassName;

export const Pagination = ({ className, pageEndpointRange = 4, pageRange = 3, perPage = 6, ...restProps }: Props) => {
  const { items } = usePagination({ ...restProps, pageEndpointRange, pageRange, perPage });

  const renderPaginationItem = ({ type, disabled, onClick, page, selected }: PaginationItem, index: number) => {
    if (type === 'previous')
      return (
        <FaArrowLeft
          className={classNames('mr-5 text-blue-1 cursor-pointer', { disabled: disabled })}
          onClick={onClick}
          key={index}
          size={16}
        />
      );
    if (type === 'ellipsis')
      return (
        <div key={index} onClick={onClick}>
          ...
        </div>
      );
    if (type === 'page')
      return (
        <div
          key={index}
          onClick={onClick}
          className={classNames('flex items-center justify-center w-8 h-8 cursor-pointer', {
            'bg-purplish-gray-1 text-white': selected,
          })}>
          {page}
        </div>
      );
    if (type === 'next')
      return (
        <FaArrowRight
          className={classNames('ml-5 text-blue-1 cursor-pointer', { disabled: disabled })}
          key={index}
          onClick={onClick}
          size={16}
        />
      );
  };

  return (
    <div
      className={classNames(
        'flex items-center h-[33px] gap-1 mx-auto w-fit text-gray-1 font-disketMono font-bold text-md select-none',
        className
      )}>
      {items.map(renderPaginationItem)}
    </div>
  );
};
