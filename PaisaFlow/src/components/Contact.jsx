import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, TrendingUp } from 'lucide-react'; // Import Github icon

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Contact Us</h1>
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
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Mail className="h-12 w-12 text-blue-500" />
            <Github className="h-12 w-12 text-gray-800" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            For any questions, feedback, or support inquiries, please feel free to reach out to us via email or check out our work on GitHub.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Abrar's Contact Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Abrar Khawar</h3>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a 
                  href="mailto:abrarkhawarwork@gmail.com" 
                  className="text-blue-600 hover:underline"
                >
                  abrarkhawarwork@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Github className="h-4 w-4 text-gray-500" />
                <a 
                  href="https://github.com/abrxrk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/abrxrk
                </a>
              </div>
            </div>

            {/* Riddhi's Contact Info */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">Riddhi Bhanushali</h3>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a 
                  href="mailto:bhanushaliriddhiwork@gmail.com" 
                  className="text-blue-600 hover:underline"
                >
                  bhanushaliriddhiwork@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Github className="h-4 w-4 text-gray-500" />
                <a 
                  href="https://github.com/riffhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/riffhi
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;