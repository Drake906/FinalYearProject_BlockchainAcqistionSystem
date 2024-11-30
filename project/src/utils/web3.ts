import { getLandRegistryContract } from './contract';

export const initiateTransaction = async (propertyId: number, price: number) => {
  const contract = await getLandRegistryContract();
  const transaction = await contract.completeTransaction(propertyId, { value: price });
  await transaction.wait(); // Wait for the transaction to be mined
};

export * from './types';
export * from './provider';
export * from './contract';
export * from './transactions';