import { StakeApis } from 'apis/stake';
import {
  AppLayout,
  StakingSection,
  ClanSection,
  LeaderBoardSection,
  Button,
  Input,
  ClaimDetailsModal,
} from 'components';
import { useServerSideProps } from 'hooks/useServerSideProps';
import type { InferGetServerSidePropsType } from 'next';
import { FaCog } from 'react-icons/fa';
import Xmas from 'public/icons/xmas.svg';
import classNames from 'classnames';
import { ClassNameUtils, NumberUtils } from 'utils';
import React from 'react';
import { useVisibilityControl } from 'hooks/useVisibilityControl';

export async function getServerSideProps() {
  const data = await StakeApis.get();

  return {
    props: { data },
  };
}

const Home = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useServerSideProps('stakeData', data);
  const [amount, setAmount] = React.useState('');
  const [hasEnteredAmount, setHasEnterAmount] = React.useState(false);
  const [shortcut, setShortcut] = React.useState<number>();
  const [error, setError] = React.useState(false);

  const { claimableTokens } = data;

  const modalControl = useVisibilityControl();

  return (
    <AppLayout background='/dashboard-background.png'>
      <ClaimDetailsModal control={modalControl} />
      <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2 backdrop-blur-[50px]'></AppLayout.Header>
      <AppLayout.MainContent>
        <AppLayout.Section label='CLAIMING OF TOKENS' className='flex flex-col items-center'>
          <div className='w-[336px] mx-auto'>
            <div
              style={{
                background:
                  'linear-gradient(90deg, rgba(43, 242, 255, 0.2) 0%, rgba(43, 242, 255, 0.2) 0.01%, rgba(43, 242, 255, 0) 100%, rgba(43, 242, 255, 0.17) 100%)',
              }}
              className={classNames(
                'flex mt-5 pl-4 items-center justify-between border-l-4 border-solid border-cyan-1 h-[74px]'
              )}>
              <div className='flex items-center'>
                <div className='font-disketMono text-[44px] font-bold'>{NumberUtils.pad(claimableTokens)}</div>
                <div className='ml-2 text-sm uppercase break-words whitespace-pre'>{'OXGN\nClaimable'}</div>
              </div>
            </div>
            <div className='mt-2 text-gray-1'>Amount to be claimed can’t be edited</div>
            <div className='mt-5'>Donate amount</div>
            <Input
              error={error}
              pattern='\d+\.?((\d{1})|\d{2})?'
              value={amount}
              onChange={e => {
                setError(false);
                setAmount(e.target.value);
                setHasEnterAmount(true);
              }}
            />
            {!hasEnteredAmount && (
              <div className='grid grid-cols-4 gap-1 mt-2'>
                {new Array(4).fill(null).map((_, index) => (
                  <div
                    key={index}
                    className='cursor-pointer'
                    onClick={() => {
                      setAmount((Math.floor(25 * (index + 1) * claimableTokens) / 100).toString());
                      setShortcut(index);
                    }}>
                    <div
                      className={ClassNameUtils.withTwReplaceable('bg')('h-2 bg-gray-1', {
                        'bg-blue-1': shortcut === index,
                      })}></div>
                    <div className={classNames('mt-1 text-center text-gray-1', { 'text-white': shortcut === index })}>
                      {25 * (index + 1)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!!error && <div className='mt-2 text-error'>Please enter amount not exceeding 21 $OXGN</div>}
          </div>
          <Button
            className='w-[182px] mt-10'
            onClick={() => {
              if (!amount) setError(true);
              else {
                modalControl.show();
              }
            }}>
            Next
          </Button>
        </AppLayout.Section>
      </AppLayout.MainContent>
    </AppLayout>
  );
};

export default Home;
