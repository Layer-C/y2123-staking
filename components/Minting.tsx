import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { IconContext } from 'react-icons';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { useContractContext } from 'contexts';
import { MerkleTree } from 'merkletreejs';
import ABI from '../contract/Y2123.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const keccak256 = require('keccak256');

export default function Minting() {
  const { chainId, account, active } = useWeb3React();
  const { message, errMsg, setMessage, setErrMsg } = useContractContext();
  const [totalSupply, setTotalSupply] = useState('?');
  const [mintMax, setMintMax] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
  const [isSaleEnabled, setIsSaleEnabled] = useState(false);
  const [isPresaleEnabled, setIsPresaleEnabled] = useState(false);
  const [isFreeMintEnabled, setIsFreeMintEnabled] = useState(false);

  type ErrorWithMessage = {
    message: string;
  };

  type ErrorEthers = {
    error: {
      message: string;
    };
  };

  function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as Record<string, unknown>).message === 'string'
    );
  }

  function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    if (isErrorWithMessage(maybeError)) return maybeError;

    try {
      return new Error(JSON.stringify(maybeError));
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return new Error(String(maybeError));
    }
  }

  function getErrorMessage(error: unknown) {
    return toErrorWithMessage(error).message;
  }

  async function claimNFTs() {
    if (active && account) {
      setErrMsg(''); // reset error message
      const cost = process.env.NEXT_PUBLIC_DISPLAY_COST;
      const totalCost = (Number(cost) * mintAmount).toString();
      setMessage('');
      setIsPending(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_Y2123_CONTRACT!, ABI.abi, signer);

        let proof: string[] = [];

        if (isPresaleEnabled) {
          const list = ['0x8008A26d56cc221199A4E708cFc33e2a700d4fD7'];
          const merkleTree = new MerkleTree(list, keccak256, { hashLeaves: true, sortPairs: true });
          const hashedAddress = keccak256(account);
          proof = merkleTree.getHexProof(hashedAddress);
        }

        const transaction = await contract.paidMint(mintAmount, proof, { value: ethers.utils.parseEther(totalCost) });

        setIsPending(false);
        setIsMinting(true);
        await transaction.wait();
        setIsMinting(false);
        setMessage(
          `Yay! ${mintAmount} ${process.env.NEXT_PUBLIC_NFT_SYMBOL} successfully sent to ${account.substring(
            0,
            6
          )}...${account.substring(account.length - 4)}`
        );
        fetchTotalSupply();
      } catch (error) {
        setIsPending(false);
        const e = error as ErrorEthers;
        if (e.error === undefined) {
          setErrMsg(getErrorMessage(error));
        } else {
          setErrMsg(e.error.message.replace('execution reverted: ', ''));
        }
      }
    }
  }

  async function claimFreeNFT() {
    if (active && account) {
      setErrMsg(''); // reset error message
      setMessage('');
      setIsPending(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_Y2123_CONTRACT!, ABI.abi, signer);

        let proof: string[] = [];
        const list = [
          '0x5ae71e71549Ad23e93A4d0582C470180B9530a31',
          '0xaF3bf14B17900f02E0188F50f675CfDde4ed8776',
          '0x0D1a8dbBde47340e1aD0c7dCC38E42AB7a45E8e9',
          '0x337493F5C16B697e98D6cB21Da8f240A140BBE72',
          '0x4B95C00789c5ef1bee520D63e980455666148E2E',
          '0x8360d6D8A7B00C0564130B0f1FB6e82789415deE',
          '0x050144aC034e76FafB6BAf81CB40Aff5991a01Fb',
        ];
        const merkleTree = new MerkleTree(list, keccak256, { hashLeaves: true, sortPairs: true });
        const hashedAddress = keccak256(account);
        proof = merkleTree.getHexProof(hashedAddress);

        const transaction = await contract.freeMint(proof, { value: 0 });

        setIsPending(false);
        setIsMinting(true);
        await transaction.wait();
        setIsMinting(false);
        setMessage(
          `Yay! ${mintAmount} ${process.env.NEXT_PUBLIC_NFT_SYMBOL} successfully sent to ${account.substring(
            0,
            6
          )}...${account.substring(account.length - 4)}`
        );
        fetchTotalSupply();
      } catch (error) {
        setIsPending(false);
        const e = error as ErrorEthers;
        if (e.error === undefined) {
          setErrMsg(getErrorMessage(error));
        } else {
          setErrMsg(e.error.message.replace('execution reverted: ', ''));
        }
      }
    }
  }

  function decrementMintAmount() {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  }

  function incrementMintAmount() {
    if (mintAmount < mintMax) {
      setMintAmount(mintAmount + 1);
    }
  }

  async function fetchTotalSupply() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_Y2123_CONTRACT!, ABI.abi, provider);
    const totalSupply = await contract.totalSupply();
    setTotalSupply(totalSupply.toString());

    const saleEnabled = await contract.saleEnabled();
    setIsSaleEnabled(saleEnabled);
    const presaleEnabled = await contract.presaleEnabled();
    setIsPresaleEnabled(presaleEnabled);
    const freeMintEnabled = await contract.freeMintEnabled();
    setIsPresaleEnabled(freeMintEnabled);

    if (saleEnabled && presaleEnabled) {
      const maxMintPerAddress = await contract.maxMintPerAddress();
      setMintMax(maxMintPerAddress);
    } else if (saleEnabled && !presaleEnabled) {
      const maxMintPerTx = await contract.maxMintPerTx();
      setMintMax(maxMintPerTx);
    }
  }

  useEffect(() => {
    if (active && chainId && chainId.toString() === process.env.NEXT_PUBLIC_CHAIN_ID) {
      fetchTotalSupply();
    } else {
      setTotalSupply('?');
    }
  }, [active, chainId]);

  return (
    <>
      <div className='mt-4 space-y-4 bg-white opacity-20 backdrop-blur-sm'></div>
      <div className='p-8 space-y-4 rounded'>
        <div className='text-3xl font-bold text-center'>
          {totalSupply} / {process.env.NEXT_PUBLIC_MAX_SUPPLY}
        </div>
        <div className='text-center'>
          <p className='text-xl'>{`${process.env.NEXT_PUBLIC_DISPLAY_COST} ${process.env.NEXT_PUBLIC_CHAIN} per 1 NFT`}</p>
          <p>(excluding gas fees)</p>
        </div>
        <div className='flex items-center justify-center space-x-4'>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <button
              type='button'
              className={mintAmount === 1 ? 'text-gray-500 cursor-default' : ''}
              onClick={decrementMintAmount}
              disabled={false}>
              <FaMinusCircle />
            </button>
            <span className='text-xl'>{mintAmount}</span>
            <button
              type='button'
              className={mintAmount == mintMax ? 'text-gray-500 cursor-default' : ''}
              onClick={incrementMintAmount}
              disabled={false}>
              <FaPlusCircle />
            </button>
          </IconContext.Provider>
        </div>

        <div className='flex justify-center'>
          {!active ? (
            <button
              type='button'
              className={`rounded px-4 py-2 bg-gray-700 font-bold w-40 cursor-not-allowed`}
              disabled={true}
              onClick={claimNFTs}>
              Buy
            </button>
          ) : (
            <>
              {isPending || isMinting ? (
                <button
                  type='button'
                  className='flex items-center justify-center w-40 px-4 py-2 font-bold bg-red-700 rounded cursor-not-allowed'
                  disabled>
                  <svg
                    className='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  {isPending && 'Pending'}
                  {isMinting && 'Minting'}
                  {!isPending && !isMinting && 'Processing'}
                </button>
              ) : (
                <button
                  type='button'
                  className={`rounded px-4 py-2 bg-blue-700 hover:bg-blue-600 font-bold w-40`}
                  onClick={claimNFTs}>
                  Buy
                </button>
              )}
            </>
          )}
        </div>

        <div className='flex justify-center'>
          {!active ? (
            <button
              type='button'
              className={`rounded px-4 py-2 bg-gray-700 font-bold w-40 cursor-not-allowed`}
              disabled={true}
              onClick={claimFreeNFT}>
              Claim Free
            </button>
          ) : (
            <>
              {isPending || isMinting ? (
                <button
                  type='button'
                  className='flex items-center justify-center w-40 px-4 py-2 font-bold bg-red-700 rounded cursor-not-allowed'
                  disabled>
                  <svg
                    className='w-5 h-5 mr-3 -ml-1 text-white animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  {isPending && 'Pending'}
                  {isMinting && 'Minting'}
                  {!isPending && !isMinting && 'Processing'}
                </button>
              ) : (
                <button
                  type='button'
                  className={`rounded px-4 py-2 bg-blue-700 hover:bg-blue-600 font-bold w-40`}
                  onClick={claimFreeNFT}>
                  Claim Free
                </button>
              )}
            </>
          )}
        </div>

        {message && <div className='text-center text-slate-600'>{message}</div>}
      </div>
    </>
  );
}
