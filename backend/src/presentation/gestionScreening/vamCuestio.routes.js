const express = require('express');
const router = express.Router();
const VamCuestioController = require('../../business/gestionScreening/VamCuestioController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { validateCuestio } = require('../../shared/middlewares/validation');

// Listar todos
router.get('/', asyncHandler(VamCuestioController.listar));
// Obtener uno por id
router.get('/:vcuenropre', asyncHandler(VamCuestioController.obtener));
// Crear nuevo
router.post('/', validateCuestio, asyncHandler(VamCuestioController.crear));
// Actualizar
router.put('/:vcuenropre', asyncHandler(VamCuestioController.actualizar));
// Eliminar
router.delete('/:vcuenropre', asyncHandler(VamCuestioController.eliminar));

module.exports = router;
