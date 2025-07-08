# Módulo de Donantes

Este módulo proporciona una gestión completa de donantes con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y funcionalidades adicionales.

## Estructura del Módulo

```
src/app/pages/donantes/
├── donantes.component.ts          # Listado principal de donantes
├── donantes.component.html        # Template del listado
├── donantes.component.css         # Estilos del listado
├── donante-form.component.ts      # Formulario para crear/editar
├── donante-form.component.html    # Template del formulario
├── donante-form.component.css     # Estilos del formulario
├── donante-detail.component.ts    # Vista de detalles
├── donante-detail.component.html  # Template de detalles
├── donante-detail.component.css   # Estilos de detalles
└── README.md                      # Esta documentación
```

## Componentes

### 1. DonantesComponent (Listado)
- **Ruta**: `/donantes`
- **Funcionalidades**:
  - Listado paginado de donantes
  - Búsqueda por nombre, apellido paterno o materno
  - Acciones: Ver, Editar, Eliminar
  - Filtros y ordenamiento
  - Estados visuales (activo/inactivo)

### 2. DonanteFormComponent (Formulario)
- **Rutas**: `/donantes/crear`, `/donantes/editar/:id`
- **Funcionalidades**:
  - Formulario reactivo con validaciones
  - Carga automática de datos relacionados
  - Cálculo automático de edad
  - Validaciones en tiempo real
  - Modo creación/edición

### 3. DonanteDetailComponent (Detalles)
- **Ruta**: `/donantes/ver/:id`
- **Funcionalidades**:
  - Vista completa de información del donante
  - Información organizada en secciones
  - Acciones: Editar, Eliminar
  - Enlaces de contacto (email, teléfono)

## Modelos de Datos

### Donante
```typescript
interface Donante {
  vdonCodDon?: string;           // Código del donante
  vdonPatern: string;            // Apellido paterno
  vdonMatern: string;            // Apellido materno
  vdonNombre: string;            // Nombres
  vzonCodZon: string;            // Código de zona
  vdonDirecc: string;            // Dirección
  vdonDesDir: string;            // Descripción de dirección
  vtidCodTid: string;            // Tipo de documento
  vdonDocide: string;            // Número de documento
  vdonFecNac: string;            // Fecha de nacimiento
  vdonEdadDo: number;            // Edad
  vdonEstCiv: string;            // Estado civil
  vdonSexoDn: string;            // Sexo
  vdonTelOfi: string;            // Teléfono oficina
  vdonTelCel: string;            // Teléfono celular
  vdonEmail: string;             // Email principal
  vdonEmail2: string;            // Email secundario
  vdonDirTra: string;            // Dirección de trabajo
  vdonCarneT: string;            // Carné de trabajo
  vocuCodOcu: string;            // Ocupación
  vgraCodGra: string;            // Grado de instrucción
  vlugCodLug: string;            // Lugar de nacimiento
  vcluCodClu: string;            // Club de donantes
  vresCodRes: string;            // Código de reserva
  vdonSwCita: boolean;           // Estado activo
  created_at?: string;           // Fecha de creación
  updated_at?: string;           // Fecha de actualización
  
  // Campos relacionados (para mostrar información descriptiva)
  tipo_documento?: string;
  ocupacion?: string;
  grado_instruccion?: string;
  lugar_nacimiento?: string;
  club_donantes?: string;
  zona_direccion?: string;
}
```

## Servicios

### DonanteService
Maneja todas las operaciones HTTP con el backend:

- `getAllDonantes()`: Obtener todos los donantes
- `getDonanteById(id)`: Obtener donante por ID
- `createDonante(donante)`: Crear nuevo donante
- `updateDonante(id, donante)`: Actualizar donante
- `deleteDonante(id)`: Eliminar donante
- `searchDonantesByNombre(nombre)`: Buscar por nombre

