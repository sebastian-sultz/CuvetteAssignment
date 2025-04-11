import { createContext, useState, useEffect, useContext } from 'react';
import { setAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      console.log('Token set in Axios headers:', token); // Debug
    } else {
      setAuthToken(null);
      console.log('No token, cleared Axios headers'); // Debug
    }
  }, [token]);

  const login = (newToken) => {
    console.log('Login called with token:', newToken); // Debug
    localStorage.setItem('token', newToken);
    setAuthToken(newToken); // Set immediately
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null); // Clear immediately
    setToken(null);
    console.log('Logged out'); // Debug
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
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