# 🧹 Limpiar Caché del Navegador

El loader infinito puede deberse a una sesión antigua guardada en el navegador.

## Solución Rápida

### Opción 1: Modo Incógnito (Más Fácil)
1. Abre una **ventana de incógnito** en tu navegador:
   - **Chrome/Edge**: `Cmd + Shift + N` (Mac) o `Ctrl + Shift + N` (Windows)
   - **Firefox**: `Cmd + Shift + P` (Mac) o `Ctrl + Shift + P` (Windows)
   - **Safari**: `Cmd + Shift + N`

2. En la ventana de incógnito, ve a: http://localhost:5173/login

3. **Deberías ver la página de login correctamente**

### Opción 2: Limpiar LocalStorage
1. Abre el navegador en http://localhost:5173
2. Presiona **F12** (o `Cmd + Option + I` en Mac)
3. Ve a la pestaña **Console**
4. Escribe y presiona Enter:
   ```javascript
   localStorage.clear()
   sessionStorage.clear()
   location.reload()
   ```

### Opción 3: Limpiar Cookies y Caché
1. En tu navegador, ve a **Configuración**
2. Busca **"Borrar datos de navegación"** o **"Clear browsing data"**
3. Selecciona:
   - ✅ Cookies
   - ✅ Caché
   - ✅ LocalStorage
4. Elige **"Solo desde localhost"** si es posible
5. Haz clic en **"Borrar"**
6. Recarga la página

## ¿Por qué pasa esto?

Supabase guarda la sesión en `localStorage`. Si hubo alguna sesión corrupta o antigua,
el navegador intenta cargarla y causa problemas.

## Una vez que funcione

Cuando veas la página de login correctamente, podrás:
1. Registrarte creando un usuario nuevo
2. Iniciar sesión
3. Ver el dashboard
