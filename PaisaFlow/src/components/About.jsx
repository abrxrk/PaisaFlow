// FILE: src/components/About.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle } from 'lucide-react';

const About = () => {
  const features = [
    { name: 'Full Authentication System', implementedBy: 'Abrar' },
    { name: 'Frontend UI & Design', implementedBy: 'Riddhi & Abrar' },
    { name: 'Appwrite Database Connection', implementedBy: 'Riddhi' },
    { name: 'Interactive Dashboard & Analytics', implementedBy: 'Riddhi' },
    { name: 'Budget & Goal Tracking with CRUD', implementedBy: 'Riddhi & Abrar' },
    { name: 'AI Chatbot Integration', implementedBy: 'Riddhi' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">About PaisaFlow</h1>
          </div>
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            PaisaFlow: Your AI-Powered Financial Companion
          </h2>
          <p className="text-gray-600 mb-6">
            PaisaFlow is a modern, full-stack web application designed to help you take control of your financial health. It provides a beautiful and intuitive interface to monitor spending, manage budgets, track goals, and get personalized insights from an AI-powered chatbot.
          </p>
          <p className="text-gray-600 mb-8">
            This project was a collaborative effort between **Abrar Khawar** and **Riddhi Bhanushali**.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Features Implemented
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700">{feature.name}</p>
                  <p className="text-sm text-gray-500">Implemented by: {feature.implementedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;