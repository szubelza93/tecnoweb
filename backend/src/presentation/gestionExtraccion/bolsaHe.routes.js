const express = require('express');
const BolsaHeController = require('../../business//gestionExtraccion/BolsaHeController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateBolsaHe } = require('../../shared/middlewares/validation');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('extraccion.listar'), */ asyncHandler(BolsaHeController.getAll));
router.post('/', validateBolsaHe, /* authorize('extraccion.crear'), */ asyncHandler(BolsaHeController.create));
router.get('/:id', validateId, /*
     authorize('extraccion.leer'), */ asyncHandler(BolsaHeController.getById));
router.put('/:id', validateId, validateBolsaHe, /* authorize('extraccion.actualizar'), */ asyncHandler(BolsaHeController.update));
router.delete('/:id', validateId, /* authorize('extraccion.eliminar'), */ asyncHandler(BolsaHeController.delete));

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('extraccion.listar'), */ asyncHandler(BolsaHeController.searchByDescripcion));
router.get('/search/tipo', /* authorize('extraccion.listar'), */ asyncHandler(BolsaHeController.searchByTipo));
router.get('/search/marca', /* authorize('extraccion.listar'), */ asyncHandler(BolsaHeController.searchByMarca));
router.get('/search/cantidad', /* authorize('extraccion.listar'), */ asyncHandler(BolsaHeController.searchByCantidad));

// Ruta especial para información de stock
router.get('/stock/info', /* authorize('extraccion.listar'), */ asyncHandler(BolsaHeController.getStockInfo));

module.exports = router; 