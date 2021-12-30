// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const LeaderBoardCard = ({}: Props) => {
  return (
    <div className='p-4 border border-solid border-gray-1'>
      <div className='text-xl font-bold uppercase font-disketMono'>Top Example A</div>
      <div className='my-4 border-t border-solid border-gray-1'></div>
      {new Array(10).fill(null).map((_, index) => (
        <div className='flex items-center justify-between mt-2 first:mt-0' key={index}>
          <div>{index + 1}.Name</div>
          <div>0x12131...1312</div>
        </div>
      ))}
    </div>
  );
};
