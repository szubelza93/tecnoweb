const express = require('express');
const AlmacenController = require('../../business//gestionProduccion/AlmacenController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateAlmacen } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('almacenes.listar'), */ asyncHandler(AlmacenController.getAll));
router.post('/', /* authorize('almacenes.crear'), */ validateAlmacen, asyncHandler(AlmacenController.create));
router.get('/:id', validateId, /* authorize('almacenes.leer'), */ asyncHandler(AlmacenController.getById));
router.put('/:id', validateId, /* authorize('almacenes.actualizar'), */ validateAlmacen, asyncHandler(AlmacenController.update));
router.delete('/:id', validateId, /* authorize('almacenes.eliminar'), */ asyncHandler(AlmacenController.delete));

// Rutas específicas
router.get('/equipo/:equipoId', /* authorize('almacenes.listar'), */ asyncHandler(AlmacenController.getByEquipo));
router.get('/equipo/:equipoId/disponibilidad', /* authorize('almacenes.listar'), */ asyncHandler(AlmacenController.getDisponibilidad));

module.exports = router; 