import { Layout } from '@/components/layout/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { useAuth } from '@/hooks/useAuth'
import { BookOpen, Award, TrendingUp } from 'lucide-react'

export function Dashboard() {
  const { profile } = useAuth()

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-eai-blue mb-2">
            ¡Bienvenido, {profile?.full_name}!
          </h1>
          <p className="text-gray-600">
            Aquí podrás ver tu progreso y cursos en los que estás inscrito.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Cursos Activos</CardTitle>
                <BookOpen className="w-5 h-5 text-eai-blue" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-eai-blue">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Inscripciones activas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Certificados</CardTitle>
                <Award className="w-5 h-5 text-eai-turquoise" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-eai-turquoise">0</p>
              <p className="text-sm text-gray-600 mt-1">
                Cursos completados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Progreso</CardTitle>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">0%</p>
              <p className="text-sm text-gray-600 mt-1">
                Promedio general
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Tus últimas actividades en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No hay actividad reciente</p>
              <p className="text-sm mt-1">
                Comienza explorando el catálogo de cursos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
