import React, { useState } from 'react';
import { PlusCircle, MapPin, Tag, FileText } from 'lucide-react';

const SellProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    propertyType: 'residential',
    documents: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission with blockchain integration
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <PlusCircle className="text-blue-600" />
        <h2 className="text-2xl font-bold">List Property for Sale</h2>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (ZMW)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="agricultural">Agricultural</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Documents
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500">
                <FileText className="text-gray-400" size={24} />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload property documents
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, documents: e.target.files?.[0] || null })}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            List Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellProperty;