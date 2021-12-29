import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Blockies from 'react-blockies';
import { FaTwitter, FaDiscord, FaShip } from 'react-icons/fa';
import ConnectButton from './ConnectButton';
import Container from './Container';
import NextLink from './NextLink';
import { injected } from 'utils/wallet/connectors';
import { Children, ClassName } from 'types/common';
import classNames from 'classnames';

type Props = Children &
  ClassName & {
    title?: string;
  };

export function Header({ title, children, className }: Props) {
  const { activate, setError, account, active } = useWeb3React();

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
      <header className='py-2'>
        <Container>
          <div className='flex items-center justify-between'>
            <NextLink href='/' className='font-bold text-white text-md'>
              <span className='flex items-center'>
                <span className='hidden ml-2 sm:block'>{process.env.NEXT_PUBLIC_NFT_NAME}</span>
              </span>
            </NextLink>

            <div className='font-bold text-white uppercase text-md'>{title}</div>

            <div className='flex items-center ml-2 space-x-2 sm:ml-0'>
              <a
                href={process.env.NEXT_PUBLIC_TWITTER_URL}
                aria-label={`${process.env.NEXT_PUBLIC_NFT_NAME} on Twitter`}
                rel='noopener noreferrer'
                target='_blank'
                className='p-2 bg-gray-700 rounded-full hover:bg-gray-600'>
                <FaTwitter />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_DISCORD_URL}
                aria-label={`${process.env.NEXT_PUBLIC_NFT_NAME} on Discord`}
                rel='noopener noreferrer'
                target='_blank'
                className='p-2 bg-gray-700 rounded-full hover:bg-gray-600'>
                <FaDiscord />
              </a>
              <a
                href={process.env.NEXT_PUBLIC_OPENSEA_URL}
                aria-label={`${process.env.NEXT_PUBLIC_NFT_NAME} on OpenSea`}
                rel='noopener noreferrer'
                target='_blank'
                className='p-2 bg-gray-700 rounded-full hover:bg-gray-600'>
                <FaShip />
              </a>

              {active && account ? (
                <span className='flex items-center p-2 space-x-2 bg-gray-700 rounded-full'>
                  <span>
                    <Blockies seed={account.toLowerCase()} className='rounded-full' />
                  </span>
                  <span>{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
                </span>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
        </Container>
      </header>
      {children}
    </div>
  );
}
