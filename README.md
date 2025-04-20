
# Plataforma de Gestión de Decisiones Personales

## Descripción

La **Plataforma de Gestión de Decisiones Personales** es una aplicación web que permite a los usuarios registrar decisiones importantes, evaluar los pros y contras de cada opción y hacer un seguimiento de los resultados con el paso del tiempo. La plataforma proporciona herramientas de análisis gráfico y estadísticas para mejorar el proceso de toma de decisiones y ofrece recomendaciones basadas en patrones detectados en decisiones pasadas.

### Características principales:
- **Guardar decisiones** con detalles como fecha, categoría y descripción.
- **Analizar pros y contras** de cada opción antes de tomar una decisión.
- **Evaluar los resultados** después de un periodo determinado.
- **Consultar gráficos interactivos** que muestran patrones en la toma de decisiones.

---

## Tecnologías Utilizadas

### Backend:
- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express**: Framework para construir APIs RESTful.
- **Sequelize** y **Sequelize-TypeScript**: ORM para interactuar con bases de datos PostgreSQL.
- **PostgreSQL**: Base de datos relacional.
- **JWT (JSON Web Tokens)**: Para manejo de autenticación y autorización.
- **bcryptjs**: Para el cifrado de contraseñas.
- **dotenv**: Para la gestión de variables de entorno.
- **Nodemon**: Herramienta de desarrollo que reinicia automáticamente el servidor cuando se detectan cambios en el código.
- **TypeScript**: Superset de JavaScript para añadir tipado estático.
- **morgan**: Middleware para registrar las solicitudes HTTP.

### Frontend:
- **React**: Librería de JavaScript para la construcción de interfaces de usuario.
- **Vite**: Herramienta de construcción y desarrollo rápido para aplicaciones web.
- **TailwindCSS**: Framework de CSS para diseño de interfaces de usuario.
- **React Router DOM**: Biblioteca para manejar rutas en la aplicación.
- **React Query**: Para el manejo de solicitudes de datos asíncronos.
- **Zustand**: Librería para el manejo del estado global en React.
- **Axios**: Cliente HTTP para hacer peticiones a la API.
- **ESLint** y **Prettier**: Herramientas para mantener el código limpio y bien formateado.

---


## Instalación

### Backend

1. Clona el repositorio:

   ```bash
   git clone https://github.com/losadev/plataforma-decisiones-personales.git
   
2. Navega al directorio del backend:

   ```bash
    cd backend

3. Instala las dependencias:

    ```bash
    npm install

4. Configura las variables de entorno:
   
- Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

    ```bash
    SALT=10
    PORT=numero-puerto
    JWT_SECRET=tu_secreto
    DB_NAME=tu_base_datos
    DB_USERNAME=tu_usuario
    DB_PWD=tu_contraseña

5. Construye el proyecto TypeScript:

    ```bash
    npm run build

5. Inicia el servidor de desarrollo:

    ```bash
    npm run dev

El backend debería estar corriendo en http://localhost:5000.



### Frontend

1. Navega al directorio del frontend:

    ```bash
    cd frontend

2. Instala las dependencias:

    ```bash
    npm install

3. Inicia el servidor de desarrollo:

    ```bash
    npm run dev

El frontend debería estar corriendo en http://localhost:3000.



## Uso

### Backend:

- La API permite interactuar con las decisiones, evaluaciones y recomendaciones. Los principales endpoints son:

- POST /decisions: Crear una nueva decisión.

- GET /decisions: Obtener todas las decisiones.

- POST /evaluations: Crear una evaluación para una decisión.

- GET /recommendations: Obtener recomendaciones basadas en evaluaciones.

### Frontend:

- Registrar una nueva decisión: Los usuarios pueden ingresar el título, categoría y los pros y contras de una decisión.

- Evaluar decisiones: Después de registrar una decisión, los usuarios pueden evaluarlas, asignándoles una puntuación.

- Ver gráficos: Los gráficos interactivos ayudan a visualizar los resultados de las decisiones a lo largo del tiempo.



## Contribución

### ¡Las contribuciones son bienvenidas! Si deseas contribuir, sigue estos pasos:

1. Haz un fork del repositorio.

2. Crea una nueva rama:

    ```bash
    git checkout -b feature/nueva-característica

3. Realiza los cambios y haz commit:

    ```bash
    git commit -m 'Añadido nueva característica'

3. Haz push a tu rama:

    ```bash
    git push origin feature/nueva-característica

4. Abre un Pull Request en GitHub.

Por favor, asegúrate de que tu código siga las convenciones y pase las pruebas antes de hacer un Pull Request.

