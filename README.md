# SD América Quiz App

Una aplicación web de cuestionarios interactiva con autenticación de usuarios, historial de puntuaciones y una interfaz moderna.

## Características

*   **Autenticación de Usuarios**: Registro y Login con almacenamiento local de sesión.
*   **Quiz Interactivo**: Preguntas de opción múltiple con retroalimentación inmediata.
*   **Sistema de Puntuación**: Cálculo de puntaje y porcentaje al finalizar.
*   **Historial**: Los usuarios pueden ver su historial de intentos y puntuaciones.
*   **Diseño Responsivo**: Interfaz amigable y adaptable a diferentes dispositivos.
*   **Base de Datos SQLite**: Almacenamiento ligero y eficiente para usuarios y resultados.

## Requisitos Previos

*   [Node.js](https://nodejs.org/) (versión 14 o superior recomendada)
*   NPM (viene instalado con Node.js)

## Instalación y Ejecución Local

1.  **Clonar o Descargar el Proyecto**:
    Asegúrate de tener todos los archivos en una carpeta.

2.  **Instalar Dependencias**:
    Abre una terminal en la carpeta del proyecto y ejecuta:
    ```bash
    npm install
    ```

3.  **Iniciar el Servidor**:
    Ejecuta el siguiente comando para iniciar el servidor backend y servir la aplicación:
    ```bash
    npm start
    ```

4.  **Acceder a la Aplicación**:
    Abre tu navegador web y visita:
    `http://localhost:3000`

## Despliegue en Producción

Esta aplicación está lista para ser desplegada en servicios como Render, Railway, Heroku o cualquier VPS.

### Pasos Generales para Despliegue:

1.  **Subir el código a GitHub/GitLab**.
2.  **Conectar tu repositorio** al servicio de hosting (ej. Render).
3.  **Configurar el comando de inicio**:
    *   Build Command: `npm install`
    *   Start Command: `npm start`
4.  **Variables de Entorno** (Opcional):
    *   El puerto por defecto es `3000`, pero la aplicación se adaptará automáticamente al puerto asignado por el proveedor de hosting (`process.env.PORT`).

## Estructura del Proyecto

*   `server.js`: Servidor backend (Express) y API.
*   `database.js`: Configuración y conexión a la base de datos SQLite.
*   `script.js`: Lógica del frontend (interfaz, quiz, llamadas a API).
*   `style.css`: Estilos de la aplicación.
*   `index.html`: Estructura HTML principal.
*   `questions.js`: Archivo con las preguntas del quiz.
*   `basededatos.db`: Archivo de la base de datos (se crea automáticamente).

## Créditos

Diseñado y desarrollado para SD América.
