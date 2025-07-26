import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Target, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';
import { databases, dbId, goalsCollectionId, ID } from '../appwriteConfig';

const GoalTracker = ({ goals, onUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: '',
    color: '#10B981'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGoal) {
        // Update existing document in Appwrite
        await databases.updateDocument(
          dbId,
          goalsCollectionId,
          editingGoal.$id,
          {
            title: formData.title,
            targetAmount: Number(formData.targetAmount),
            currentAmount: Number(formData.currentAmount),
            deadline: formData.deadline,
            category: formData.category,
            color: formData.color
          }
        );
      } else {
        // Create a new document in Appwrite
        await databases.createDocument(
          dbId,
          goalsCollectionId,
          ID.unique(),
          {
            title: formData.title,
            targetAmount: Number(formData.targetAmount),
            currentAmount: Number(formData.currentAmount),
            deadline: formData.deadline,
            category: formData.category,
            color: formData.color
          }
        );
      }
      onUpdate(); // Trigger data refetch in the parent component
      
      // Reset and close form
      setShowAddForm(false);
      setEditingGoal(null);
      setFormData({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '', color: '#10B981' });

    } catch (error) {
      console.error("Failed to save goal:", error);
      alert("Error: Could not save the goal.");
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline.substring(0, 10), // Format date for input
      category: goal.category,
      color: goal.color
    });
    setShowAddForm(true);
  };

  const handleDelete = async (goalId) => {
    try {
      await databases.deleteDocument(dbId, goalsCollectionId, goalId);
      onUpdate(); // Trigger data refetch
    } catch (error) {
      console.error("Failed to delete goal:", error);
      alert("Error: Could not delete the goal.");
    }
  };

  const handleProgressUpdate = async (goal, amount) => {
    const newAmount = Math.max(0, goal.currentAmount + amount);
    try {
        await databases.updateDocument(dbId, goalsCollectionId, goal.$id, {
            currentAmount: newAmount
        });
        onUpdate();
    } catch (error) {
        console.error("Failed to update goal progress:", error);
        alert("Error: Could not update goal progress.");
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Goal Tracker</h2>
        <button
          onClick={() => { 
            setShowAddForm(true);
            setEditingGoal(null);
            setFormData({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '', color: '#10B981' });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingGoal) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingGoal ? 'Edit Goal' : 'Add New Goal'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="e.g., Emergency Fund"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="e.g., Savings, Travel"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="₹100,000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Amount</label>
              <input
                type="number"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                placeholder="₹25,000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingGoal ? 'Update' : 'Add'} Goal
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingGoal(null);
                  setFormData({ title: '', targetAmount: '', currentAmount: '', deadline: '', category: '', color: '#10B981' });
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = getDaysRemaining(goal.deadline);
          const isAchieved = goal.currentAmount >= goal.targetAmount;
          
          return (
            <div key={goal.$id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(goal.$id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-800">{percentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: goal.color 
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current</span>
                  <span className="font-medium">{formatCurrency(goal.currentAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target</span>
                  <span className="font-medium">{formatCurrency(goal.targetAmount)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2 pt-2 border-t">
                  <span className="text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Deadline
                  </span>
                  <span className={`font-medium ${daysRemaining < 30 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatDate(goal.deadline)} ({daysRemaining > 0 ? `${daysRemaining} days left` : 'Past due'})
                  </span>
                </div>
              </div>

              {isAchieved ? (
                <div className="text-center py-3 bg-green-50 rounded-lg">
                  <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-green-600 font-semibold">Goal Achieved!</p>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleProgressUpdate(goal, 1000)}
                    className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    +₹1,000
                  </button>
                  <button
                    onClick={() => handleProgressUpdate(goal, 5000)}
                    className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    +₹5,000
                  </button>
                  <button
                    onClick={() => handleProgressUpdate(goal, -1000)}
                    className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    -₹1,000
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalTracker;
