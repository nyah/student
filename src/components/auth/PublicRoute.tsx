import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/common/Spinner'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth()

  console.log('[PublicRoute] isLoading:', isLoading, 'isAuthenticated:', isAuthenticated)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    // Redirect authenticated users to their dashboard
    console.log('[PublicRoute] Redirecting authenticated user, isAdmin:', isAdmin)
    return <Navigate to={isAdmin ? '/admin' : '/'} replace />
  }

  return <>{children}</>
}
