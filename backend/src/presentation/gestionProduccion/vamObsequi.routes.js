const express = require('express');
const router = express.Router();
const VamObsequiController = require('../../business/gestionProduccion/VamObsequiController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamObsequiController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamObsequiController.obtener));
// Crear nuevo
router.post('/', /* validateObsequi, */ asyncHandler(VamObsequiController.crear));
// Actualizar
router.put('/:id', validateId, /* validateObsequi, */ asyncHandler(VamObsequiController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamObsequiController.eliminar));

module.exports = router; 