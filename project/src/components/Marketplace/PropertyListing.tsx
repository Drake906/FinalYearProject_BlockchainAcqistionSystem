import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { initiateTransaction } from '../../utils/web3';

interface PropertyListingProps {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  seller: string;
  description: string;
  onMakeOffer: () => void;
}

const PropertyListing: React.FC<PropertyListingProps> = ({
  id,
  title,
  location,
  price,
  status,
  seller,
  description,
  onMakeOffer,
}) => {
  const { account } = useWallet();

  const handlePayment = async () => {
    try {
      await initiateTransaction(parseInt(id), price);
      alert('Payment successful! Transaction has been recorded on the blockchain.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const getStatusBadge = () => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          {getStatusBadge()}
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2 mb-4">
          <p className="text-gray-600">Location: {location}</p>
          <p className="text-gray-600">Price: ZMW {price.toLocaleString()}</p>
          <p className="text-gray-600">Seller: {seller}</p>
        </div>
        {status === 'approved' && seller !== account && (
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Make Payment
          </button>
        )}
        {status === 'pending' && seller !== account && (
          <button
            onClick={onMakeOffer}
            className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors"
          >
            Make Offer
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyListing;