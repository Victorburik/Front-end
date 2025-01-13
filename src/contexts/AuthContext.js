import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedRole = localStorage.getItem('userRole');
    if (token && savedRole) {
      setIsAuthenticated(true);
      setRole(savedRole);  
    }
  }, []);

  const login = (token, userRole) => { 
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Você precisa estar logado para sair');
        return;
      }
  
      await api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      setIsAuthenticated(false);
      setRole(null);
      alert('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
