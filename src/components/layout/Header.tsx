import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  User,
} from 'lucide-react'

export function Header() {
  const { profile, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-eai-turquoise to-eai-blue rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-eai-blue hidden sm:block">
              EAI E-Learning
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAdmin ? (
              <>
                <Link
                  to="/admin"
                  className="flex items-center gap-2 text-gray-700 hover:text-eai-blue transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/courses"
                  className="flex items-center gap-2 text-gray-700 hover:text-eai-blue transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Gestión de Cursos
                </Link>
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2 text-gray-700 hover:text-eai-blue transition-colors"
                >
                  <User className="w-4 h-4" />
                  Usuarios
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-700 hover:text-eai-blue transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  to="/catalog"
                  className="flex items-center gap-2 text-gray-700 hover:text-eai-blue transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  Catálogo
                </Link>
                <Link
                  to="/my-courses"
                  className="flex items-center gap-2 text-gray-700 hover:text-eai-blue transition-colors"
                >
                  <GraduationCap className="w-4 h-4" />
                  Mis Cursos
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-eai-blue flex items-center justify-center text-white font-medium">
                {profile?.full_name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {profile?.full_name}
              </span>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-eai shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {profile?.full_name}
                    </p>
                    <p className="text-xs text-gray-500">{profile?.email}</p>
                    <p className="text-xs text-eai-turquoise font-medium mt-1">
                      {isAdmin ? 'Administrador' : 'Estudiante'}
                    </p>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
