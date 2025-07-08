# Módulo VamGrupSan - Gestión de Grupos Sanguíneos

## Descripción
Este módulo permite la gestión completa de grupos sanguíneos en el sistema de banco de sangre, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

## Estructura de Archivos

```
vamGrupSan/
├── vamGrupSan.component.ts          # Componente principal (listado)
├── vamGrupSan.component.html        # Template del listado
├── vamGrupSan.component.css         # Estilos del listado
├── vamGrupSan-form.component.ts     # Componente de formulario
├── vamGrupSan-form.component.html   # Template del formulario
├── vamGrupSan-form.component.css    # Estilos del formulario
└── README.md                        # Este archivo
```

## Funcionalidades

### 1. Listado de Grupos Sanguíneos (`vamGrupSan.component`)
- **Visualización**: Tabla con todos los grupos sanguíneos
- **Búsqueda**: Por grupo ABO
- **Paginación**: 10 elementos por página
- **Acciones**: Ver, Editar, Eliminar
- **Estados**: Loading, error, sin datos

### 2. Formulario de Grupos Sanguíneos (`vamGrupSan-form.component`)
- **Crear**: Nuevo grupo sanguíneo
- **Editar**: Modificar grupo existente
- **Validaciones**: Campos requeridos y valores numéricos
- **Validación lógica**: Máximo > Mínimo

## Campos del Modelo

| Campo | Tipo | Descripción | Validación |
|-------|------|-------------|------------|
| `vqrsCodGrs` | string | Código del grupo sanguíneo | Auto-generado |
| `vqrsGruABO` | string | Grupo ABO (A, B, AB, O) | Requerido |
| `vqrsTipoRH` | string | Tipo RH (+, -) | Requerido |
| `vprgCodPrg` | number | Código del programa | Requerido, min: 1 |
| `vprgEstMin` | number | Estándar mínimo | Requerido, min: 0 |
| `vprgEstMax` | number | Estándar máximo | Requerido, min: 0 |

## Rutas

- `/vam-grup-san` - Listado de grupos sanguíneos
- `/vam-grup-san/crear` - Crear nuevo grupo sanguíneo
- `/vam-grup-san/editar/:id` - Editar grupo sanguíneo existente

## Servicios

### VamGrupSanService
- `getAllVamGrupSan()` - Obtener todos los grupos
- `getVamGrupSanById(id)` - Obtener por ID
- `createVamGrupSan(data)` - Crear nuevo
- `updateVamGrupSan(id, data)` - Actualizar
- `deleteVamGrupSan(id)` - Eliminar
- `searchVamGrupSanByGruABO(gruABO)` - Buscar por grupo ABO

## Características Especiales

### 1. Badges Visuales
- **Tipo RH Positivo**: Badge rojo
- **Tipo RH Negativo**: Badge azul

### 2. Validaciones
- Campos requeridos
- Valores numéricos mínimos
- Validación lógica: máximo > mínimo

### 3. UX/UI
- Diseño responsive
- Animaciones suaves
- Estados de loading
- Mensajes de error/éxito
- Información contextual

### 4. Navegación
- Integrado con el sidebar
- Navegación entre listado y formulario
- Botón "Volver" en formularios

## Uso

1. **Acceder al módulo**: Desde el sidebar, hacer clic en "VamGrupSan"
2. **Crear nuevo**: Hacer clic en "Nuevo Grupo Sanguíneo"
3. **Editar**: Hacer clic en el ícono de editar en la tabla
4. **Eliminar**: Hacer clic en el ícono de eliminar (con confirmación)
5. **Buscar**: Usar la barra de búsqueda por grupo ABO

## Dependencias

- Angular Reactive Forms
- Angular Router
- HttpClient
- Tailwind CSS
- RxJS

## API Endpoints

- `GET /api/vam-grup-san` - Listar todos
- `GET /api/vam-grup-san/:id` - Obtener por ID
- `POST /api/vam-grup-san` - Crear
- `PUT /api/vam-grup-san/:id` - Actualizar
- `DELETE /api/vam-grup-san/:id` - Eliminar
- `GET /api/vam-grup-san/search/gruABO?gruABO=:value` - Buscar 