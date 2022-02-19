import { ethers } from 'ethers';
import ABI from './Y2123.json';

export const createContract = (): ethers.Contract => {
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const contract = new ethers.Contract(process.env.CLANS_CONTRACT!, ABI.abi, signer);
  return contract;
};
