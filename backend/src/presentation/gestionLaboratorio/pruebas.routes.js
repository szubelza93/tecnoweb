const express = require('express');
const PruebasController = require('../../business//gestionLaboratorio/PruebasController');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const router = express.Router();

// Obtener todas las pruebas
router.get('/', PruebasController.getAll);

// Obtener una prueba por ID
router.get('/:id', PruebasController.getById);

// Crear una nueva prueba
router.post('/', PruebasController.create);

// Actualizar una prueba
router.put('/:id', PruebasController.update);

// Eliminar una prueba
router.delete('/:id', PruebasController.delete);


module.exports = router; 