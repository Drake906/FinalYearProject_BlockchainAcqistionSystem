import { ethers } from 'ethers';
import { getLandRegistryContract } from './contract';
import type { Property, User } from './types';

export const registerUser = async (firstName: string, lastName: string, nrc: string) => {
  const contract = await getLandRegistryContract();
  const tx = await contract.registerUser(firstName, lastName, nrc);
  await tx.wait();
  return tx;
};

export const listProperty = async (title: string, location: string, price: number, titleDeedHash: string) => {
  const contract = await getLandRegistryContract();
  const tx = await contract.listProperty(title, location, ethers.parseEther(price.toString()), titleDeedHash);
  await tx.wait();
  return tx;
};

export const makeOffer = async (propertyId: number) => {
  const contract = await getLandRegistryContract();
  const tx = await contract.makeOffer(propertyId);
  await tx.wait();
  return tx;
};

export const approveOffer = async (propertyId: number) => {
  const contract = await getLandRegistryContract();
  const tx = await contract.approveOffer(propertyId);
  await tx.wait();
  return tx;
};

export const rejectOffer = async (propertyId: number) => {
  const contract = await getLandRegistryContract();
  const tx = await contract.rejectOffer(propertyId);
  await tx.wait();
  return tx;
};

export const completeTransaction = async (propertyId: number, price: string) => {
  const contract = await getLandRegistryContract();
  const tx = await contract.completeTransaction(propertyId, {
    value: ethers.parseEther(price)
  });
  await tx.wait();
  return tx;
};

export const getListedProperties = async (): Promise<Property[]> => {
  const contract = await getLandRegistryContract();
  return contract.getListedProperties();
};

export const getUserInfo = async (address: string): Promise<User> => {
  const contract = await getLandRegistryContract();
  return contract.users(address);
};

export const isAdmin = async (address: string): Promise<boolean> => {
  const userInfo = await getUserInfo(address);
  return userInfo.isAdmin;
};