const express = require('express');
const TipoDocumentoController = require('../../business//gestionDonante/TipoDocumentoController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('donantes.listar'), */ asyncHandler(TipoDocumentoController.getAll));
router.post('/', /* authorize('donantes.crear'), */ asyncHandler(TipoDocumentoController.create));
router.get('/:id', validateId, /* authorize('donantes.leer'), */ asyncHandler(TipoDocumentoController.getById));
router.put('/:id', validateId, /* authorize('donantes.actualizar'), */ asyncHandler(TipoDocumentoController.update));
router.delete('/:id', validateId, /* authorize('donantes.eliminar'), */ asyncHandler(TipoDocumentoController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('donantes.listar'), */ asyncHandler(TipoDocumentoController.searchByDescripcion));

module.exports = router;