# 🏗️ ARQUITECTURA DE 3 CAPAS - BACKEND

## 📋 DESCRIPCIÓN GENERAL

Este backend ha sido reorganizado siguiendo el **patrón de 3 capas** para mejorar la separación de responsabilidades, mantenibilidad y escalabilidad del código.

## 🎯 ESTRUCTURA DE 3 CAPAS

### **CAPA 1: PRESENTACIÓN (Routes)**
**Ubicación**: `src/routes/`
**Responsabilidad**: Manejo de HTTP, definición de endpoints, validación de entrada

```javascript
// src/routes/gestionDonante/donante.routes.js
const router = express.Router();

// SOLO PRESENTACIÓN - No lógica de negocio
router.get('/', asyncHandler(DonanteController.getAll));
router.post('/', asyncHandler(DonanteController.create));
router.get('/:id', asyncHandler(DonanteController.getById));
router.put('/:id', asyncHandler(DonanteController.update));
router.delete('/:id', asyncHandler(DonanteController.delete));
```

**Funciones**:
- ✅ Definir rutas HTTP
- ✅ Aplicar middlewares de validación
- ✅ Manejar autenticación/autorización
- ✅ Redirigir requests a controladores

### **CAPA 2: NEGOCIO (Controllers)**
**Ubicación**: `src/controllers/`
**Responsabilidad**: Lógica de negocio, validaciones, transformaciones de datos

```javascript
// src/controllers/gestionDonante/DonanteController.js
class DonanteController {
    static async getAll(req, res) {
        // LÓGICA DE NEGOCIO
        // - Validaciones de parámetros
        // - Reglas de negocio
        // - Transformaciones de datos
        // - Llamadas a la capa de datos
    }
}
```

**Funciones**:
- ✅ Validaciones de negocio
- ✅ Reglas de negocio complejas
- ✅ Transformación de datos para presentación
- ✅ Manejo de errores de negocio
- ✅ Lógica de paginación y filtros

### **CAPA 3: DATOS (Models)**
**Ubicación**: `src/models/`
**Responsabilidad**: Acceso a base de datos, consultas SQL

```javascript
// src/models/gestionDonante/Donante.js
class Donante {
    static async findAll(options = {}) {
        // SOLO ACCESO A DATOS
        // - Consultas SQL
        // - Parámetros de consulta
        // - Retorno de datos crudos
    }
}
```

**Funciones**:
- ✅ Consultas SQL
- ✅ Manejo de transacciones
- ✅ Mapeo de datos de BD
- ✅ Operaciones CRUD básicas

## 🔄 FLUJO DE DATOS

```
Frontend (Angular)
    ↓ HTTP Request
Routes (Presentación)
    ↓
Controllers (Negocio)
    ↓
Models (Datos)
    ↓
Database (PostgreSQL)
```

## 📊 COMPARACIÓN: ANTES vs DESPUÉS

| **Aspecto** | **MVC Anterior** | **3 Capas Actual** |
|-------------|------------------|-------------------|
| **Modelos** | Lógica de negocio + datos | Solo datos |
| **Controladores** | HTTP + lógica básica | Lógica de negocio completa |
| **Rutas** | Solo enrutamiento | Presentación + validación |
| **Separación** | Parcial | Clara y definida |

## 🎯 BENEFICIOS IMPLEMENTADOS

### **1. Separación Clara de Responsabilidades**
```javascript
// PRESENTACIÓN - Solo manejo HTTP
router.get('/donantes', DonanteController.getAll);

// NEGOCIO - Lógica compleja
static async getAll(req, res) {
    // Validaciones de negocio
    // Transformaciones
    // Reglas de negocio
}

// DATOS - Solo acceso a BD
static async findAll(options) {
    // Consultas SQL
    // Retorno de datos
}
```

### **2. Mantenibilidad Mejorada**
- **Cambios en BD**: Solo afectan modelos
- **Cambios en lógica**: Solo afectan controladores
- **Cambios en APIs**: Solo afectan rutas

