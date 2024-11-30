import React from 'react';
import { Users, FileCheck, TrendingUp } from 'lucide-react';
import StatsCard from '../Dashboard/StatsCard';
import TransactionGraph from '../Dashboard/TransactionGraph';

const AdminHome = () => {
  const stats = [
    { title: 'Total Users', value: 156, icon: Users, color: 'bg-blue-500' },
    { title: 'Pending Approvals', value: 8, icon: FileCheck, color: 'bg-yellow-500' },
    { title: 'Total Transactions', value: 342, icon: TrendingUp, color: 'bg-green-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TransactionGraph />
      </div>
    </div>
  );
};

export default AdminHome;