const express = require('express');
const router = express.Router();
const VamcentdonController = require('../../business/gestionConfiguracion/VamcentdonController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamcentdonController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamcentdonController.obtener));
// Crear nuevo
router.post('/', asyncHandler(VamcentdonController.crear));
// Actualizar
router.put('/:id', validateId, asyncHandler(VamcentdonController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamcentdonController.eliminar));

module.exports = router;
