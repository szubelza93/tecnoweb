const express = require('express');
const router = express.Router();
const VamtipountController = require('../../business/gestionConfiguracion/VamtipountController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamtipountController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamtipountController.obtener));
// Crear nuevo
router.post('/', asyncHandler(VamtipountController.crear));
// Actualizar
router.put('/:id', validateId, asyncHandler(VamtipountController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamtipountController.eliminar));

module.exports = router;