### Servicios de Datos Relacionados
- `getTiposDocumento()`: Tipos de documento
- `getOcupaciones()`: Ocupaciones
- `getGradosInstruccion()`: Grados de instrucción
- `getLugaresNacimiento()`: Lugares de nacimiento
- `getClubesDonantes()`: Clubes de donantes
- `getZonasDireccion()`: Zonas de dirección

## Validaciones

### Campos Requeridos
- Apellido paterno (mínimo 2 caracteres)
- Apellido materno (mínimo 2 caracteres)
- Nombres (mínimo 2 caracteres)
- Zona
- Dirección
- Tipo de documento
- Número de documento (mínimo 8 caracteres)
- Fecha de nacimiento
- Edad (18-100 años)
- Estado civil
- Sexo
- Teléfono celular (formato: 9-10 dígitos)
- Ocupación
- Grado de instrucción
- Lugar de nacimiento

### Validaciones Especiales
- Emails: Formato válido de email
- Teléfonos: Formato numérico de 9-10 dígitos
- Edad: Rango entre 18 y 100 años
- Cálculo automático de edad basado en fecha de nacimiento

## Características Técnicas

### Responsive Design
- Diseño adaptativo para móviles, tablets y desktop
- Grid system flexible
- Navegación optimizada para touch

### Performance
- Lazy loading de componentes
- Paginación del lado del cliente
- Carga optimizada de datos relacionados
- Debounce en búsquedas

### UX/UI
- Feedback visual inmediato
- Estados de carga
- Mensajes de error descriptivos
- Confirmaciones para acciones destructivas
- Animaciones suaves
- Iconografía consistente

### Seguridad
- Validación en frontend y backend
- Sanitización de datos
- Manejo seguro de errores
- Confirmaciones para eliminación

## Configuración del Backend

El módulo espera que el backend tenga los siguientes endpoints:

```
GET    /api/donantes                    # Listar todos
GET    /api/donantes/:id                # Obtener por ID
POST   /api/donantes                    # Crear
PUT    /api/donantes/:id                # Actualizar
DELETE /api/donantes/:id                # Eliminar
GET    /api/donantes/search/nombre      # Buscar por nombre

# Datos relacionados
GET    /api/tipos-documento
GET    /api/ocupaciones
GET    /api/grados-instruccion
GET    /api/lugares-nacimiento
GET    /api/clubes-donantes
GET    /api/zonas-direccion
```

## Instalación y Uso

1. **Verificar dependencias**:
   ```bash
   npm install @angular/forms @angular/common
   ```

2. **Configurar rutas** (ya incluido en app.routes.ts)

3. **Configurar HttpClient** (ya incluido en app.config.ts)

4. **Acceder al módulo**:
   - Navegar a `/donantes` para ver el listado
   - Usar el sidebar para acceder al módulo

## Personalización

### Estilos
Los estilos están organizados en archivos CSS separados por componente:
- `donantes.component.css`: Estilos del listado
- `donante-form.component.css`: Estilos del formulario
- `donante-detail.component.css`: Estilos de detalles

### Configuración
- URL del backend: Modificar en `donante.service.ts`
- Paginación: Ajustar `itemsPerPage` en el componente
- Validaciones: Modificar en `donante-form.component.ts`

## Troubleshooting

### Problemas Comunes

1. **Error de CORS**:
   - Verificar configuración del backend
   - Asegurar que el backend permita requests desde el frontend

2. **Datos no se cargan**:
   - Verificar URL del backend en el servicio
   - Revisar console del navegador para errores
   - Verificar que el backend esté funcionando

3. **Validaciones no funcionan**:
   - Verificar que ReactiveFormsModule esté importado
   - Revisar que los validadores estén correctamente configurados

4. **Rutas no funcionan**:
   - Verificar que las rutas estén correctamente configuradas
   - Asegurar que los componentes estén exportados correctamente

## Contribución

Para contribuir al módulo:

1. Seguir las convenciones de Angular
2. Mantener la consistencia en el diseño
3. Agregar tests para nuevas funcionalidades
4. Documentar cambios importantes
5. Verificar que funcione en diferentes dispositivos 