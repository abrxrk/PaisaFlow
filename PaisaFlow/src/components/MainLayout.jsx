// FILE: src/components/MainLayout.jsx

import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Target, Wallet, Receipt } from 'lucide-react';

const MainLayout = ({ summary, goals }) => {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { id: 'budget', name: 'Budget', href: '/budget', icon: Wallet },
    { id: 'goals', name: 'Goals', href: '/goals', icon: Target },
    { id: 'transactions', name: 'Transactions', href: '/transactions', icon: Receipt },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <nav className="lg:w-64 space-y-1">
        <div className="bg-white rounded-lg shadow-md p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">This Month's Expenses</span>
              <span className="font-medium">₹{summary.totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Savings Rate</span>
              <span className="font-medium text-green-600">{summary.savingsRate > 0 ? summary.savingsRate.toFixed(1) : 0}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Goals</span>
              <span className="font-medium">{goals.filter(g => g.currentAmount < g.targetAmount).length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - This is where the routed components will be displayed */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;