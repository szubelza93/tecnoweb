const express = require('express');
const router = express.Router();
const VamRefrigeController = require('../../business/gestionProduccion/VamRefrigeController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamRefrigeController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamRefrigeController.obtener));
// Crear nuevo
router.post('/', /* validateRefrige, */ asyncHandler(VamRefrigeController.crear));
// Actualizar
router.put('/:id', validateId, /* validateRefrige, */ asyncHandler(VamRefrigeController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamRefrigeController.eliminar));

module.exports = router; 