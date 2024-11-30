import React from 'react';
import { History, ArrowRight, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  property: string;
  amount: number;
  status: 'completed' | 'pending' | 'rejected';
  date: string;
  counterparty: string;
}

const TransactionHistory = () => {
  const transactions: Transaction[] = [
    {
      id: '0x123...456',
      type: 'buy',
      property: 'Luxury Villa',
      amount: 1500000,
      status: 'completed',
      date: '2024-03-15',
      counterparty: '0x789...012',
    },
    {
      id: '0x345...678',
      type: 'sell',
      property: 'Commercial Plot',
      amount: 800000,
      status: 'pending',
      date: '2024-03-14',
      counterparty: '0x901...234',
    },
  ];

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <History className="text-yellow-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <History className="text-blue-600" />
        <h2 className="text-2xl font-bold">Transaction History</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {transaction.type === 'buy' ? (
                        <ArrowLeft className="text-green-500" size={20} />
                      ) : (
                        <ArrowRight className="text-blue-500" size={20} />
                      )}
                      <span className="text-sm text-gray-900">{transaction.id}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      With: {transaction.counterparty}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ZMW {transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className="text-sm text-gray-900">
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
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

export default TransactionHistory;