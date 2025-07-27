// FILE: src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Outlet, NavLink } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { databases, dbId, transactionsCollectionId, budgetsCollectionId, goalsCollectionId } from './appwriteConfig';
import { Query } from 'appwrite';
import { calculateFinancialSummary } from './utils';

// Import all your components
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './components/Dashboard';
import BudgetTracker from './components/BudgetTracker';
import GoalTracker from './components/GoalTracker';
import TransactionHistory from './components/TransactionHistory';
import ChatbotPopup from './components/ChatbotPopup';
import { LayoutDashboard, Target, Wallet, Receipt } from 'lucide-react';

// This component replaces the old MainLayout. It's the core view for logged-in users.
const AppLayout = ({ summary, goals }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Navigation */}
      <nav className="lg:w-64 space-y-1">
        <div className="bg-white rounded-lg shadow-md p-4">
          {[
            { href: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
            { href: '/budget', name: 'Budget', icon: Wallet },
            { href: '/goals', name: 'Goals', icon: Target },
            { href: '/transactions', name: 'Transactions', icon: Receipt },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
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

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for financial data
  const [loadingData, setLoadingData] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);

  // Data Fetching Logic
  const fetchData = async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      const [transRes, budgetRes, goalRes] = await Promise.all([
        databases.listDocuments(dbId, transactionsCollectionId, [Query.limit(100)]),
        databases.listDocuments(dbId, budgetsCollectionId, [Query.limit(100)]),
        databases.listDocuments(dbId, goalsCollectionId, [Query.limit(100)])
      ]);

      const transactionsData = transRes.documents;
      setTransactions(transactionsData);
      setGoals(goalRes.documents);

      const budgetsData = budgetRes.documents.map(budget => {
        const spent = transactionsData
          .filter(t => t.type === 'expense' && t.category === budget.category)
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return { ...budget, spent };
      });
      setBudgets(budgetsData);

    } catch (error) {
      console.error("Failed to fetch data from Appwrite:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const summary = calculateFinancialSummary(transactions);

  const handleGetStarted = () => navigate('/login');

  return (
    <>
      {user && <Header />}
      {user && <ChatbotPopup transactions={transactions} budgets={budgets} goals={goals} />}
      
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout summary={summary} goals={goals} />}>
            <Route path="/dashboard" element={<Dashboard summary={summary} budgets={budgets} goals={goals} />} />
            <Route path="/budget" element={<BudgetTracker budgets={budgets} onUpdate={fetchData} />} />
            <Route path="/goals" element={<GoalTracker goals={goals} onUpdate={fetchData} />} />
            <Route path="/transactions" element={<TransactionHistory transactions={transactions} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;