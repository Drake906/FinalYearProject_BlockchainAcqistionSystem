import React from 'react';
import { Building2, MapPin, Tag } from 'lucide-react';

interface PropertyCardProps {
  title: string;
  location: string;
  price: number;
  type: 'owned' | 'sold' | 'pending';
}

const PropertyCard: React.FC<PropertyCardProps> = ({ title, location, price, type }) => {
  const getStatusColor = () => {
    switch (type) {
      case 'owned':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Building2 className="text-blue-600" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor()}`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin size={16} className="mr-2" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Tag size={16} className="mr-2" />
          <span className="text-sm">ZMW {price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;