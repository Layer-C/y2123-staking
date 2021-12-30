import Image from 'next/image';
import { CitizenScientist } from 'types/citizenScientist';
import CheckboxIcon from 'public/icons/checkbox.svg';
import classNames from 'classnames';
import { Checkbox } from 'components';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  data: CitizenScientist;
};

// eslint-disable-next-line no-empty-pattern
export const CsOption = ({ data: { id, name } }: Props) => {
  return (
    <div>
      <Checkbox value={id}>
        {({ isChecked }) => (
          <div className='relative h-[120px]'>
            <Image
              src='/citizen-scientist.png'
              alt={process.env.NEXT_PUBLIC_NFT_NAME}
              width={100}
              height={120}
              className={classNames({ 'opacity-50': !isChecked })}
            />
            <div className='absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-purplish-black-1'>
              <div className='w-[18px] h-[18px] bg-white rounded'>
                {!!isChecked && <CheckboxIcon className='text-green-1' />}
              </div>
            </div>
          </div>
        )}
      </Checkbox>
      <div className='mt-2 text-xs'>{name}</div>
    </div>
  );
};
