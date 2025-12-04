# 🗄️ Crear Tu Propia Base de Datos (Independiente)

Si quieres tener tu propia base de datos separada (sin compartir datos con otros desarrolladores), sigue estos pasos:

## 1. Crear Cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"**
3. Regístrate con tu email/Google/GitHub

## 2. Crear un Nuevo Proyecto

1. Haz clic en **"New Project"**
2. Configura:
   - **Name:** `sd-america-quiz` (o el nombre que prefieras)
   - **Database Password:** Crea una contraseña segura y **guárdala**
   - **Region:** Elige el más cercano a ti (ej: US East)
   - **Plan:** Free
3. Haz clic en **"Create new project"**
4. **Espera 2-3 minutos** a que se cree el proyecto

## 3. Crear las Tablas

1. Ve a **SQL Editor** en el menú izquierdo
2. Haz clic en **"New query"**
3. Copia y pega el siguiente SQL:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nombre TEXT NOT NULL,
    apellido_paterno TEXT NOT NULL,
    apellido_materno TEXT,
    empresa TEXT,
    puesto TEXT,
    telefono TEXT,
    security_question TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_history table
CREATE TABLE IF NOT EXISTS quiz_history (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_history ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for development)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on quiz_history" ON quiz_history FOR ALL USING (true) WITH CHECK (true);
```

4. Haz clic en **"Run"** (o presiona `Ctrl+Enter`)
5. Deberías ver: **"Success. No rows returned"**

## 4. Obtener las Credenciales

1. Ve a **Settings** → **API** en el menú izquierdo
2. Copia los siguientes valores:

   - **Project URL** (ejemplo: `https://abcdefgh.supabase.co`)
   - **anon/public key** (empieza con `eyJ...`)
   - **service_role key** (empieza con `eyJ...`)

## 5. Configurar el Archivo `.env`

En la raíz de tu proyecto, crea un archivo `.env` con este contenido:

```env
SUPABASE_URL=TU_PROJECT_URL_AQUI
SUPABASE_ANON_KEY=TU_ANON_KEY_AQUI
SUPABASE_SERVICE_KEY=TU_SERVICE_ROLE_KEY_AQUI
```

**Ejemplo:**
```env
SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 6. Reiniciar el Servidor

```bash
# Detener el servidor (Ctrl+C)
# Iniciar de nuevo
npm start
```

## 7. Verificar que Funciona

1. Abre `http://localhost:3000`
2. Registra un nuevo usuario
3. Ve a Supabase → **Table Editor** → **users**
4. Deberías ver tu usuario registrado

---

## 🔐 Seguridad

**IMPORTANTE:** 
- ❌ **NUNCA** subas el archivo `.env` a GitHub
- ❌ **NUNCA** compartas tus claves públicamente
- ✅ El archivo `.env` ya está en `.gitignore` para protegerte

---

## 🚀 Desplegar en Render con Tu Base de Datos

Si quieres desplegar tu propia versión en Render:

1. Haz un **fork** del repositorio en GitHub
2. Crea un nuevo servicio en [render.com](https://render.com)
3. Conecta tu fork
4. Agrega las 3 variables de entorno:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
5. Deploy automático

---

## 📊 Administrar Tu Base de Datos

### Ver Datos
- Ve a **Table Editor** en Supabase
- Selecciona la tabla (`users` o `quiz_history`)
- Puedes ver, editar y eliminar registros

### Ejecutar Consultas SQL
- Ve a **SQL Editor**
- Escribe tu consulta
- Haz clic en **Run**

### Ejemplo: Ver todos los usuarios
```sql
SELECT * FROM users;
```

### Ejemplo: Ver historial de quizzes
```sql
SELECT 
    u.nombre,
    u.apellido_paterno,
    qh.score,
    qh.total_questions,
    qh.date
FROM quiz_history qh
JOIN users u ON qh.user_id = u.id
ORDER BY qh.date DESC;
```

---

## 🆘 Problemas Comunes

### "Error: supabaseUrl is required"
- Verifica que el archivo `.env` existe
- Verifica que las 3 variables estén correctas
- Reinicia el servidor

### "Error: Invalid API key"
- Verifica que copiaste las claves completas
- Asegúrate de usar `service_role` key, no la `anon` key

### Las tablas no se crearon
- Ve a SQL Editor en Supabase
- Ejecuta el SQL de nuevo
- Verifica en Table Editor que las tablas existan

---

## 💡 Ventajas de Tener Tu Propia Base de Datos

✅ **Control total** - Tú decides qué datos hay
✅ **Sin conflictos** - No afectas a otros desarrolladores
✅ **Experimentación** - Puedes probar sin miedo
✅ **Privacidad** - Tus datos no se comparten

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa la [documentación de Supabase](https://supabase.com/docs)
2. Verifica que seguiste todos los pasos
3. Contacta al administrador del proyecto
