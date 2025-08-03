import { useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

const mockWalletData = {
  balance: 1250.75,
  transactions: [
    { id: 1, type: 'debit', description: 'Lunch Payment', amount: 15.00, date: '2024-01-22', category: 'Food' },
    { id: 2, type: 'debit', description: 'Book Purchase', amount: 45.50, date: '2024-01-21', category: 'Books' },
    { id: 3, type: 'credit', description: 'Top-up from Parent', amount: 100.00, date: '2024-01-20', category: 'Top-up' },
    { id: 4, type: 'debit', description: 'Library Fine', amount: 5.25, date: '2024-01-19', category: 'Fees' }
  ]
};

export default function StudentWallet() {
  const [showTopup, setShowTopup] = useState(false);

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600">Manage your school payments and transactions</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
          <h2 className="text-2xl font-bold mb-2">Current Balance</h2>
          <p className="text-4xl font-bold">${mockWalletData.balance}</p>
          <button 
            onClick={() => setShowTopup(true)}
            className="mt-4 px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100"
          >
            Add Money
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {mockWalletData.transactions.map((transaction) => (
              <div key={transaction.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date} • {transaction.category}</p>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
