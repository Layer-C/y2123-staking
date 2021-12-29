import { AppLayout } from 'components';
import Meta from './Meta';
import Image from 'next/image';
import { useContractContext } from 'contexts/Contract';
import React from 'react';
import { useWeb3React } from '@web3-react/core';

type Props = {
  children: React.ReactNode;
  pageTitle?: string;
};

export default function Layout({ children, pageTitle }: Props) {
  const { chainId, active } = useWeb3React();
  const { errMsg, setErrMsg } = useContractContext();

  React.useEffect(() => {
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
    <>
      <Meta pageTitle={pageTitle} />
      <div className='z-0'>
        <Image
          alt={process.env.NEXT_PUBLIC_NFT_NAME}
          src='/assets/bg.jpg'
          layout='fill'
          objectFit='cover'
          quality={100}
        />
      </div>
      <AppLayout.Header>
        {errMsg && <div className='p-4 text-center text-pink-900 bg-red-400'>{errMsg}</div>}
      </AppLayout.Header>
      <div className='sticky z-50'>
        <main>{children}</main>
      </div>
    </>
  );
}
