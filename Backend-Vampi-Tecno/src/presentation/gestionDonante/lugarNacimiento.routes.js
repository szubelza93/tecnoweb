const express = require('express');
const LugarNacimientoController = require('../../business//gestionDonante/LugarNacimientoController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateLugarNacimiento, validateLugarNacimientoCreate } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('donantes.listar'), */ asyncHandler(LugarNacimientoController.getAll));
router.post('/', validateLugarNacimientoCreate, /* authorize('donantes.crear'), */ asyncHandler(LugarNacimientoController.create));
router.get('/:id', validateId, /* authorize('donantes.leer'), */ asyncHandler(LugarNacimientoController.getById));
router.put('/:id', validateId, validateLugarNacimiento, /* authorize('donantes.actualizar'), */ asyncHandler(LugarNacimientoController.update));
router.delete('/:id', validateId, /* authorize('donantes.eliminar'), */ asyncHandler(LugarNacimientoController.delete));

// Rutas de búsqueda
router.get('/search/ciudad', /* authorize('donantes.listar'), */ asyncHandler(LugarNacimientoController.searchByCiudad));
router.get('/search/provincia', /* authorize('donantes.listar'), */ asyncHandler(LugarNacimientoController.searchByProvincia));
router.get('/search/pais', /* authorize('donantes.listar'), */ asyncHandler(LugarNacimientoController.searchByPais));

module.exports = router; 