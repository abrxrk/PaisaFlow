// FILE: src/components/AddTransaction.jsx

import React, { useState } from "react";
import {
  databases,
  dbId,
  transactionsCollectionId,
  ID,
  Permission,
} from "../appwriteConfig";
import { useAuth } from "../contexts/AuthContext";
import { X } from "lucide-react";

const AddTransaction = ({ onFinished }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a transaction.");
      return;
    }
    const dataPayload = {
      description: formData.description,
      amount:
        formData.type === "expense"
          ? -Math.abs(Number(formData.amount))
          : Math.abs(Number(formData.amount)),
      category: formData.category,
      type: formData.type,
      date: new Date(formData.date).toISOString(),
      userId: user.$id,
    };
    try {
      await databases.createDocument(
        dbId,
        transactionsCollectionId,
        ID.unique(),
        dataPayload,
        [
          Permission.read(`user:${user.$id}`),
          Permission.update(`user:${user.$id}`),
          Permission.delete(`user:${user.$id}`),
        ]
      );
      onFinished();
    } catch (error) {
      console.error("Appwrite Error: Failed to add transaction", error);
      alert("Error: Could not add transaction. Check the console for details.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Add New Transaction
        </h3>
        <button
          onClick={onFinished}
          className="text-gray-500 hover:text-gray-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Salary, Groceries"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., 5000"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Food, Salary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
