// FILE: src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { account } from '../appwriteConfig';
import { ID } from 'appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails);
      return accountDetails; // Return user on success
    } catch (error) {
      console.error(error);
      return null; // Return null on failure
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), userInfo.email, userInfo.password, userInfo.name);
      return await loginUser(userInfo); // Return the result of loginUser
    } catch (error) {
      console.error(error);
      return null; // Return null on failure
    } finally {
      setLoading(false);
    }
  };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      // User is not logged in
    }
    setLoading(false);
  };

  const contextData = {
    user,
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