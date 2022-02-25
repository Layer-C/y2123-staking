import { StakeApis } from 'apis/stake';
import classNames from 'classnames';
import { AppLayout, Button, ClaimDetailsModal, Input } from 'components';
import { useAccountContext } from 'contexts/Account';
import { useServerSideProps } from 'hooks/useServerSideProps';
import { useVisibilityControl } from 'hooks/useVisibilityControl';
import type { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { FaLessThan } from 'react-icons/fa';
import { ClassNameUtils, NumberUtils } from 'utils';
import InfoIcon from 'public/icons/info.svg';
import { DonateInfoModal } from 'components/DonateInfoModal';

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
  const [willDonate, setWillDonate] = React.useState(false);

  const {
    accountData: { claimable },
  } = useAccountContext();

  const modalControl = useVisibilityControl();
  const donateInfoModalControl = useVisibilityControl();

  return (
    <AppLayout background='/dashboard-background.png'>
      <ClaimDetailsModal control={modalControl} donateAmount={amount} />
      <DonateInfoModal control={donateInfoModalControl} />
      <AppLayout.Header title='Dashboard' className='bg-purplish-gray-2 backdrop-blur-[50px]'></AppLayout.Header>
      <AppLayout.MainContent>
        <Link href='/dashboard' passHref>
          <Button colorScheme='secondary' className='!font-normal mb-[37px]'>
            <FaLessThan className='mr-2 !font-normal' /> Back
          </Button>
        </Link>
        <AppLayout.Section label='CLAIMING OF TOKENS' className='flex flex-col items-center'>
          <div className='max-w-[336px] w-full mx-auto'>
            <div
              style={{
                background:
                  'linear-gradient(90deg, rgba(43, 242, 255, 0.2) 0%, rgba(43, 242, 255, 0.2) 0.01%, rgba(43, 242, 255, 0) 100%, rgba(43, 242, 255, 0.17) 100%)',
              }}
              className={classNames(
                'flex mt-5 pl-4 items-center justify-between border-l-4 border-solid border-cyan-1 h-[74px]'
              )}>
              <div className='flex items-center'>
                <div className='font-disketMono text-[44px] font-bold'>{NumberUtils.pad(claimable, 2, 2)}</div>
                <div className='ml-2 text-sm uppercase break-words whitespace-pre'>{'OXGN\nClaimable'}</div>
              </div>
            </div>
            <div className='mt-2 text-gray-1'>Amount to be claimed can’t be edited</div>

            {willDonate ? (
              <>
                <div className='mt-5'>Donate amount</div>
                <Input
                  error={error}
                  pattern='\d+\.?((\d{1})|\d{2})?'
                  value={amount}
                  onChange={e => {
                    const { value } = e.target;
                    setError(false);
                    setAmount(value);
                    setHasEnterAmount(!!value);
                    setShortcut(undefined);
                  }}
                />
                {!hasEnteredAmount && (
                  <div className='grid grid-cols-4 gap-1 mt-2'>
                    {new Array(4).fill(null).map((_, index) => (
                      <div
                        key={index}
                        className='cursor-pointer'
                        onClick={() => {
                          setAmount((Math.floor(25 * (index + 1) * Number(claimable)) / 100).toString());
                          setShortcut(index);
                        }}>
                        <div
                          className={ClassNameUtils.withTwReplaceable('bg')('h-2 bg-gray-1', {
                            'bg-blue-1': Number(shortcut) >= index,
                          })}></div>
                        <div
                          className={classNames('mt-1 text-center text-gray-1', {
                            'text-white': Number(shortcut) >= index,
                          })}>
                          {25 * (index + 1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!!error && <div className='mt-2 text-error'>Please enter amount not exceeding {claimable} $OXGN</div>}
              </>
            ) : (
              <div className='mt-5 flex gap-1'>
                I want to{' '}
                <span
                  className='text-blue-1 underline font-bold gap-1 flex items-center cursor-pointer'
                  onClick={() => setWillDonate(true)}>
                  donate part of my tokens
                  <div onMouseEnter={() => donateInfoModalControl.show()}>
                    <InfoIcon />
                  </div>
                </span>
              </div>
            )}
          </div>
          <Button
            className='w-[182px] mt-10'
            onClick={() => {
              if (+amount > +claimable) setError(true);
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
