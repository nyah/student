-- =====================================================
-- SCRIPT DE VERIFICACIÓN DE CONFIGURACIÓN
-- Ejecuta este script para verificar que todo está configurado correctamente
-- =====================================================

-- 1. Verificar que todas las tablas existen
SELECT
  'Tablas creadas:' as status,
  COUNT(*) as total
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
  'profiles', 'courses', 'modules', 'lessons',
  'assessments', 'questions', 'enrollments',
  'lesson_progress', 'assessment_attempts', 'certificates'
);

-- 2. Listar todas las tablas que deberían existir
SELECT
  table_name,
  CASE
    WHEN table_name IN (
      'profiles', 'courses', 'modules', 'lessons',
      'assessments', 'questions', 'enrollments',
      'lesson_progress', 'assessment_attempts', 'certificates'
    ) THEN '✅ Existe'
    ELSE '❌ Falta'
  END as estado
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 3. Verificar RLS está habilitado
SELECT
  tablename,
  rowsecurity as rls_habilitado
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
  'profiles', 'courses', 'modules', 'lessons',
  'assessments', 'questions', 'enrollments',
  'lesson_progress', 'assessment_attempts', 'certificates'
)
ORDER BY tablename;

-- 4. Contar políticas RLS
SELECT
  schemaname,
  tablename,
  COUNT(*) as num_politicas
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY schemaname, tablename
ORDER BY tablename;

-- 5. Verificar funciones importantes
SELECT
  routine_name,
  '✅ Existe' as estado
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'update_updated_at_column',
  'check_attempt_limit',
  'check_course_completion',
  'handle_new_user',
  'get_student_progress',
  'get_student_stats',
  'grade_assessment'
)
ORDER BY routine_name;

-- 6. Verificar triggers
SELECT
  trigger_name,
  event_object_table as tabla,
  '✅ Existe' as estado
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- Si ves resultados para todos estos queries, tu setup está correcto!
-- Si algo falta, ejecuta de nuevo las migraciones correspondientes.
