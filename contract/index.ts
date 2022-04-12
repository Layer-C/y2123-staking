import { ethers } from 'ethers';
import Y2123Contract from './Y2123.json';
import ClansContract from './Clans.json';

export const createContract = (isClansContract = true): ethers.Contract => {
  const abi = isClansContract ? ClansContract.abi : Y2123Contract.abi;
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CLANS_CONTRACT!, abi, signer);
  return contract;
};

export const createContractByABI = (abi: any): ethers.Contract => {
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CLANS_CONTRACT!, abi, signer);
  return contract;
};
