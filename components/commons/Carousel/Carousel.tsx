import classNames from 'classnames';
import noop from 'lodash/noop';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Children, ClassName } from 'types/common';
import { ClassNameUtils } from 'utils/className';

// eslint-disable-next-line @typescript-eslint/ban-types

type CarouselProviderValue = {
  index?: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

const CarouselContext = React.createContext<CarouselProviderValue>({ index: undefined, setIndex: noop });

type Props = Children &
  ClassName & {
    dots?: boolean;
    arrows?: boolean;
    max: number;
  };

// eslint-disable-next-line no-empty-pattern
export const Carousel = ({ children, max, dots = false, arrows = true }: Props) => {
  const [index, setIndex] = React.useState<number>(0);

  const providerValue = React.useMemo(() => ({ index, setIndex }), [index]);

  return (
    <CarouselContext.Provider value={providerValue}>
      <div>
        <div className={classNames('carousel', 'flex items-center justify-between')}>
          {!!arrows && (
            <FaArrowLeft
              className={ClassNameUtils.withTwReplaceable('text-')('text-blue-1 cursor-pointer flex-shrink-0 mr-7', {
                'text-gray-1 cursor-default pointer-events-none': index === 0,
              })}
              onClick={() => setIndex(p => Math.max(p - 1, 0))}
            />
          )}
          {children}
          {!!arrows && (
            <FaArrowRight
              className={ClassNameUtils.withTwReplaceable('text-')('text-blue-1 cursor-pointer flex-shrink-0 ml-7', {
                'text-gray-1 cursor-default pointer-events-none': index === max - 1,
              })}
              onClick={() => setIndex(p => Math.min(p + 1, max - 1))}
            />
          )}
        </div>
        {!!dots && (
          <div className='flex items-center justify-center w-full gap-3 mt-3'>
            {new Array(max).fill(null).map((_, idx) => (
              <div
                key={idx}
                onClick={() => setIndex(idx)}
                className={ClassNameUtils.withTwReplaceable('bg-')(
                  'w-3 h-3 border-2 border-white border-solid bg-purplish-black-1 rounded-full cursor-pointer',
                  {
                    'bg-blue-1': index === idx,
                  }
                )}></div>
            ))}
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
};

type ItemProps = Children & {
  index: string | number;
};

const Item = ({ children, index: valueProp }: ItemProps) => {
  const { index } = React.useContext(CarouselContext);

  if (index !== valueProp) return null;

  return <>{children}</>;
};

Carousel.Item = Item;
