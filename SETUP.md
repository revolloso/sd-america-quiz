# 🚀 Instrucciones para Desarrolladores

## Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- Git

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone https://github.com/revolloso/sd-america-quiz.git
cd sd-america-quiz
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
SUPABASE_URL=https://txdbnaehkbyygyjjijmy.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZGJuYWVoa2J5eWd5amppam15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTYzMzgsImV4cCI6MjA4MDQzMjMzOH0.ZvPystO-A1vBSpnu7aeFmmD3Gjubc6bkx6YwLBAnLus
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4ZGJuYWVoa2J5eWd5amppam15Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDg1NjMzOCwiZXhwIjoyMDgwNDMyMzM4fQ.cZGBeSFDXg5DgKKJoqIJJYYSDQ0JkY3libLpW37WUrY
```

**Nota:** El archivo `.env` está en `.gitignore` por seguridad. No lo subas a GitHub.

### 4. Ejecutar el Servidor
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📊 Base de Datos

La aplicación usa **Supabase** (PostgreSQL en la nube). 

### Opción A: Usar la Base de Datos Compartida (Recomendado para colaboración)
- ✅ **No necesitas instalar ninguna base de datos local**
- ✅ **Todos los desarrolladores comparten la misma base de datos**
- ✅ **Las tablas ya están creadas y configuradas**
- ✅ **Las credenciales ya están en el archivo `.env` de ejemplo**

### Opción B: Crear Tu Propia Base de Datos (Para desarrollo independiente)
Si prefieres tener tu propia base de datos separada:
- 📖 **Lee el archivo [`DATABASE_SETUP.md`](DATABASE_SETUP.md)** para instrucciones completas
- Crearás tu propio proyecto en Supabase
- Tendrás control total de tus datos
- No afectarás a otros desarrolladores

---

### Acceso a Supabase (Base de Datos Compartida)
Si necesitas ver o modificar la base de datos compartida:
1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión con la cuenta del proyecto
3. Ve al **SQL Editor** o **Table Editor**

## 🌐 Despliegue en Producción

La aplicación está desplegada en Render:
- **URL de Producción:** https://sd-america-quiz.onrender.com (o la URL que te proporcionen)

### Variables de Entorno en Render
Las mismas 3 variables del archivo `.env` deben estar configuradas en Render:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`

## 📁 Estructura del Proyecto

```
sd-america-quiz/
├── index.html          # Página principal
├── style.css           # Estilos
├── script.js           # Lógica del frontend
├── questions.js        # Preguntas del quiz
├── server.js           # Servidor backend (Express)
├── database.js         # Configuración de Supabase
├── package.json        # Dependencias
├── .env                # Variables de entorno (NO subir a Git)
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Documentación principal
```

## 🔧 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Ver cambios en Git
git status

# Subir cambios
git add .
git commit -m "Descripción de cambios"
git push
```

## 🆘 Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 is already in use"
Mata el proceso que está usando el puerto:
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Error: "supabaseUrl is required"
Verifica que el archivo `.env` existe y tiene las 3 variables correctas.

## 📞 Contacto

Si tienes problemas, contacta al administrador del proyecto.
