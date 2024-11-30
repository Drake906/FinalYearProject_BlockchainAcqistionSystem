import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, FileCheck, Search, LogOut, Menu } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

interface AdminDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminDrawer: React.FC<AdminDrawerProps> = ({ isOpen, setIsOpen }) => {
  const { disconnect } = useWallet();

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <FileCheck size={20} />, label: 'Pending Transactions', path: '/admin/transactions' },
    { icon: <Users size={20} />, label: 'User Management', path: '/admin/users' },
    { icon: <Search size={20} />, label: 'Property Search', path: '/admin/properties' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-md hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <button
          onClick={() => {
            disconnect();
            setIsOpen(false);
          }}
          className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default AdminDrawer;