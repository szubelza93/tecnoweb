const express = require('express');
const GrupSanController = require('../../business//gestionScreening/GrupSanController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId, validateGrupSan } = require('../../shared/middlewares/validation');
const { validateGrupoSanguineoSearch, sanitizeGrupSanData } = require('../../shared/middlewares/screeningMiddleware');
const { authenticate, authorize } = require('../../shared/middlewares/auth');

const router = express.Router();

// Rutas CRUD básicas
router.get('/', asyncHandler(GrupSanController.getAll));
router.post('/', sanitizeGrupSanData, validateGrupSan, asyncHandler(GrupSanController.create));
router.get('/:id', validateId, asyncHandler(GrupSanController.getById));
router.put('/:id', validateId, sanitizeGrupSanData, validateGrupSan, asyncHandler(GrupSanController.update));
router.delete('/:id', validateId, asyncHandler(GrupSanController.delete));

// Rutas de búsqueda
router.get('/search/grupo-abo', validateGrupoSanguineoSearch, asyncHandler(GrupSanController.searchByGrupoABO));
router.get('/search/tipo-rh', validateGrupoSanguineoSearch, asyncHandler(GrupSanController.searchByTipoRH));
router.get('/search/rango-estatura', validateGrupoSanguineoSearch, asyncHandler(GrupSanController.searchByRangoEstatura));

module.exports = router; 