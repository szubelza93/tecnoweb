const express = require('express');
const router = express.Router();
const VamanticueController = require('../../business/gestionConfiguracion/VamanticueController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateId } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamanticueController.listar));
// Obtener uno por ID
router.get('/:id', validateId, asyncHandler(VamanticueController.obtener));
// Crear nuevo
router.post('/', asyncHandler(VamanticueController.crear));
// Actualizar
router.put('/:id', validateId, asyncHandler(VamanticueController.actualizar));
// Eliminar
router.delete('/:id', validateId, asyncHandler(VamanticueController.eliminar));

module.exports = router;
