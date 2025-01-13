import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import SuggestionManagement from '../pages/SuggestionManagement';
import Nav from '../components/nav';
import { AuthProvider } from '../contexts/AuthContext';

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <Nav>
              <Dashboard />
            </Nav>
          }
        />
        <Route
          path="/adm-sugestao"
          element={
            <Nav>
              <SuggestionManagement />
            </Nav>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;
