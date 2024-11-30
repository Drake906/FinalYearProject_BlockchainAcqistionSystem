import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: async () => {},
  disconnect: () => {},
  isConnected: false,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('Please install MetaMask to use this application');
    }
  };

  const disconnect = () => {
    setAccount(null);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null);
      });
    }
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnect, isConnected: !!account }}>
      {children}
    </WalletContext.Provider>
  );
};

// Add TypeScript support for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}