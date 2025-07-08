const express = require('express');
const CuesNroController = require('../../business/gestionScreening/CuesNroController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId, validateCuesNro } = require('../../shared/middlewares/validation');

const router = express.Router();

// Rutas CRUD básicas
router.get('/', asyncHandler(CuesNroController.getAll));
router.post('/', validateCuesNro, asyncHandler(CuesNroController.create));
router.get('/:id', validateId, asyncHandler(CuesNroController.getById));
router.put('/:id', validateId, validateCuesNro, asyncHandler(CuesNroController.update));
router.delete('/:id', validateId, asyncHandler(CuesNroController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', asyncHandler(CuesNroController.searchByDescripcion));

module.exports = router; 