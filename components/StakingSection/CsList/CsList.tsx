import { CitizenScientist } from 'types';
import Image from 'next/image';
import { Pagination } from 'components';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  items: CitizenScientist[];
};

// eslint-disable-next-line no-empty-pattern
export const CsList = ({ items }: Props) => {
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    console.log('mount');
  }, []);

  return (
    <div className='mt-3'>
      <div className='grid grid-cols-6'>
        {items.slice((page - 1) * 6, page * 6).map(({ id, name, staked }) => (
          <div key={id}>
            <Image src='/citizen-scientist.png' alt={process.env.NEXT_PUBLIC_NFT_NAME} width={100} height={120} />
            <div className='text-xs'>{name}</div>
          </div>
        ))}
      </div>
      <Pagination
        className='mx-auto w-[fit-content] mt-11'
        page={page}
        onChange={setPage}
        pageEndpointRange={5}
        pageRange={5}
        perPage={6}
        totalRecordCount={items.length}
      />
    </div>
  );
};
