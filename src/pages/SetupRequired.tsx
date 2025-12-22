import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Alert, AlertDescription, AlertTitle } from '@/components/common/Alert'
import { Database, FileCode, Server } from 'lucide-react'

export function SetupRequired() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-eai-turquoise to-eai-blue rounded-lg flex items-center justify-center mx-auto mb-4">
            <Server className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-eai-blue mb-2">
            EAI E-Learning Platform
          </h1>
          <p className="text-gray-600">
            Escuela Americana de Innovación
          </p>
        </div>

        <Alert variant="warning" className="mb-6">
          <AlertTitle>Configuración Requerida</AlertTitle>
          <AlertDescription>
            La plataforma necesita conectarse a Supabase para funcionar. Por favor, sigue los pasos a continuación.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pasos para Configurar Supabase</CardTitle>
            <CardDescription>
              Sigue estos pasos para poner en marcha la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-eai-blue text-white flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  Crear Proyecto en Supabase
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Ve a{' '}
                  <a
                    href="https://app.supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-eai-blue hover:underline"
                  >
                    app.supabase.com
                  </a>{' '}
                  y crea un nuevo proyecto (plan gratuito).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-eai-blue text-white flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Ejecutar Migraciones SQL
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  En Supabase, ve a <strong>SQL Editor</strong> y ejecuta estos archivos en orden:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <code className="bg-gray-100 px-1 rounded">supabase/migrations/001_initial_schema.sql</code></li>
                  <li>• <code className="bg-gray-100 px-1 rounded">supabase/migrations/002_rls_policies.sql</code></li>
                  <li>• <code className="bg-gray-100 px-1 rounded">supabase/migrations/003_functions_triggers.sql</code></li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-eai-blue text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  Configurar Variables de Entorno
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Crea un archivo <code className="bg-gray-100 px-1 rounded">.env.local</code> en la raíz del proyecto con:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui`}
                </pre>
                <p className="text-sm text-gray-600 mt-2">
                  Obtén estas credenciales en <strong>Project Settings → API</strong> en Supabase.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-eai-turquoise text-white flex items-center justify-center font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">
                  Reiniciar el Servidor
                </h3>
                <p className="text-sm text-gray-600">
                  Detén el servidor (<kbd className="bg-gray-100 px-1 rounded">Ctrl+C</kbd>) y vuelve a ejecutar:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs mt-2">
npm run dev
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 text-center">
              📚 Para más detalles, consulta{' '}
              <a
                href="/SETUP_SUPABASE.md"
                className="text-eai-blue hover:underline font-medium"
              >
                SETUP_SUPABASE.md
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
