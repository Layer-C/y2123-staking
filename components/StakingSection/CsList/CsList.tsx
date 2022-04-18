import { CitizenScientist } from 'types';
import Image from 'next/image';
import { Pagination } from 'components';
import React from 'react';
import LockIcon from 'public/icons/lock.svg';
import TokenIcon from 'public/icons/token.svg';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  items: CitizenScientist[];
  isStaked?: boolean;
};

// eslint-disable-next-line no-empty-pattern
export const CsList = ({ items = [], isStaked = false }: Props) => {
  const [page, setPage] = React.useState(1);

  return (
    <div className='mt-3'>
      <div className='grid grid-cols-6 gap-x-3 gap-y-6 sm:grid-cols-3'>
        {items
          .slice((page - 1) * 6, page * 6)
          .map(({ id, name, dailyReward, image = '/citizen-scientist.png', link }, i) => (
            <a key={i} href={link} target='_blank' rel='noreferrer'>
              <div className='relative'>
                <Image
                  unoptimized
                  loader={() => image}
                  src={image}
                  alt={process.env.NEXT_PUBLIC_NFT_NAME}
                  width={100}
                  height={120}
                />
                {isStaked && (
                  <div className='absolute bottom-0 right-0 mb-2'>
                    <LockIcon />
                  </div>
                )}
              </div>
              <div className='text-xs'>{name}</div>
              <div className='text-xs text-gray-1 mt-2 mb-1'>Daily Rewards</div>
              <div className='flex gap-1 items-center'>
                <TokenIcon /> <div className='font-bold text-xs text-white font-avenirNext'>{dailyReward}</div>
              </div>
            </a>
          ))}
      </div>
      <Pagination
        className='mx-auto w-[fit-content] mt-11'
        page={page}
        onChange={setPage}
        totalRecordCount={items.length}
      />
    </div>
  );
};
