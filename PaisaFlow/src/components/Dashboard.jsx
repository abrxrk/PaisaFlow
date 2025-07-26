import React from 'react';
import { TrendingUp, TrendingDown, Wallet, Target, PiggyBank, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils';

const Dashboard = ({ summary, budgets, goals }) => {
  const overBudgetCategories = budgets.filter(b => b.spent > b.limit);
  const achievedGoals = goals.filter(g => g.currentAmount >= g.targetAmount);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(summary.totalIncome)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600">{formatCurrency(summary.totalExpenses)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Savings</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(summary.savings)}</p>
            </div>
            <PiggyBank className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Savings Rate</p>
              <p className="text-3xl font-bold text-purple-600">{summary.savingsRate.toFixed(1)}%</p>
            </div>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(overBudgetCategories.length > 0 || achievedGoals.length > 0) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Alerts & Achievements
          </h3>
          <div className="space-y-3">
            {overBudgetCategories.map(budget => (
              <div key={budget.category} className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Budget exceeded for {budget.category}
                  </p>
                  <p className="text-xs text-red-600">
                    Spent {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                  </p>
                </div>
              </div>
            ))}
            {achievedGoals.map(goal => (
              <div key={goal.id} className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                <Target className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Goal achieved: {goal.title}
                  </p>
                  <p className="text-xs text-green-600">
                    Reached {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h3>
        <div className="space-y-4">
          {Object.entries(summary.categoryBreakdown)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([category, amount]) => {
              const percentage = (amount / summary.totalExpenses) * 100;
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 w-20 text-right">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;