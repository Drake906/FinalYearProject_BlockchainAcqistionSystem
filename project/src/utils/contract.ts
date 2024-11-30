import { ethers } from 'ethers';
import { getWeb3Provider } from './provider';
import LandRegistryABI from '../contracts/LandRegistry.json';

// Replace with your deployed contract address when using Ganache
const LAND_REGISTRY_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export const getLandRegistryContract = async () => {
  const provider = getWeb3Provider();
  const signer = await provider.getSigner();
  return new ethers.Contract(LAND_REGISTRY_ADDRESS, LandRegistryABI.abi, signer);
};