### **3. Testabilidad**
```javascript
// Test de capa de datos
describe('Donante Model', () => {
    it('should find all donantes', async () => {
        const result = await Donante.findAll();
        expect(result).toBeDefined();
    });
});

// Test de capa de negocio
describe('Donante Controller', () => {
    it('should validate business rules', async () => {
        // Test de validaciones de negocio
    });
});
```

### **4. Reutilización de Código**
```javascript
// Un modelo puede ser usado por múltiples controladores
class DonanteController {
    static async getAll() { /* usa Donante.findAll() */ }
    static async getActivos() { /* usa Donante.findAll() */ }
    static async getEstadisticas() { /* usa Donante.count() */ }
}
```

## 🔧 IMPLEMENTACIÓN POR MÓDULOS

### **Módulo: Gestión de Donantes**
- ✅ **Modelo**: `src/models/gestionDonante/Donante.js`
- ✅ **Controlador**: `src/controllers/gestionDonante/DonanteController.js`
- ✅ **Rutas**: `src/routes/gestionDonante/donante.routes.js`

### **Próximos Módulos a Refactorizar**
- 🔄 Gestión de Extracción
- 🔄 Gestión de Laboratorio
- 🔄 Gestión de Producción
- 🔄 Gestión de Screening

## 📝 EJEMPLOS DE USO

### **Ejemplo 1: Obtener Donantes con Paginación**
```javascript
// Frontend hace request
GET /api/donantes?page=1&limit=10&search=Juan

// Routes (Presentación)
router.get('/', DonanteController.getAll);

// Controller (Negocio)
static async getAll(req, res) {
    const { page, limit, search } = req.query;
    // Validaciones de negocio
    const donantes = await Donante.findAll({ page, limit, search });
    // Transformación para presentación
    ResponseHelper.success(res, formattedDonantes);
}

// Model (Datos)
static async findAll(options) {
    // Consulta SQL con paginación
    return await pool.query(query, params);
}
```

### **Ejemplo 2: Crear Donante con Validaciones**
```javascript
// Frontend envía datos
POST /api/donantes
{
    "vdonNombre": "Juan",
    "vdonEdadDo": 25,
    "vdonDocide": "12345678"
}

// Controller (Negocio)
static async create(req, res) {
    const data = req.body;
    
    // Validaciones de negocio
    if (data.vdonEdadDo < 18) {
        throw new ValidationError('Debe ser mayor de edad');
    }
    
    // Verificar documento único
    const existing = await Donante.findByDocument(data.vdonDocide);
    if (existing) {
        throw new ValidationError('Documento ya existe');
    }
    
    // Crear donante
    const donante = await Donante.create(data);
    
    // Transformar respuesta
    ResponseHelper.created(res, formattedDonante);
}

// Model (Datos)
static async create(data) {
    return await pool.query('INSERT INTO vamDonante ...');
}
```

## 🚀 PRÓXIMOS PASOS

### **Fase 1: Completar Refactorización**
1. ✅ Refactorizar módulo de donantes
2. 🔄 Refactorizar módulo de extracción
3. 🔄 Refactorizar módulo de laboratorio
4. 🔄 Refactorizar módulo de producción
5. 🔄 Refactorizar módulo de screening

### **Fase 2: Mejoras Adicionales**
1. 🔄 Implementar DTOs para transformación de datos
2. 🔄 Agregar servicios para lógica compleja
3. 🔄 Implementar caché en capa de datos
4. 🔄 Agregar logging estructurado

### **Fase 3: Optimizaciones**
1. 🔄 Implementar transacciones en operaciones críticas
2. 🔄 Agregar índices de base de datos
3. 🔄 Optimizar consultas SQL
4. 🔄 Implementar rate limiting por endpoint

## ✅ COMPATIBILIDAD CON FRONTEND

**IMPORTANTE**: Esta refactorización mantiene **100% de compatibilidad** con el frontend Angular porque:

- ✅ Las rutas permanecen iguales
- ✅ Los endpoints mantienen la misma estructura
- ✅ Las respuestas JSON no cambian
- ✅ Los parámetros de entrada son los mismos
- ✅ Solo se reorganiza el código internamente

## 📚 REFERENCIAS

- [Patrón de 3 Capas](https://en.wikipedia.org/wiki/Multitier_architecture)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) 