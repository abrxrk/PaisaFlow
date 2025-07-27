// FILE: src/components/Header.jsx

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp } from 'lucide-react';

const Header = () => {
    const { user, logoutUser } = useAuth();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">PaisaFlow</h1>
                        </div>
                    </div>
                    {user && (
                         <div className="flex items-center space-x-4">
                            <p>Hello, {user.name}!</p>
                            <button onClick={logoutUser} className="text-sm text-red-600 hover:text-red-800 transition-colors">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;