import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicRoute } from '@/components/auth/PublicRoute'
import { RoleGuard } from '@/components/auth/RoleGuard'

// Auth Pages
import { Login } from '@/pages/auth/Login'
import { Signup } from '@/pages/auth/Signup'

// Student Pages
import { Dashboard } from '@/pages/student/Dashboard'

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected Student Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['student']}>
                <Dashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Placeholder routes for future implementation */}
        <Route
          path="/catalog"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['student']}>
                <div>Catálogo (Por implementar)</div>
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['student']}>
                <div>Mis Cursos (Por implementar)</div>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Placeholder admin routes */}
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin']}>
                <div>Gestión de Cursos (Por implementar)</div>
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={['admin']}>
                <div>Gestión de Usuarios (Por implementar)</div>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
