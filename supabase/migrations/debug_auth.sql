-- =====================================================
-- SCRIPT DE DEBUG - Verificar trigger de creación de perfil
-- =====================================================

-- 1. Verificar que existe el trigger en auth.users
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 2. Verificar que existe la función handle_new_user
SELECT
  routine_name,
  routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'handle_new_user';

-- 3. Ver si hay usuarios en auth.users
SELECT
  id,
  email,
  created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;

-- 4. Ver si hay perfiles creados
SELECT
  id,
  email,
  full_name,
  role,
  created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 5;

-- 5. Verificar las políticas RLS de profiles
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'profiles';
