import React, { useState } from 'react';
import { LayoutDashboard, Target, Wallet, MessageCircle, Receipt, TrendingUp } from 'lucide-react';
import LandingPage from './components/LandingPage';
import ChatbotPopup from './components/ChatbotPopup';
import Dashboard from './components/Dashboard';
import BudgetTracker from './components/BudgetTracker';
import GoalTracker from './components/GoalTracker';
import TransactionHistory from './components/TransactionHistory';
import { mockTransactions, initialBudgets, initialGoals } from './mockData';
import { calculateFinancialSummary } from './utils';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLanding, setShowLanding] = useState(true);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [goals, setGoals] = useState(initialGoals);

  const summary = calculateFinancialSummary(mockTransactions);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'budget', name: 'Budget', icon: Wallet },
    { id: 'goals', name: 'Goals', icon: Target },
    { id: 'transactions', name: 'Transactions', icon: Receipt },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard summary={summary} budgets={budgets} goals={goals} />;
      case 'budget':
        return <BudgetTracker budgets={budgets} onUpdateBudgets={setBudgets} />;
      case 'goals':
        return <GoalTracker goals={goals} onUpdateGoals={setGoals} />;
      case 'transactions':
        return <TransactionHistory transactions={mockTransactions} />;
      default:
        return <Dashboard summary={summary} budgets={budgets} goals={goals} />;
    }
  };

  if (showLanding) {
    return (
      <>
        <LandingPage onGetStarted={() => setShowLanding(false)} />
        <ChatbotPopup transactions={mockTransactions} budgets={budgets} goals={goals} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Chatbot Popup - Always Available */}
      <ChatbotPopup transactions={mockTransactions} budgets={budgets} goals={goals} />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Smart Finance Companion</h1>
                <p className="text-sm text-gray-600">Your AI-powered financial assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-lg font-semibold text-green-600">
                  ₹{(summary.totalIncome - summary.totalExpenses).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowLanding(true)}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="lg:w-64 space-y-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-800">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-medium">₹{summary.totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Savings Rate</span>
                  <span className="font-medium text-green-600">{summary.savingsRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Active Goals</span>
                  <span className="font-medium">{goals.filter(g => g.currentAmount < g.targetAmount).length}</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;