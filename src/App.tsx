import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FuelProvider } from './contexts/FuelContext';
import { EquipmentProvider } from './contexts/EquipmentContext';
import { UserProvider } from './contexts/UserContext';
import AppRoutes from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <FuelProvider>
            <EquipmentProvider>
              <AppRoutes />
            </EquipmentProvider>
          </FuelProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}