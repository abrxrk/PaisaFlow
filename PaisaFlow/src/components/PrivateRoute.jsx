// FILE: src/components/PrivateRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { user, isLoggingOut } = useAuth();

  console.log("PrivateRoute - user:", !!user, "isLoggingOut:", isLoggingOut);

  // If user is logging out, don't redirect to login
  if (isLoggingOut) {
    console.log("User is logging out, preventing redirect");
    return null; // or a loading spinner
  }

  if (!user) {
    console.log("No user found, redirecting to login");
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
