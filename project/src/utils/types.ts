import { ethers } from 'ethers';

export interface User {
  firstName: string;
  lastName: string;
  nrc: string;
  isRegistered: boolean;
  isAdmin: boolean;
}

export interface Property {
  title: string;
  location: string;
  price: ethers.BigNumber;
  owner: string;
  isForSale: boolean;
  titleDeedHash: string;
  status: number;
  pendingBuyer: string;
}

// Add TypeScript support for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}