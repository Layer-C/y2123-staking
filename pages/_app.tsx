import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { AccountProvider, ContractProvider, ServerSidePropsProvider } from 'contexts';
import Head from 'next/head';

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AccountProvider>
        <ContractProvider>
          <Head>
            <title>{process.env.NEXT_PUBLIC_NFT_NAME}</title>
          </Head>
          <ServerSidePropsProvider>
            <Component {...pageProps} />
          </ServerSidePropsProvider>
        </ContractProvider>
      </AccountProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
