# 🚀 Inicio Rápido - EAI E-Learning

## Estado Actual del Proyecto

✅ **Fase 1 y 2 Completadas**
- Proyecto base configurado con React + TypeScript + Vite
- Sistema de autenticación completo
- Layout y navegación responsive
- Componentes base reutilizables

## ⚠️ Primera Vez Usando la Aplicación

Si acabas de clonar este proyecto o es tu primera vez ejecutándolo, verás una **página de configuración** indicando que necesitas conectar Supabase.

### Opción 1: Configuración Completa (Recomendada)

Para usar todas las funcionalidades:

1. **Sigue la guía**: [SETUP_SUPABASE.md](SETUP_SUPABASE.md)
2. **Crea tu proyecto** en Supabase (plan gratuito)
3. **Ejecuta las migraciones** SQL
4. **Configura las variables** de entorno en `.env.local`
5. **Reinicia el servidor**

### Opción 2: Solo Ver la UI (Sin Backend)

Si solo quieres ver el diseño sin configurar Supabase:

> **Nota**: No podrás iniciar sesión ni usar funcionalidades que requieran backend, pero verás la página de configuración con instrucciones visuales.

## 🏃 Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa del build
npm run preview
```

## 📁 Archivos Importantes

- **`.env.local`**: Variables de entorno (debes crearlo - ver `.env.example`)
- **`supabase/migrations/`**: Migraciones SQL para la base de datos
- **`SETUP_SUPABASE.md`**: Guía completa de configuración de Supabase
- **`README.md`**: Documentación completa del proyecto

## 🎨 Características Implementadas

### Autenticación
- ✅ Login / Signup
- ✅ Protección de rutas
- ✅ Sistema de roles (Student/Admin)
- ✅ Persistencia de sesión

### UI/UX
- ✅ Header responsive con navegación
- ✅ Dashboards para estudiante y admin
- ✅ Componentes reutilizables (Button, Input, Card, Alert)
- ✅ Diseño siguiendo manual de marca EAI
- ✅ Colores corporativos (#1C00FF azul eléctrico, #00D1E6 turquesa)

## 🔜 Próximas Fases

- **Fase 3**: Catálogo de cursos e inscripción
- **Fase 4**: Sistema de evaluaciones
- **Fase 5**: Certificados automáticos
- **Fase 6**: Panel de administración completo
- **Fase 7**: Optimización y refinamiento

## 🆘 Solución de Problemas

### Pantalla en blanco
- Verifica que existe el archivo `.env.local`
- Reinicia el servidor después de crear `.env.local`

### No puedo iniciar sesión
- Asegúrate de haber ejecutado las migraciones SQL en Supabase
- Verifica que las credenciales en `.env.local` sean correctas

### Error en la consola
- Revisa la consola del navegador para mensajes específicos
- Verifica que todas las dependencias estén instaladas (`npm install`)

## 📞 Soporte

Para más información, consulta:
- [README.md](README.md) - Documentación completa
- [SETUP_SUPABASE.md](SETUP_SUPABASE.md) - Guía de configuración de Supabase
