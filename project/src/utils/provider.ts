import { ethers } from 'ethers';

export const getWeb3Provider = (): ethers.BrowserProvider => {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed');
  }
  return new ethers.BrowserProvider(window.ethereum);
};