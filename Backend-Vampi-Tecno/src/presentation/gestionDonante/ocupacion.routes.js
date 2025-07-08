const express = require('express');
const OcupacionController = require('../../business//gestionDonante/OcupacionController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateOcupacion } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('donantes.listar'), */ asyncHandler(OcupacionController.getAll));
router.post('/', /* authorize('donantes.crear'), */ validateOcupacion, asyncHandler(OcupacionController.create));
router.get('/:id', validateId, /* authorize('donantes.leer'), */ asyncHandler(OcupacionController.getById));
router.put('/:id', validateId, /* authorize('donantes.actualizar'), */ validateOcupacion, asyncHandler(OcupacionController.update));
router.delete('/:id', validateId, /* authorize('donantes.eliminar'), */ asyncHandler(OcupacionController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('donantes.listar'), */ asyncHandler(OcupacionController.searchByDescripcion));

module.exports = router; 