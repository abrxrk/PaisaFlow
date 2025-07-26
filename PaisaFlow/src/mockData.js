export const mockTransactions = [
  { id: '1', date: '2024-01-15', description: 'Salary Credit', amount: 75000, category: 'Salary', type: 'income' },
  { id: '2', date: '2024-01-16', description: 'Grocery Shopping', amount: -3500, category: 'Food', type: 'expense' },
  { id: '3', date: '2024-01-17', description: 'Uber Ride', amount: -450, category: 'Transport', type: 'expense' },
  { id: '4', date: '2024-01-18', description: 'Netflix Subscription', amount: -799, category: 'Entertainment', type: 'expense' },
  { id: '5', date: '2024-01-19', description: 'Restaurant Dinner', amount: -2200, category: 'Food', type: 'expense' },
  { id: '6', date: '2024-01-20', description: 'Freelance Payment', amount: 15000, category: 'Freelance', type: 'income' },
  { id: '7', date: '2024-01-21', description: 'Electricity Bill', amount: -1800, category: 'Utilities', type: 'expense' },
  { id: '8', date: '2024-01-22', description: 'Coffee Shop', amount: -350, category: 'Food', type: 'expense' },
  { id: '9', date: '2024-01-23', description: 'Metro Card Recharge', amount: -1000, category: 'Transport', type: 'expense' },
  { id: '10', date: '2024-01-24', description: 'Online Course', amount: -4999, category: 'Education', type: 'expense' },
  { id: '11', date: '2024-01-25', description: 'Gym Membership', amount: -2500, category: 'Health', type: 'expense' },
  { id: '12', date: '2024-01-26', description: 'Shopping - Clothes', amount: -8500, category: 'Shopping', type: 'expense' },
  { id: '13', date: '2024-01-27', description: 'Internet Bill', amount: -999, category: 'Utilities', type: 'expense' },
  { id: '14', date: '2024-01-28', description: 'Investment Returns', amount: 3200, category: 'Investment', type: 'income' },
  { id: '15', date: '2024-01-29', description: 'Medical Checkup', amount: -2800, category: 'Health', type: 'expense' },
];

export const initialBudgets = [
  { category: 'Food', limit: 8000, spent: 6050, color: '#F59E0B' },
  { category: 'Transport', limit: 3000, spent: 1450, color: '#10B981' },
  { category: 'Entertainment', limit: 2000, spent: 799, color: '#8B5CF6' },
  { category: 'Utilities', limit: 4000, spent: 2799, color: '#EF4444' },
  { category: 'Shopping', limit: 10000, spent: 8500, color: '#EC4899' },
  { category: 'Health', limit: 5000, spent: 5300, color: '#06B6D4' },
  { category: 'Education', limit: 6000, spent: 4999, color: '#84CC16' },
];

export const initialGoals = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 300000,
    currentAmount: 125000,
    deadline: '2024-12-31',
    category: 'Savings',
    color: '#10B981'
  },
  {
    id: '2',
    title: 'Vacation to Europe',
    targetAmount: 150000,
    currentAmount: 45000,
    deadline: '2024-08-15',
    category: 'Travel',
    color: '#8B5CF6'
  },
  {
    id: '3',
    title: 'New Laptop',
    targetAmount: 80000,
    currentAmount: 32000,
    deadline: '2024-06-30',
    category: 'Electronics',
    color: '#F59E0B'
  },
  {
    id: '4',
    title: 'Investment Portfolio',
    targetAmount: 500000,
    currentAmount: 85000,
    deadline: '2024-12-31',
    category: 'Investment',
    color: '#06B6D4'
  }
];