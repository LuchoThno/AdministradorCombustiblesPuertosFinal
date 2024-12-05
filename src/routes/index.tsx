import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import FuelManagement from '../pages/FuelManagement';
import Documents from '../pages/Documents';
import Equipment from '../pages/Equipment';
import Users from '../pages/Users';
import Settings from '../pages/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="fuel" element={<FuelManagement />} />
        <Route path="documents" element={<Documents />} />
        <Route path="equipment" element={<Equipment />} />
        <Route
          path="users"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}