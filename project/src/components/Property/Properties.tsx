import React from 'react';
import { FileText, Download } from 'lucide-react';
import PropertyCard from '../Dashboard/PropertyCard';

const Properties = () => {
  const properties = [
    {
      title: 'Luxury Villa',
      location: 'Lusaka West',
      price: 1500000,
      type: 'owned' as const,
    },
    {
      title: 'Commercial Plot',
      location: 'Chilanga',
      price: 800000,
      type: 'owned' as const,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.title} className="space-y-2">
            <PropertyCard {...property} />
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
              <FileText size={16} />
              <span>Download Title Deed</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;