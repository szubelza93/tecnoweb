# Página de Tipos de Donación (VamTipoDon)

Esta sección permite gestionar los tipos de donación del banco de sangre.

## Funcionalidades
- Listar tipos de donación
- Buscar por descripción
- Crear nuevo tipo de donación
- Editar tipo de donación existente
- Eliminar tipo de donación
- Paginación
- Validaciones de formulario

## Archivos principales
- `vamTipoDon.component.ts` / `.html` / `.css`: Listado y acciones CRUD
- `vamTipoDon-form.component.ts` / `.html` / `.css`: Formulario de alta/edición
- `vamTipoDon.interface.ts`: Interfaz de datos
- `vamTipoDon.service.ts`: Servicio de comunicación con el backend

## Notas
- El campo `vtdnCodTdn` es obligatorio y debe ser único.
- El backend debe exponer las rutas `/api/tipos-donacion` para funcionar correctamente. 