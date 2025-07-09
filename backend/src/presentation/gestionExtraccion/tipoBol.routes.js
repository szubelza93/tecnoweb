const express = require('express');
const TipoBolController = require('../../business//gestionExtraccion/TipoBolController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { validateId, validateTipoBol } = require('../../shared/middlewares/validation');
const { 
  validateNivelBolsa, 
  validateCodigoUnico, 
  validateTipoBolsaExists, 
  sanitizeTipoBolData 
} = require('../../shared/middlewares/extraccionMiddleware');

const router = express.Router();

// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('extraccion.listar'), */ asyncHandler(TipoBolController.getAll));
router.post('/', 
  sanitizeTipoBolData, 
  validateTipoBol, 
  validateNivelBolsa, 
  validateCodigoUnico, 
  /* authorize('extraccion.crear'), */ 
  asyncHandler(TipoBolController.create)
);
router.get('/:id', validateId, /* authorize('extraccion.leer'), */ asyncHandler(TipoBolController.getById));
router.put('/:id', 
  validateId, 
  validateTipoBolsaExists, 
  sanitizeTipoBolData, 
  validateTipoBol, 
  validateNivelBolsa, 
  /* authorize('extraccion.actualizar'), */ 
  asyncHandler(TipoBolController.update)
);
router.delete('/:id', 
  validateId, 
  validateTipoBolsaExists, 
  /* authorize('extraccion.eliminar'), */ 
  asyncHandler(TipoBolController.delete)
);

// Rutas de búsqueda
router.get('/search/descripcion', /* authorize('extraccion.listar'), */ asyncHandler(TipoBolController.searchByDescripcion));
router.get('/search/caracteristica', /* authorize('extraccion.listar'), */ asyncHandler(TipoBolController.searchByCaracteristica));
router.get('/search/nivel', /* authorize('extraccion.listar'), */ asyncHandler(TipoBolController.searchByNivel));

module.exports = router; 