import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading, isAdmin } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eai-blue"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    // Redirect authenticated users to their dashboard
    return <Navigate to={isAdmin ? '/admin' : '/'} replace />
  }

  return <>{children}</>
}
