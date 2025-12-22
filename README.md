# EAI E-Learning Platform

Plataforma de cursos de especialización desarrollada para la Escuela Americana de Innovación.

## Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Estado**: Zustand + TanStack Query
- **Estilos**: Tailwind CSS
- **Routing**: React Router v6

## Configuración Inicial

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [Supabase](https://app.supabase.com)
2. Copia las credenciales de tu proyecto (URL y Anon Key)
3. Crea un archivo `.env.local` basado en `.env.example`:

```bash
cp .env.example .env.local
```

4. Completa las variables de entorno en `.env.local`

### 3. Ejecutar Migraciones SQL

**Ver guía detallada en [SETUP_SUPABASE.md](SETUP_SUPABASE.md)**

1. Ve a tu proyecto de Supabase → SQL Editor
2. Ejecuta los siguientes archivos en orden:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_functions_triggers.sql`

### 4. Configurar Storage (Opcional)

Si planeas usar certificados en PDF:

1. Ve a Storage en Supabase
2. Crea un bucket llamado `certificates`
3. Hazlo público para permitir descargas

### 5. Iniciar el Proyecto

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
src/
├── components/       # Componentes de React
│   ├── admin/       # Componentes de administración
│   ├── assessments/ # Componentes de evaluaciones
│   ├── auth/        # Componentes de autenticación
│   ├── common/      # Componentes comunes/reutilizables
│   ├── courses/     # Componentes de cursos
│   └── layout/      # Componentes de layout
├── hooks/           # Custom hooks
├── lib/             # Utilidades y configuraciones
│   ├── supabase/    # Cliente de Supabase
│   └── utils/       # Funciones de utilidad
├── pages/           # Páginas de la aplicación
│   ├── admin/       # Páginas de admin
│   ├── auth/        # Páginas de autenticación
│   └── student/     # Páginas de estudiantes
├── routes/          # Configuración de rutas
├── store/           # Stores de Zustand
└── types/           # Tipos de TypeScript
```

## Roles de Usuario

- **Student**: Puede ver y tomar cursos, hacer evaluaciones y obtener certificados
- **Admin**: Puede crear y gestionar cursos, módulos, lecciones y evaluaciones

## Características

**Implementadas:**
- ✅ Autenticación con Supabase Auth (Login/Signup)
- ✅ Rutas protegidas por autenticación y rol
- ✅ Layout con Header responsive
- ✅ Dashboard de estudiante
- ✅ Dashboard de administrador
- ✅ Sistema de roles (student/admin)

**Por implementar:**
- 🔄 Catálogo de cursos
- 🔄 Inscripción a cursos
- 🔄 Contenido en formato texto/Markdown
- 🔄 Evaluaciones de opción múltiple (A, B, C, D)
- 🔄 Calificación automática
- 🔄 Intentos múltiples en evaluaciones
- 🔄 Seguimiento de progreso
- 🔄 Certificados de finalización automáticos
- 🔄 Panel de administración completo

## Deployment

### Vercel (Recomendado para Frontend)

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Configura las variables de entorno en Vercel Dashboard

### Supabase (Backend)

Ya está configurado en la nube con plan gratuito.

## Licencia

Desarrollado para la Escuela Americana de Innovación (EAI)
