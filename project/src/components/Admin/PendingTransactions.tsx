import React from 'react';
import { FileCheck, CheckCircle, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  buyer: string;
  seller: string;
  property: string;
  amount: number;
  date: string;
}

const PendingTransactions = () => {
  const transactions: Transaction[] = [
    {
      id: '0x123...456',
      buyer: '0xabc...def',
      seller: '0x789...012',
      property: 'Luxury Villa',
      amount: 1500000,
      date: '2024-03-15',
    },
    {
      id: '0x345...678',
      buyer: '0xghi...jkl',
      seller: '0x345...678',
      property: 'Commercial Plot',
      amount: 800000,
      date: '2024-03-14',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <FileCheck className="text-blue-600" />
        <h2 className="text-2xl font-bold">Pending Transactions</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ZMW {transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.buyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.seller}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-md">
                        <CheckCircle size={20} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                        <XCircle size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingTransactions;