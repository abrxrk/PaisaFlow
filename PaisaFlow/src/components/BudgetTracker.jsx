// import React, { useState } from 'react';
// import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
// import { formatCurrency } from '../utils';

// const BudgetTracker = ({ budgets, onUpdateBudgets }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingBudget, setEditingBudget] = useState(null);
//   const [formData, setFormData] = useState({ category: '', limit: '', color: '#3B82F6' });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingBudget) {
//       const updatedBudgets = budgets.map(b =>
//         b.category === editingBudget.category
//           ? { ...b, limit: Number(formData.limit), color: formData.color }
//           : b
//       );
//       onUpdateBudgets(updatedBudgets);
//       setEditingBudget(null);
//     } else {
//       const newBudget = {
//         category: formData.category,
//         limit: Number(formData.limit),
//         spent: 0,
//         color: formData.color
//       };
//       onUpdateBudgets([...budgets, newBudget]);
//       setShowAddForm(false);
//     }
//     setFormData({ category: '', limit: '', color: '#3B82F6' });
//   };

//   const handleEdit = (budget) => {
//     setEditingBudget(budget);
//     setFormData({
//       category: budget.category,
//       limit: budget.limit.toString(),
//       color: budget.color
//     });
//   };

//   const handleDelete = (category) => {
//     const updatedBudgets = budgets.filter(b => b.category !== category);
//     onUpdateBudgets(updatedBudgets);
//   };

//   const getProgressColor = (spent, limit) => {
//     const percentage = (spent / limit) * 100;
//     if (percentage >= 100) return 'bg-red-500';
//     if (percentage >= 80) return 'bg-yellow-500';
//     return 'bg-green-500';
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Budget Tracker</h2>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Add Budget</span>
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {(showAddForm || editingBudget) && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//             {editingBudget ? 'Edit Budget' : 'Add New Budget'}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//               <input
//                 type="text"
//                 value={formData.category}
//                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                 placeholder="e.g., Food, Transport"
//                 required
//                 disabled={!!editingBudget}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Budget Limit</label>
//               <input
//                 type="number"
//                 value={formData.limit}
//                 onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//                 placeholder="₹10,000"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
//               <input
//                 type="color"
//                 value={formData.color}
//                 onChange={(e) => setFormData({ ...formData, color: e.target.value })}
//                 className="w-full h-10 border border-gray-300 rounded-lg"
//               />
//             </div>
//             <div className="flex space-x-3">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 {editingBudget ? 'Update' : 'Add'} Budget
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setEditingBudget(null);
//                   setFormData({ category: '', limit: '', color: '#3B82F6' });
//                 }}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Budget List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {budgets.map((budget) => {
//           const percentage = (budget.spent / budget.limit) * 100;
//           const isOverBudget = budget.spent > budget.limit;
          
//           return (
//             <div key={budget.category} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
//                   <p className="text-sm text-gray-600">
//                     {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
//                   </p>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(budget)}
//                     className="text-gray-500 hover:text-blue-600 transition-colors"
//                   >
//                     <Edit2 className="h-4 w-4" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(budget.category)}
//                     className="text-gray-500 hover:text-red-600 transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {isOverBudget && (
//                 <div className="flex items-center space-x-2 mb-3 text-red-600">
//                   <AlertTriangle className="h-4 w-4" />
//                   <span className="text-sm font-medium">Over budget!</span>
//                 </div>
//               )}

//               <div className="mb-4">
//                 <div className="flex justify-between text-sm text-gray-600 mb-1">
//                   <span>{percentage.toFixed(1)}% used</span>
//                   <span>{formatCurrency(budget.limit - budget.spent)} remaining</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                   <div
//                     className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(budget.spent, budget.limit)}`}
//                     style={{ width: `${Math.min(percentage, 100)}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="text-center">
//                 <span className="text-2xl font-bold" style={{ color: budget.color }}>
//                   {formatCurrency(budget.limit - budget.spent)}
//                 </span>
//                 <p className="text-sm text-gray-600">left to spend</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BudgetTracker;
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils';
import { databases, dbId, budgetsCollectionId, ID } from '../appwriteConfig';

const BudgetTracker = ({ budgets, onUpdate }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({ category: '', limit: '', color: '#3B82F6' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBudget) {
        // Update existing document in Appwrite
        await databases.updateDocument(
            dbId, 
            budgetsCollectionId, 
            editingBudget.$id, // Use the document's unique ID
            {
                limit: Number(formData.limit),
                color: formData.color
            }
        );
      } else {
        // Create a new document in Appwrite
        await databases.createDocument(
            dbId,
            budgetsCollectionId,
            ID.unique(), // Let Appwrite generate a unique ID
            {
                category: formData.category,
                limit: Number(formData.limit),
                // The 'spent' field has been removed as it's not part of the database schema
                color: formData.color,
            }
        );
      }
      
      onUpdate(); // Trigger data refetch in the parent component
      
      // Reset form and close it
      setEditingBudget(null);
      setShowAddForm(false);
      setFormData({ category: '', limit: '', color: '#3B82F6' });

    } catch (error) {
        console.error("Failed to save budget:", error);
        alert("Error: Could not save the budget. Please try again.");
    }
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget); // The budget object from Appwrite now includes $id
    setFormData({
      category: budget.category,
      limit: budget.limit.toString(),
      color: budget.color
    });
    setShowAddForm(true); // Show the form for editing
  };

  const handleDelete = async (budgetId) => {
    try {
        await databases.deleteDocument(dbId, budgetsCollectionId, budgetId);
        onUpdate(); // Trigger data refetch
    } catch (error) {
        console.error("Failed to delete budget:", error);
        alert("Error: Could not delete the budget.");
    }
  };

  const getProgressColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Budget Tracker</h2>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingBudget(null);
            setFormData({ category: '', limit: '', color: '#3B82F6' });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Budget</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingBudget) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingBudget ? 'Edit Budget' : 'Add New Budget'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="e.g., Food, Transport"
                required
                disabled={!!editingBudget} // Disable changing category when editing
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Limit</label>
              <input
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="₹10,000"
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
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingBudget ? 'Update' : 'Add'} Budget
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingBudget(null);
                  setFormData({ category: '', limit: '', color: '#3B82F6' });
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Budget List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = budget.spent > budget.limit;
          
          return (
            // Use budget.$id for the key as it's guaranteed to be unique
            <div key={budget.$id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{budget.category}</h3>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(budget)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    // Pass the document ID to the delete handler
                    onClick={() => handleDelete(budget.$id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {isOverBudget && (
                <div className="flex items-center space-x-2 mb-3 text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Over budget!</span>
                </div>
              )}

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{percentage > 0 ? percentage.toFixed(1) : 0}% used</span>
                  <span>{formatCurrency(budget.limit - budget.spent)} remaining</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(budget.spent, budget.limit)}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-2xl font-bold" style={{ color: budget.color }}>
                  {formatCurrency(budget.limit - budget.spent)}
                </span>
                <p className="text-sm text-gray-600">left to spend</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;
