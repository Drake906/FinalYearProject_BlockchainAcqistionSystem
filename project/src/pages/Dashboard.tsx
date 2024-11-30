import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Building2, TrendingUp, Clock } from 'lucide-react';
import Drawer from '../components/Layout/Drawer';
import TransactionGraph from '../components/Dashboard/TransactionGraph';
import StatsCard from '../components/Dashboard/StatsCard';
import PropertyCard from '../components/Dashboard/PropertyCard';
import GISMap from '../components/GIS/GISMap';
import Marketplace from '../components/Marketplace/Marketplace';
import SellProperty from '../components/Property/SellProperty';
import Properties from '../components/Property/Properties';
import TransactionHistory from '../components/Transaction/TransactionHistory';

const DashboardHome = () => {
  const stats = [
    { title: 'Properties Owned', value: 3, icon: Building2, color: 'bg-blue-500' },
    { title: 'Properties Sold', value: 2, icon: TrendingUp, color: 'bg-green-500' },
    { title: 'Pending Transactions', value: 1, icon: Clock, color: 'bg-yellow-500' },
  ];

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
      type: 'pending' as const,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionGraph />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Properties</h3>
          {properties.map((property) => (
            <PropertyCard key={property.title} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      <div className="ml-0 lg:ml-64">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="gis" element={<GISMap />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="sell" element={<SellProperty />} />
          <Route path="properties" element={<Properties />} />
          <Route path="history" element={<TransactionHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;