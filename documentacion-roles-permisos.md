# Implementación de Roles y Permisos en el Sistema

Este documento explica cómo se implementaron los roles y permisos en el sistema, tanto en el backend como en el frontend.

## 1. Arquitectura del Sistema de Roles

### 1.1 Definición de Roles

Los roles están definidos como constantes en el archivo `backend/src/data/gestionUsuario/Usuario.js`:

```javascript
// Roles predefinidos
const ROLES = {
    ADMIN: 'admin',
    MEDICO: 'medico',
    LABORATORIO: 'laboratorio',
    RECEPCION: 'recepcion',
    USUARIO: 'usuario'
};
```

Estos roles representan los diferentes niveles de acceso en el sistema:
- **admin**: Acceso completo a todas las funcionalidades
- **medico**: Acceso a funcionalidades relacionadas con médicos
- **laboratorio**: Acceso a funcionalidades de laboratorio
- **recepcion**: Acceso a funcionalidades de recepción
- **usuario**: Acceso básico (rol por defecto)

### 1.2 Almacenamiento de Roles

Los roles se almacenan en la base de datos como un campo `role` en la tabla de usuarios (`vamusuario`). Cuando se crea un usuario, si no se especifica un rol, se asigna el rol `usuario` por defecto:

```javascript
// En Usuario.js, método create
data.role || ROLES.USUARIO // Default role if not specified
```

## 2. Implementación en el Backend

### 2.1 Modelo de Usuario

El modelo de Usuario fue modificado para incluir el campo `role` en todas las consultas y operaciones:

```javascript
// En las consultas SELECT
SELECT id, name, email, usernick, photo_path, role, created_at, updated_at
FROM vamusuario
```

```javascript
// En las operaciones INSERT
INSERT INTO vamusuario (
    name, email, usernick, password, photo_path, role
) VALUES ($1, $2, $3, $4, $5, $6)
```

```javascript
// En las operaciones UPDATE
// Si role es proporcionado, actualizarlo
if (data.role) {
    query += `, role = $${params.length + 1}`;
    params.push(data.role);
}
```

### 2.2 Autenticación y JWT

El sistema utiliza JSON Web Tokens (JWT) para la autenticación. Los tokens incluyen el rol del usuario:

```javascript
// En AuthController.js, método login
const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role || ROLES.USUARIO },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
);

const refreshToken = jwt.sign(
    { id: user.id, role: user.role || ROLES.USUARIO },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
);
```

### 2.3 Middleware de Autenticación

El middleware de autenticación (`authenticate`) extrae el rol del token JWT y lo incluye en el objeto `req.user`:

```javascript
// En auth.js
const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return ResponseHelper.unauthorized(res, 'Se requiere un token de acceso.');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { 
      id: decoded.id, 
      email: decoded.email,
      role: decoded.role 
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ResponseHelper.unauthorized(res, 'El token ha expirado.');
    }
    return ResponseHelper.unauthorized(res, 'Token inválido.');
  }
});
```

### 2.4 Middleware de Autorización

Se implementaron tres middlewares de autorización para controlar el acceso basado en roles:

1. **authorize**: Verifica que el usuario tenga un rol específico
```javascript
const authorize = (requiredRole) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return ResponseHelper.unauthorized(res, 'Se requiere autenticación.');
    }

    // Verificar si el usuario tiene el rol requerido
    if (requiredRole && req.user.role !== requiredRole) {
      return ResponseHelper.forbidden(res, 'No tiene permisos para realizar esta acción.');
    }

    next();
  };
};
```

2. **authorizeAny**: Verifica que el usuario tenga alguno de los roles especificados
```javascript
const authorizeAny = (roles) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return ResponseHelper.unauthorized(res, 'Se requiere autenticación.');
    }

    // Si no se especifican roles, permitir acceso
    if (!roles || roles.length === 0) {
      return next();
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    if (!roles.includes(req.user.role)) {
      return ResponseHelper.forbidden(res, 'No tiene permisos para realizar esta acción.');
    }

    next();
  };
};
```

3. **authorizeAll**: Verifica que el usuario sea administrador
```javascript
const authorizeAll = (roles) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return ResponseHelper.unauthorized(res, 'Se requiere autenticación.');
    }

    // Si no se especifican roles, permitir acceso
    if (!roles || roles.length === 0) {
      return next();
    }

    // Para authorizeAll, el usuario debe tener el rol de administrador
    if (req.user.role !== 'admin') {
      return ResponseHelper.forbidden(res, 'Se requiere rol de administrador para esta acción.');
    }

    next();
  };
};
```

### 2.5 Protección de Rutas

Las rutas se protegen utilizando los middlewares de autenticación y autorización:

