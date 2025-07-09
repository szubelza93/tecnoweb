const express = require('express');
const TipoDonController = require('../../business//gestionScreening/TipoDonController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId, validateTipoDon } = require('../../shared/middlewares/validation');
const { validateTipoDonacionSearch, sanitizeTipoDonData } = require('../../shared/middlewares/screeningMiddleware');
const { authenticate, authorize } = require('../../shared/middlewares/auth');

const router = express.Router();

// Rutas CRUD básicas
router.get('/', asyncHandler(TipoDonController.getAll));
router.post('/', sanitizeTipoDonData, validateTipoDon, asyncHandler(TipoDonController.create));
router.get('/:id', validateId, asyncHandler(TipoDonController.getById));
router.put('/:id', validateId, sanitizeTipoDonData, validateTipoDon, asyncHandler(TipoDonController.update));
router.delete('/:id', validateId, asyncHandler(TipoDonController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', validateTipoDonacionSearch, asyncHandler(TipoDonController.searchByDescripcion));

module.exports = router; 