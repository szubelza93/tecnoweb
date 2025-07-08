const express = require('express');
const ScreeniController = require('../../business/gestionScreening/ScreeniController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId, validateScreeni } = require('../../shared/middlewares/validation');
const { validateScreeniSearch, sanitizeScreeniData } = require('../../shared/middlewares/screeningMiddleware');

const router = express.Router();

// Rutas CRUD básicas
router.get('/', asyncHandler(ScreeniController.getAll));
router.post('/', sanitizeScreeniData, validateScreeni, asyncHandler(ScreeniController.create));
router.get('/:numeroScr/:centro', validateId, asyncHandler(ScreeniController.getById));
router.put('/:numeroScr/:centro', validateId, sanitizeScreeniData, validateScreeni, asyncHandler(ScreeniController.update));
router.delete('/:numeroScr/:centro', validateId, asyncHandler(ScreeniController.delete));

// Rutas de búsqueda
router.get('/search/donante', validateScreeniSearch, asyncHandler(ScreeniController.searchByDonante));
router.get('/search/centro', validateScreeniSearch, asyncHandler(ScreeniController.searchByCentro));
router.get('/search/fecha', validateScreeniSearch, asyncHandler(ScreeniController.searchByFecha));
router.get('/search/etiqueta', validateScreeniSearch, asyncHandler(ScreeniController.searchByEtiqueta));
router.get('/search/grupo-sanguineo', validateScreeniSearch, asyncHandler(ScreeniController.searchByGrupoSanguineo));

// Ruta especial para estadísticas
router.get('/estadisticas/info', asyncHandler(ScreeniController.getEstadisticas));

module.exports = router; 