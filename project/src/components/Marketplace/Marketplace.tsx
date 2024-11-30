import React, { useEffect, useState } from 'react';
import { Store, Search } from 'lucide-react';
import PropertyListing from './PropertyListing';
import { getLandRegistryContract } from '../../utils/web3';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
  seller: string;
}

const Marketplace = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const contract = await getLandRegistryContract();
      // Implement the actual contract call to get properties
      // This is a placeholder until the contract method is implemented
      const listedProperties = await contract.getListedProperties();
      setProperties(listedProperties);
    } catch (error) {
      console.error('Error loading properties:', error);
    }
  };

  const handleMakeOffer = async (propertyId: string) => {
    try {
      const contract = await getLandRegistryContract();
      await contract.makeOffer(propertyId);
      alert('Offer submitted successfully!');
      loadProperties(); // Reload properties to update status
    } catch (error) {
      console.error('Error making offer:', error);
      alert('Failed to submit offer. Please try again.');
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Store className="text-blue-600" />
          <h2 className="text-2xl font-bold">Marketplace</h2>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyListing
            key={property.id}
            {...property}
            onMakeOffer={() => handleMakeOffer(property.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;