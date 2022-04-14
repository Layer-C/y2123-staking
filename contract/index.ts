import { ContractInterface, ethers } from 'ethers';
import Y2123Contract from './Y2123.json';
import ClansContract from './Clans.json';
import OxygenContract from './Oxygen.json';
import LandContract from './Land.json';

export enum ContractType {
  CLANS = 'clans',
  Y2123 = 'y2123',
  OXYGEN = 'oxygen',
  LAND = 'land',
}

const ContractTypeMap: Record<ContractType, { json: { abi: ContractInterface }; address: string }> = {
  [ContractType.CLANS]: { json: ClansContract, address: process.env.NEXT_PUBLIC_CLANS_CONTRACT! },
  [ContractType.Y2123]: { json: Y2123Contract, address: process.env.NEXT_PUBLIC_Y2123_CONTRACT! },
  [ContractType.OXYGEN]: { json: OxygenContract, address: process.env.NEXT_PUBLIC_OXYGEN_CONTRACT! },
  [ContractType.LAND]: { json: LandContract, address: process.env.NEXT_PUBLIC_LAND_CONTRACT! },
};

export const createContract = (type = ContractType.CLANS): ethers.Contract => {
  const { json, address } = ContractTypeMap[type];
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const contract = new ethers.Contract(address, json.abi, signer);
  return contract;
};
