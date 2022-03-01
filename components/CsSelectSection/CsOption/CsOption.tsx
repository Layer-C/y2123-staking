import Image from 'next/image';
import { CitizenScientist } from 'types/citizenScientist';
import CheckboxIcon from 'public/icons/checkbox.svg';
import classNames from 'classnames';
import { AspectRatio, Checkbox } from 'components';
import HollowCircle from 'public/icons/hollow-circle.svg';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  data: CitizenScientist;
};

// eslint-disable-next-line no-empty-pattern
export const CsOption = ({ data: { name, staked, image = '/citizen-scientist.png', link } }: Props) => {
  const id = name.split('#')[1];
  return (
    <div>
      <Checkbox value={id}>
        {({ isChecked }) => (
          <AspectRatio ratio='10-12'>
            <Image
              unoptimized
              loader={() => image}
              src={image}
              alt={process.env.NEXT_PUBLIC_NFT_NAME}
              className={classNames({ 'opacity-50': !isChecked })}
              layout='fill'
            />
            <div className='absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 bg-purplish-black-1'>
              <div className='w-[18px] h-[18px] bg-white rounded'>
                {!!isChecked && <CheckboxIcon className='text-green-1' />}
              </div>
            </div>
          </AspectRatio>
        )}
      </Checkbox>
      <div className='mt-2 text-xs'>{name}</div>
      {!!staked && (
        <div className='text-xs'>
          <div className='mt-2 text-gray-1'>$OXGN Earned</div>
          <div className='flex items-center mt-1'>
            <HollowCircle width={20} height={20} />
            <div>1234</div>
          </div>
        </div>
      )}
    </div>
  );
};
