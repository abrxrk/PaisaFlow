// FILE: src/components/TransactionHistory.jsx

import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Plus } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';
import AddTransaction from './AddTransaction';

const TransactionHistory = ({ transactions, onUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  const filteredAndSortedTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || transaction.category === selectedCategory;
      const matchesType = !selectedType || transaction.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        comparison = Math.abs(b.amount) - Math.abs(a.amount);
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getCategoryColor = (category, type) => {
    if (type === 'income') return 'text-green-600 bg-green-50';
    const colors = {
      'Food': 'text-orange-600 bg-orange-50', 'Transport': 'text-blue-600 bg-blue-50',
      'Entertainment': 'text-purple-600 bg-purple-50', 'Utilities': 'text-red-600 bg-red-50',
      'Shopping': 'text-pink-600 bg-pink-50', 'Health': 'text-teal-600 bg-teal-50',
      'Education': 'text-green-600 bg-green-50',
    };
    return colors[category] || 'text-gray-600 bg-gray-50';
  };

  if (showAddForm) {
    return <AddTransaction onFinished={() => {
      setShowAddForm(false);
      onUpdate();
    }} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text" placeholder="Search transactions..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">All Categories</option>
            {categories.map(category => (<option key={category} value={category}>{category}</option>))}
          </select>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg">
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <div className="flex space-x-2">
            <button onClick={() => toggleSort('date')} className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg ${sortBy === 'date' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
              <span>Date</span> <ArrowUpDown className="h-4 w-4" />
            </button>
            <button onClick={() => toggleSort('amount')} className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg ${sortBy === 'amount' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
              <span>Amount</span> <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedTransactions.map((transaction) => (
                <tr key={transaction.$id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(transaction.date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{transaction.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(transaction.category, transaction.type)}`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAndSortedTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Filter className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;