```javascript
// En usuario.routes.js
// Middleware de autenticación para todas las rutas
router.use(authenticate);

// Rutas CRUD básicas
router.get('/', authorize('admin'), asyncHandler(UsuarioController.getAll));
router.post('/', authorize('admin'), asyncHandler(UsuarioController.create));
router.get('/:id', authorize('admin'), asyncHandler(UsuarioController.getById));
router.put('/:id', authorize('admin'), asyncHandler(UsuarioController.update));
router.delete('/:id', authorize('admin'), asyncHandler(UsuarioController.delete));

// Ruta para subir imagen de perfil
router.post('/:id/upload-profile-image', authorize('admin'), uploadProfileImage, asyncHandler(UsuarioController.uploadProfileImage));
```

En este ejemplo, todas las rutas de gestión de usuarios requieren el rol `admin`.

## 3. Implementación en el Frontend

### 3.1 Interfaz de Usuario

La interfaz de usuario fue actualizada para incluir el rol en el modelo de datos:

```typescript
// En usuarios.component.ts
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  username: string;
  photopath: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}
```

### 3.2 Formulario de Usuario

El formulario de usuario incluye un campo para seleccionar el rol:

```typescript
// En usuarios.component.ts
// Available roles
roles = [
  { value: 'admin', label: 'Administrador' },
  { value: 'medico', label: 'Médico' },
  { value: 'laboratorio', label: 'Laboratorio' },
  { value: 'recepcion', label: 'Recepción' },
  { value: 'usuario', label: 'Usuario Básico' }
];

// Form for creating/editing users
userForm: FormGroup;

constructor(private api: ApiService, private fb: FormBuilder) {
  this.userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    usernick: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['usuario', [Validators.required]],
    photo_path: ['']
  });
}
```

En el HTML, se muestra un selector de roles:

```html
<!-- Role -->
<div>
  <label for="role" class="block mb-2 text-sm font-medium text-blue-gray-900">Rol</label>
  <select
    id="role"
    formControlName="role"
    class="bg-white border border-blue-gray-200 text-blue-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
    @for (role of roles; track role.value) {
      <option [value]="role.value">{{ role.label }}</option>
    }
  </select>
  @if (userForm.get('role')?.invalid && userForm.get('role')?.touched) {
    <p class="mt-1 text-sm text-red-600">
      El rol es obligatorio
    </p>
  }
</div>
```

### 3.3 Visualización de Roles

Los roles se muestran en la interfaz de usuario con colores diferentes según el rol:

```html
<td class="py-3 px-6 border-b border-green-gray-50">
  <span class="px-2 py-1 text-xs font-semibold rounded-full"
        [ngClass]="{
          'bg-blue-100 text-blue-800': usuario.role === 'admin',
          'bg-green-100 text-green-800': usuario.role === 'medico',
          'bg-purple-100 text-purple-800': usuario.role === 'laboratorio',
          'bg-yellow-100 text-yellow-800': usuario.role === 'recepcion',
          'bg-gray-100 text-gray-800': usuario.role === 'usuario' || !usuario.role
        }">
    {{ usuario.role || 'usuario' }}
  </span>
</td>
```

## 4. Uso del Sistema de Roles y Permisos

### 4.1 Protección de Rutas en el Backend

Para proteger una ruta con un rol específico:

```javascript
// Requiere rol 'admin'
router.get('/ruta-protegida', authenticate, authorize('admin'), controlador);

// Requiere cualquiera de estos roles
router.get('/otra-ruta', authenticate, authorizeAny(['admin', 'medico']), controlador);

// Requiere ser administrador
router.get('/ruta-admin', authenticate, authorizeAll(), controlador);
```

### 4.2 Verificación de Roles en el Frontend

Para mostrar u ocultar elementos según el rol del usuario:

```html
<!-- Solo mostrar si el usuario es admin -->
<div *ngIf="authService.hasRole('admin')">
  Contenido solo para administradores
</div>

<!-- Mostrar si el usuario tiene alguno de estos roles -->
<div *ngIf="authService.hasAnyRole(['admin', 'medico'])">
  Contenido para administradores y médicos
</div>
```

Para implementar estas funciones en el servicio de autenticación:

```typescript
// En auth.service.ts
hasRole(role: string): boolean {
  const user = this.getCurrentUser();
  return user && user.role === role;
}

hasAnyRole(roles: string[]): boolean {
  const user = this.getCurrentUser();
  return user && roles.includes(user.role);
}
```

## 5. Conclusión

La implementación de roles y permisos en el sistema proporciona un control de acceso granular a las diferentes funcionalidades. Los roles están definidos en el backend, se almacenan en la base de datos, se incluyen en los tokens JWT y se utilizan para proteger las rutas. En el frontend, los roles se muestran en la interfaz de usuario y se utilizan para controlar qué elementos se muestran a cada usuario.

Esta implementación permite una fácil extensión para añadir nuevos roles o permisos en el futuro, simplemente actualizando la constante `ROLES` y las reglas de autorización correspondientes.