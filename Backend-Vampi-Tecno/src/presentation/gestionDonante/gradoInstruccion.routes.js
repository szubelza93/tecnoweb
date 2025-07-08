const express = require('express');
const GradoInstruccionController = require('../../business//gestionDonante/GradoInstruccionController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateGradoInstruccion } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('donantes.listar'), */ asyncHandler(GradoInstruccionController.getAll));
router.post('/', /* authorize('donantes.crear'), */ validateGradoInstruccion, asyncHandler(GradoInstruccionController.create));
router.get('/:id', validateId, /* authorize('donantes.leer'), */ asyncHandler(GradoInstruccionController.getById));
router.put('/:id', validateId, /* authorize('donantes.actualizar'), */ validateGradoInstruccion, asyncHandler(GradoInstruccionController.update));
router.delete('/:id', validateId, /* authorize('donantes.eliminar'), */ asyncHandler(GradoInstruccionController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('donantes.listar'), */ asyncHandler(GradoInstruccionController.searchByDescripcion));

module.exports = router; 