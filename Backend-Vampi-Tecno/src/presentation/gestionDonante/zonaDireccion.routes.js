const express = require('express');
const ZonaDireccionController = require('../../business//gestionDonante/ZonaDireccionController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId } = require('../../shared/middlewares/validation');

const router = express.Router();

// Rutas CRUD básicas
router.get('/', /* authorize('donantes.listar'), */ asyncHandler(ZonaDireccionController.getAll));
router.post('/', /* authorize('donantes.crear'), */ asyncHandler(ZonaDireccionController.create));
router.get('/:id', validateId, /* authorize('donantes.leer'), */ asyncHandler(ZonaDireccionController.getById));
router.put('/:id', validateId, /* authorize('donantes.actualizar'), */ asyncHandler(ZonaDireccionController.update));
router.delete('/:id', validateId, /* authorize('donantes.eliminar'), */ asyncHandler(ZonaDireccionController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('donantes.listar'), */ asyncHandler(ZonaDireccionController.searchByDescripcion));
router.get('/search/lugar', /* authorize('donantes.listar'), */ asyncHandler(ZonaDireccionController.searchByLugar));

// Rutas de estadísticas y reportes

router.get('/count', /* authorize('donantes.listar'), */ asyncHandler(ZonaDireccionController.count));

router.get('/estadisticas', /* authorize('donantes.listar'), */ asyncHandler(ZonaDireccionController.getEstadisticas));

router.get('/zonas-con-donantes', /* authorize('donantes.listar'), */ asyncHandler(ZonaDireccionController.getZonasConDonantes));

router.get('/zonas-vacias', /* authorize('donantes.listar'), */ asyncHandler(ZonaDireccionController.getZonasVacias));

module.exports = router;