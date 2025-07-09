const express = require('express');
const EquipoAlmacenController = require('../../business/gestionProduccion/EquipoAlmacenController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateEquipoAlmacen } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('equipos.listar'), */ asyncHandler(EquipoAlmacenController.getAll));
router.post('/', /* authorize('equipos.crear'), */ validateEquipoAlmacen, asyncHandler(EquipoAlmacenController.create));
router.get('/:id', validateId, /* authorize('equipos.leer'), */ asyncHandler(EquipoAlmacenController.getById));
router.put('/:id', validateId, /* authorize('equipos.actualizar'), */ validateEquipoAlmacen, asyncHandler(EquipoAlmacenController.update));
router.delete('/:id', validateId, /* authorize('equipos.eliminar'), */ asyncHandler(EquipoAlmacenController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('equipos.listar'), */ asyncHandler(EquipoAlmacenController.searchByDescripcion));

// Rutas específicas
router.get('/:id/almacenes', validateId, /* authorize('equipos.leer'), */ asyncHandler(EquipoAlmacenController.getAlmacenesByEquipo));

module.exports = router; 