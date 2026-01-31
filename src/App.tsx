import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, theme, App as AntApp } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LoginPage from './features/auth/pages/LoginPage';
import AuthCallbackPage from './features/auth/pages/AuthCallbackPage';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import InvoicesPage from './features/invoice/pages/InvoicesPage';
import CreateInvoicePage from './features/invoice/pages/CreateInvoicePage';
import ModifyInvoicePage from './features/invoice/pages/ModifyInvoicePage';
import CreateCompanyPage from './features/company/pages/CreateCompanyPage';
import ClientsPage from './features/client/pages/ClientsPage';
import ProtectedRoute from './components/ProtectedRoute';
import SettingsPage from './features/settings/pages/SettingsPage';

import './App.css';

function AppContent() {
  const { effectiveTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: effectiveTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <AntApp style={{ minHeight: '100vh' }}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route 
              path="/create-company" 
              element={
                <ProtectedRoute requireCompany={false}>
                  <CreateCompanyPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices" 
              element={
                <ProtectedRoute>
                  <InvoicesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices/create" 
              element={
                <ProtectedRoute>
                  <CreateInvoicePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices/:id/edit" 
              element={
                <ProtectedRoute>
                  <ModifyInvoicePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clients" 
              element={
                <ProtectedRoute>
                  <ClientsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
