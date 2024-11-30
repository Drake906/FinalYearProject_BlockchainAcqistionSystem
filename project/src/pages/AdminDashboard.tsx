import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Users, FileCheck, History } from 'lucide-react';
import AdminDrawer from '../components/Admin/AdminDrawer';
import AdminHome from '../components/Admin/AdminHome';
import PendingTransactions from '../components/Admin/PendingTransactions';
import UserManagement from '../components/Admin/UserManagement';
import PropertySearch from '../components/Admin/PropertySearch';

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      <div className="ml-0 lg:ml-64">
        <Routes>
          <Route index element={<AdminHome />} />
          <Route path="transactions" element={<PendingTransactions />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="properties" element={<PropertySearch />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;