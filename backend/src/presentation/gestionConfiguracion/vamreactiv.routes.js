const express = require('express');
const router = express.Router();
const VamreactivController = require('../../business/gestionConfiguracion/VamreactivController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamreactivController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamreactivController.obtener));
// Crear nuevo
router.post('/', asyncHandler(VamreactivController.crear));
// Actualizar
router.put('/:id', validateId, asyncHandler(VamreactivController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamreactivController.eliminar));

module.exports = router;
