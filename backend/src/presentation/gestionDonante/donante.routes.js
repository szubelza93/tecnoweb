const express = require('express');
const DonanteController = require('../../business//gestionDonante/DonanteController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateDonante } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('donantes.listar'), */ asyncHandler(DonanteController.getAll));
router.post('/', /* authorize('donantes.crear'), */ validateDonante, asyncHandler(DonanteController.create));

// Rutas específicas (deben ir ANTES de las rutas con parámetros)
router.get('/search/nombre', /* authorize('donantes.listar'), */ asyncHandler(DonanteController.searchByNombre));
router.get('/next-code', /* authorize('donantes.crear'), */ asyncHandler(DonanteController.getNextCode));

// Rutas con parámetros (deben ir DESPUÉS de las rutas específicas)
router.get('/:id', validateId, /* authorize('donantes.leer'), */ asyncHandler(DonanteController.getById));
router.put('/:id', validateId, /* authorize('donantes.actualizar'), */ validateDonante, asyncHandler(DonanteController.update));
router.delete('/:id', validateId, /* authorize('donantes.eliminar'), */ asyncHandler(DonanteController.delete));

module.exports = router; 