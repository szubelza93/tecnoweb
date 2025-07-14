const express = require('express');
const router = express.Router();
const VamunitranController = require('../../business/gestionConfiguracion/VamunitranController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamunitranController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamunitranController.obtener));
// Crear nuevo
router.post('/', asyncHandler(VamunitranController.crear));
// Actualizar
router.put('/:id', validateId, asyncHandler(VamunitranController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamunitranController.eliminar));

module.exports = router;
