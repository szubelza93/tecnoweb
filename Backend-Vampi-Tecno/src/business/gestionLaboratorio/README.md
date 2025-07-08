# Gestión de Laboratorio

Este módulo maneja la gestión de pruebas de laboratorio y serología del sistema Vampi Tecno.

## Estructura

### Controladores
- `PruebasController.js` - Maneja las operaciones CRUD para pruebas de laboratorio
- `SerologController.js` - Maneja las operaciones CRUD para serología

### Modelos
- `Pruebas.js` - Modelo para la tabla `vamPruebas`
- `Serolog.js` - Modelo para la tabla `vamSerolog`

### Rutas
- `pruebas.routes.js` - Rutas para gestión de pruebas
- `serolog.routes.js` - Rutas para gestión de serología

## Endpoints Disponibles

### Pruebas de Laboratorio (`/api/laboratorio/pruebas`)

- `GET /` - Obtener todas las pruebas
- `POST /` - Crear una nueva prueba
- `GET /:id` - Obtener una prueba por ID
- `PUT /:id` - Actualizar una prueba
- `DELETE /:id` - Eliminar una prueba
- `GET /search/descripcion` - Buscar pruebas por descripción

### Serología (`/api/laboratorio/serolog`)

- `GET /` - Obtener todas las serologías
- `POST /` - Crear una nueva serología
- `GET /:id` - Obtener una serología por ID
- `PUT /:id` - Actualizar una serología
- `DELETE /:id` - Eliminar una serología
- `GET /extraccion/:vexdNroExd` - Obtener serologías por extracción
- `GET /prueba/:vpruCodPru` - Obtener serologías por prueba

## Tablas de Base de Datos

### vamPruebas
- `vpruCodPru` (SMALLINT, PK) - Código de la prueba
- `vpruDescri` (VARCHAR(30)) - Descripción de la prueba
- `vpruCaract` (VARCHAR(250)) - Características de la prueba
- `vpruCodNiv` (CHAR(2)) - Código de nivel

### vamSerolog
- `vserNroPru` (INT, PK) - Número de prueba de serología
- `vexdNroExd` (INT, FK) - Número de extracción (referencia a vamExtDona)
- `vpruCodPru` (SMALLINT, FK) - Código de prueba (referencia a vamPruebas)
- `vpatCodPat` (SMALLINT) - Código de patología
- `vreaCodRea` (SMALLINT) - Código de reacción
- `vserResult` (CHAR(1)) - Resultado de la serología
- `vserEnvCne` (CHAR(1)) - Envío CNE
- `vserResCne` (CHAR(1)) - Respuesta CNE
- `vresCodRes` (SMALLINT) - Código de resultado
- `vserCanPru` (SMALLINT) - Cantidad de prueba
- `vserFecSer` (DATETIME) - Fecha de serología

## Relaciones

- `vamSerolog.vexdNroExd` → `vamExtDona.vexdNroExd`
- `vamSerolog.vpruCodPru` → `vamPruebas.vpruCodPru` 