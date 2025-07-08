const express = require('express');
const CuestioController = require('../../business/gestionScreening/CuestioController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId, validateCuestio } = require('../../shared/middlewares/validation');

const router = express.Router();

// Rutas CRUD básicas
router.get('/', asyncHandler(CuestioController.getAll));
router.post('/', validateCuestio, asyncHandler(CuestioController.create));
router.get('/:numeroCue/:numeroPre', validateId, asyncHandler(CuestioController.getById));
router.put('/:numeroCue/:numeroPre', validateId, validateCuestio, asyncHandler(CuestioController.update));
router.delete('/:numeroCue/:numeroPre', validateId, asyncHandler(CuestioController.delete));

// Rutas de búsqueda
router.get('/search/cuestionario', asyncHandler(CuestioController.searchByCuestionario));
router.get('/search/pregunta', asyncHandler(CuestioController.searchByPregunta));
router.get('/search/respuesta', asyncHandler(CuestioController.searchByRespuesta));

module.exports = router; 