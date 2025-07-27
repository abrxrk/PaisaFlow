// FILE: src/components/Contact.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, TrendingUp, Send } from 'lucide-react';

const Contact = () => {
  const team = [
    {
      name: 'Abrar Khawar',
      role: 'Backend & Authentication',
      email: 'abrarkhawarwork@gmail.com',
      github: 'https://github.com/abrxrk',
      githubHandle: 'abrxrk'
    },
    {
      name: 'Riddhi Bhanushali',
      role: 'Frontend & UI/UX',
      email: 'bhanushaliriddhiwork@gmail.com',
      github: 'https://github.com/riffhi',
      githubHandle: 'riffhi'
    }
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
              to="/about"
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              &larr; Back to About Us
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question, feedback, or just want to connect, feel free to reach out.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {team.map(member => (
            <div key={member.name} className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
              <p className="font-medium text-blue-600 mb-6">{member.role}</p>
              
              <div className="space-y-4">
                <a href={`mailto:${member.email}`} className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Mail className="h-5 w-5 text-gray-600 group-hover:text-blue-600"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">{member.email}</p>
                  </div>
                </a>

                <a href={member.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                    <Github className="h-5 w-5 text-gray-600 group-hover:text-white"/>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <p className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{member.githubHandle}</p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Contact;