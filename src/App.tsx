import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { AppsPage } from './pages/AppsPage';
import { GamesPage } from './pages/GamesPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AppDetailsPage } from './pages/AppDetailsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAppForm } from './pages/admin/AdminAppForm';
import { AdminCategories } from './pages/admin/AdminCategories';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="apps" element={<AppsPage />} />
              <Route path="games" element={<GamesPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="app/:id" element={<AppDetailsPage />} />
              <Route path="search" element={<SearchResultsPage />} />
              
              {/* Admin Routes */}
              <Route path="admin/login" element={<AdminLoginPage />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/apps/new"
                element={
                  <ProtectedRoute>
                    <AdminAppForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/apps/edit/:id"
                element={
                  <ProtectedRoute>
                    <AdminAppForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/categories"
                element={
                  <ProtectedRoute>
                    <AdminCategories />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
