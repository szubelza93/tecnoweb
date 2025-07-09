const express = require('express');
const ReaccioController = require('../../business/gestionExtraccion/ReaccioController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateReaccio } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('extraccion.listar'), */ asyncHandler(ReaccioController.getAll));
router.post('/', validateReaccio, /* authorize('extraccion.crear'), */ asyncHandler(ReaccioController.create));
router.get('/:id', validateId, /* authorize('extraccion.leer'), */ asyncHandler(ReaccioController.getById));
router.put('/:id', validateId, validateReaccio, /* authorize('extraccion.actualizar'), */ asyncHandler(ReaccioController.update));
router.delete('/:id', validateId, /* authorize('extraccion.eliminar'), */ asyncHandler(ReaccioController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('extraccion.listar'), */ asyncHandler(ReaccioController.searchByDescripcion));
router.get('/search/caracteristica', /* authorize('extraccion.listar'), */ asyncHandler(ReaccioController.searchByCaracteristica));

module.exports = router; 