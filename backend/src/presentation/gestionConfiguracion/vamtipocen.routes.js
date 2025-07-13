const express = require('express');
const router = express.Router();
const VamtipocenController = require('../../business/gestionConfiguracion/VamtipocenController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamtipocenController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamtipocenController.obtener));
// Crear nuevo
router.post('/', asyncHandler(VamtipocenController.crear));
// Actualizar
router.put('/:id', validateId, asyncHandler(VamtipocenController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamtipocenController.eliminar));

module.exports = router;
