# Configuración de Supabase

Esta guía te ayudará a configurar Supabase para la plataforma EAI E-Learning.

## Paso 1: Crear Proyecto en Supabase

1. Ve a [https://app.supabase.com](https://app.supabase.com)
2. Inicia sesión o crea una cuenta
3. Haz clic en "New Project"
4. Completa los datos:
   - **Name**: eai-elearning (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura y guárdala
   - **Region**: Selecciona la región más cercana
   - **Pricing Plan**: Free

5. Espera a que el proyecto se cree (puede tomar 1-2 minutos)

## Paso 2: Ejecutar Migraciones SQL

Una vez creado el proyecto:

1. Ve a **SQL Editor** en el menú lateral
2. Ejecuta los siguientes archivos en orden (copia y pega el contenido):

### 2.1 Initial Schema
Copia el contenido de `supabase/migrations/001_initial_schema.sql` y ejecútalo

### 2.2 RLS Policies
Copia el contenido de `supabase/migrations/002_rls_policies.sql` y ejecútalo

### 2.3 Functions & Triggers
Copia el contenido de `supabase/migrations/003_functions_triggers.sql` y ejecútalo

> **Importante**: Si ves algún error, asegúrate de ejecutar los archivos en orden. Cada migración depende de la anterior.

## Paso 3: Configurar Storage (Opcional)

Si deseas almacenar certificados en PDF:

1. Ve a **Storage** en el menú lateral
2. Haz clic en "Create a new bucket"
3. Completa:
   - **Name**: certificates
   - **Public bucket**: ✅ Sí (para permitir descargas)
4. Haz clic en "Create bucket"

## Paso 4: Obtener Credenciales

1. Ve a **Project Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL** (bajo "Config")
   - **anon public** key (bajo "Project API keys")

## Paso 5: Configurar Variables de Entorno

1. En la raíz del proyecto, crea un archivo `.env.local`:

```bash
cp .env.example .env.local
```

2. Edita `.env.local` y pega las credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

## Paso 6: Crear Usuario Administrador (Opcional)

Puedes crear un usuario administrador de dos formas:

### Opción A: Desde la aplicación
1. Inicia la app: `npm run dev`
2. Ve a `/signup`
3. Regístrate con tus datos
4. Ve a Supabase → **Table Editor** → **profiles**
5. Encuentra tu usuario y cambia el campo `role` de `student` a `admin`

### Opción B: Desde SQL Editor
Ejecuta el siguiente SQL en Supabase (cambia el email):

```sql
-- Primero crea el usuario en Auth
-- (esto se hace desde la UI de signup o desde Authentication → Users → Add user)

-- Luego actualiza el rol en profiles
UPDATE profiles
SET role = 'admin'
WHERE email = 'tu-email@ejemplo.com';
```

## Verificación

Para verificar que todo está configurado correctamente:

1. Ve a **Table Editor** en Supabase
2. Deberías ver las siguientes tablas:
   - profiles
   - courses
   - modules
   - lessons
   - assessments
   - questions
   - enrollments
   - lesson_progress
   - assessment_attempts
   - certificates

3. Intenta registrarte en la aplicación
4. Verifica que se crea un registro en la tabla `profiles`

## Troubleshooting

### Error: "relation does not exist"
- Asegúrate de ejecutar las migraciones en orden
- Verifica que no haya errores en el SQL Editor

### Error: "new row violates row-level security policy"
- Verifica que las políticas RLS se hayan creado correctamente
- Ejecuta de nuevo el archivo `002_rls_policies.sql`

### No puedo crear usuarios
- Verifica que la función `handle_new_user()` y el trigger existan
- Ve a **Database** → **Functions** y busca `handle_new_user`

### Los usuarios no tienen rol
- Verifica el trigger `on_auth_user_created` en auth.users
- Manualmente asigna un rol desde Table Editor si es necesario

## Límites del Plan Gratuito

Ten en cuenta los límites del plan gratuito de Supabase:

- **Base de datos**: 500 MB
- **Storage**: 1 GB
- **Usuarios activos**: 50,000/mes
- **Bandwidth**: 5 GB
- **API requests**: 500K/mes

El proyecto pausará automáticamente después de 1 semana de inactividad, pero se reactivará automáticamente al recibir una nueva solicitud.

## Siguiente Paso

Una vez configurado Supabase, puedes iniciar el proyecto:

```bash
npm run dev
```

Y acceder a [http://localhost:5173](http://localhost:5173)
