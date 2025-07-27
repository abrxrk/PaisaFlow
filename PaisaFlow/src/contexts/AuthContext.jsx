// FILE: src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      const accountDetails = await account.get();
      setUser(accountDetails);
      return accountDetails;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    console.log("Starting logout process");
    setIsLoggingOut(true);
    try {
      await account.deleteSession("current");
      console.log("Session deleted successfully");
    } catch (err) {
      console.error("Error logging out:", err);
    }
    console.log("Setting user to null");
    setUser(null);
    console.log("Navigating to landing page");
    navigate("/", { replace: true });
    // Small delay to ensure navigation completes before resetting isLoggingOut
    setTimeout(() => {
      console.log("Resetting isLoggingOut to false");
      setIsLoggingOut(false);
    }, 100);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      );
      return await loginUser(userInfo);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (err) {
      // User is not logged in
      console.log("User not logged in:", err.message);
    }
    setLoading(false);
  };

  const contextData = {
    user,
    isLoggingOut,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
