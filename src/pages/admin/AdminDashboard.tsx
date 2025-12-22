import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'

export function AdminDashboard() {
  const { profile } = useAuth()

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-eai-blue mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Bienvenido, {profile?.full_name}. Gestiona la plataforma desde aquí.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Cursos</CardTitle>
                <BookOpen className="w-5 h-5 text-eai-blue" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-eai-blue">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Cursos totales
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Estudiantes</CardTitle>
                <Users className="w-5 h-5 text-eai-turquoise" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-eai-turquoise">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Usuarios activos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Certificados</CardTitle>
                <Award className="w-5 h-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Emitidos este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Inscripciones</CardTitle>
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-500">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Este mes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Gestiona la plataforma desde aquí
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-eai hover:border-eai-blue transition-colors cursor-pointer">
                <BookOpen className="w-8 h-8 text-eai-blue mb-2" />
                <h3 className="font-medium text-gray-900">Crear Curso</h3>
                <p className="text-sm text-gray-600">
                  Agrega un nuevo curso a la plataforma
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-eai hover:border-eai-blue transition-colors cursor-pointer">
                <Users className="w-8 h-8 text-eai-turquoise mb-2" />
                <h3 className="font-medium text-gray-900">Gestionar Usuarios</h3>
                <p className="text-sm text-gray-600">
                  Administra los usuarios de la plataforma
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
