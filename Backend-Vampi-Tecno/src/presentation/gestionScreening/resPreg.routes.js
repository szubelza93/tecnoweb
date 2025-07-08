const express = require('express');
const ResPregController = require('../../business/gestionScreening/ResPregController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId, validateResPreg } = require('../../shared/middlewares/validation');

const router = express.Router();

// Rutas CRUD básicas
router.get('/', asyncHandler(ResPregController.getAll));
router.post('/', validateResPreg, asyncHandler(ResPregController.create));
router.get('/:numeroScr/:centro/:numeroCue/:numeroPre', validateId, asyncHandler(ResPregController.getById));
router.put('/:numeroScr/:centro/:numeroCue/:numeroPre', validateId, validateResPreg, asyncHandler(ResPregController.update));
router.delete('/:numeroScr/:centro/:numeroCue/:numeroPre', validateId, asyncHandler(ResPregController.delete));

// Rutas de búsqueda
router.get('/search/screening', asyncHandler(ResPregController.searchByScreening));
router.get('/search/cuestionario', asyncHandler(ResPregController.searchByCuestionario));
router.get('/search/respuesta', asyncHandler(ResPregController.searchByRespuesta));

// Ruta especial para estadísticas
router.get('/estadisticas/info', asyncHandler(ResPregController.getEstadisticas));

module.exports = router; 