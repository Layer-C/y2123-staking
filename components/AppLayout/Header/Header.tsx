import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { useEffect } from 'react';
import Blockies from 'react-blockies';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { BsMedium } from 'react-icons/bs';
import { Children, ClassName } from 'types';
import { injected } from 'utils/wallet/connectors';
import ConnectButton from './ConnectButton';
import Container from './Container';
import NextLink from './NextLink';
import { useRouter } from 'next/router';

type Props = Children &
  ClassName & {
    title?: string;
  };

export function Header({ title, children, className }: Props) {
  const { activate, setError, account, active, deactivate, connector } = useWeb3React();
  const router = useRouter();
  useEffect(() => {
    async function loadInjectedWallet() {
      const isAuthorized = await injected.isAuthorized();
      if (isAuthorized) {
        await activate(injected);
      }
    }
    if (typeof window.ethereum !== 'undefined') {
      try {
        loadInjectedWallet();
      } catch (error) {
        if (error instanceof Error) setError(error);
      }
    }
  }, [activate, setError]);

  return (
    <div className={classNames('sticky top-0 z-40', className)}>
      <header className='h-[80px] flex items-center py-2 font-bold font-disketMono'>
        <Container>
          <div className='flex items-center justify-between'>
            <div className='w-0'></div>

            <div className='font-bold text-white uppercase text-md sm:hidden'>
              <NextLink href={process.env.NEXT_PUBLIC_SITE_URL || 'https://www.y2123.com/'}>{title}</NextLink>
            </div>

            <div className='flex justify-end w-0'>
              <div className='flex items-center ml-2 space-x-2 sm:ml-0'>
                <a
                  href={process.env.NEXT_PUBLIC_DISCORD_URL}
                  aria-label={`${process.env.NEXT_PUBLIC_NFT_NAME} on Discord`}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='p-2 bg-gray-700 rounded-full hover:bg-gray-600'>
                  <FaDiscord />
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_TWITTER_URL}
                  aria-label={`${process.env.NEXT_PUBLIC_NFT_NAME} on Twitter`}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='p-2 bg-gray-700 rounded-full hover:bg-gray-600'>
                  <FaTwitter />
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_MEDIUM_URL}
                  aria-label={`${process.env.NEXT_PUBLIC_NFT_NAME} on OpenSea`}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='p-2 bg-gray-700 rounded-full hover:bg-gray-600'>
                  <BsMedium />
                </a>

                {active && account ? (
                  <span
                    className='flex items-center h-[34px] px-5 py-1 space-x-2 rounded bg-purplish-black-1 cursor-pointer'
                    onClick={() => {
                      deactivate();
                      connector?.deactivate();
                      router.replace('/');
                    }}>
                    <span>
                      <Blockies size={5} seed={account.toLowerCase()} className='rounded-full' />
                    </span>
                    <span>{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
                  </span>
                ) : (
                  <ConnectButton />
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>
      {children}
    </div>
  );
}
