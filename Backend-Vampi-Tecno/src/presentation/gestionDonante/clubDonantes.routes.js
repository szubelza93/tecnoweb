const express = require('express');
const ClubDonantesController = require('../../business//gestionDonante/ClubDonantesController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('donantes.listar'), */ asyncHandler(ClubDonantesController.getAll));
router.post('/', /* authorize('donantes.crear'), */ asyncHandler(ClubDonantesController.create));
router.get('/:id', validateId, /* authorize('donantes.leer'), */ asyncHandler(ClubDonantesController.getById));
router.put('/:id', validateId, /* authorize('donantes.actualizar'), */ asyncHandler(ClubDonantesController.update));
router.delete('/:id', validateId, /* authorize('donantes.eliminar'), */ asyncHandler(ClubDonantesController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('donantes.listar'), */ asyncHandler(ClubDonantesController.searchByDescripcion));
router.get('/search/telefono', /* authorize('donantes.listar'), */ asyncHandler(ClubDonantesController.searchByTelefono));

module.exports = router;