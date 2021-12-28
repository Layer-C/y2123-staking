import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import Blockies from 'react-blockies';
import { FaTwitter, FaDiscord, FaShip } from 'react-icons/fa';
import ConnectButton from './ConnectButton';
import Container from './Container';
import NextLink from './NextLink';
import { useContractContext } from 'contexts';
import { injected } from '../utils/wallet/connectors';

export default function Header() {
  const { activate, setError, chainId, account, active } = useWeb3React();

  const { errMsg, setErrMsg } = useContractContext();

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

  useEffect(() => {
    if (active) {
      if (chainId && chainId.toString() !== process.env.NEXT_PUBLIC_NETWORK_ID) {
        setErrMsg(`Change the network to ${process.env.NEXT_PUBLIC_NETWORK_NAME}.`);
      } else {
        setErrMsg('');
      }
    } else {
      setErrMsg('');
    }
  }, [active, chainId, setErrMsg]);

  return (
    <div className='sticky top-0 z-40'>
      <header className='py-2'>
        <Container>
          <div className='flex items-center justify-between'>
            <NextLink href='/' className='text-2xl font-bold text-white'>
              <span className='flex items-center'>
                <span className='hidden ml-2 sm:block'>{process.env.NEXT_PUBLIC_NFT_NAME}</span>
              </span>
            </NextLink>

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

      {errMsg && <div className='p-4 text-center text-pink-900 bg-red-400'>{errMsg}</div>}
    </div>
  );
}
