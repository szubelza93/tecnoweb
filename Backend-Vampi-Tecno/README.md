# Backend Vampi Tecno

Sistema de gestión para banco de sangre desarrollado con Node.js, Express y PostgreSQL.

## 🚀 Características

- **Gestión de Donantes**: Registro y seguimiento de donantes de sangre
- **Gestión de Extracción**: Control de bolsas hematológicas y tipos de bolsa
- **Gestión de Screening**: Proceso de evaluación pre-donación
- **Gestión de Producción**: Control de almacenes y equipos
- **API RESTful**: Endpoints bien documentados
- **Seguridad**: JWT, rate limiting, CORS configurado
- **Validación**: Middleware de validación de datos

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd Backend-Vampi-Tecno
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   ```
   
   Editar el archivo `.env` con tus configuraciones:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=vampi_tecno_db
   DB_USER=postgres
   DB_PASSWORD=tu_password
   JWT_SECRET=tu_secret_super_seguro
   ```

4. **Crear la base de datos**
   ```sql
   CREATE DATABASE vampi_tecno_db;
   ```

5. **Inicializar la base de datos**
   ```bash
   npm run init-db
   ```

6. **Ejecutar el servidor**
   ```bash
   # Desarrollo
   npm run dev
   
   # Producción
   npm start
   ```

## 📚 Estructura del Proyecto

```
src/
├── config/
│   └── database.js          # Configuración de PostgreSQL
├── controllers/             # Controladores de la aplicación
│   ├── gestionDonante/     # Gestión de donantes
│   ├── gestionExtraccion/  # Gestión de extracción
│   ├── gestionProduccion/  # Gestión de producción
│   └── gestionScreening/   # Gestión de screening
├── database/
│   └── init.js             # Inicialización de la base de datos
├── middlewares/            # Middlewares personalizados
├── models/                 # Modelos de datos
├── routes/                 # Definición de rutas
└── server.js              # Punto de entrada de la aplicación
```

## 🔌 Endpoints Principales

### Gestión de Donantes
- `GET /api/donantes` - Listar todos los donantes
- `POST /api/donantes` - Crear nuevo donante
- `GET /api/donantes/:id` - Obtener donante por ID
- `PUT /api/donantes/:id` - Actualizar donante
- `DELETE /api/donantes/:id` - Eliminar donante

### Gestión de Extracción
- `GET /api/tipos-bolsa` - Listar tipos de bolsa
- `GET /api/bolsas-hematologicas` - Listar bolsas hematológicas
- `GET /api/reacciones` - Listar reacciones

### Gestión de Screening
- `GET /api/screenings` - Listar screenings
- `GET /api/citas` - Listar citas
- `GET /api/grupos-sanguineos` - Listar grupos sanguíneos

### Gestión de Producción
- `GET /api/almacenes` - Listar almacenes
- `GET /api/equipos-almacen` - Listar equipos de almacén

## 🛡️ Seguridad

- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **CORS**: Configurado para permitir solo orígenes autorizados
- **Helmet**: Headers de seguridad HTTP
- **Validación**: Middleware de validación de datos de entrada
- **JWT**: Autenticación basada en tokens

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm test
```

## 📝 Scripts Disponibles

- `npm start` - Ejecutar en producción
- `npm run dev` - Ejecutar en desarrollo con nodemon
- `npm run init-db` - Inicializar la base de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 🆘 Soporte

Si encuentras algún problema, por favor crea un issue en el repositorio. 