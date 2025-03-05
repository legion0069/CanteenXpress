import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          email: credentials.email,
          password: credentials.password
        }
      });

      const user = response.data[0];
      if (!user) {
        throw new Error('Invalid credentials');
      }

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
      return true;
    } catch (error) {
      setError(error.message || 'Login failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
