// FILE: src/components/About.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle, ArrowRight, User, Code } from 'lucide-react';

const About = () => {
  const features = [
    { name: 'Full Authentication System', implementedBy: 'Abrar' },
    { name: 'Frontend UI & Design', implementedBy: 'Riddhi' },
    { name: 'Appwrite Database Connection', implementedBy: 'Abrar' },
    { name: 'Interactive Dashboard & Analytics', implementedBy: 'Riddhi' },
    { name: 'Budget & Goal Tracking with CRUD', implementedBy: 'Riddhi & Abrar' },
    { name: 'AI Chatbot Integration', implementedBy: 'Riddhi' },
  ];

  const team = [
    { name: 'Abrar Khawar', role: 'Backend & Authentication', github: 'abrxrk' },
    { name: 'Riddhi Bhanushali', role: 'Frontend & UI/UX', github: 'riffhi' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">PaisaFlow</h1>
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              &larr; Back to Landing Page
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Our Mission: 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Financial Clarity for Everyone</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            PaisaFlow was born from a passion for technology and a desire to make personal finance management accessible, intuitive, and even enjoyable.
          </p>
        </div>

        {/* Features Card */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
              <Code className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Project Features</h2>
          </div>
          <p className="text-gray-600 mb-8">This project was a collaborative effort. Here's a breakdown of the key features and who brought them to life:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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

        {/* Meet the Team Section */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Meet the Team</h2>
            <p className="mt-2 text-gray-600">The developers behind PaisaFlow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map(member => (
                <div key={member.name} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
                    <User className="h-16 w-16 mx-auto mb-4 bg-gray-100 text-blue-500 p-3 rounded-full"/>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <Link to={`/contact`} className="inline-flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <span>Contact Info</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default About;