// FILE: src/components/PublicRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = () => {
  const { user } = useAuth();

  // If the user is logged in, redirect them away from public pages
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // If not logged in, show the public page
  return <Outlet />;
};

export default PublicRoute;