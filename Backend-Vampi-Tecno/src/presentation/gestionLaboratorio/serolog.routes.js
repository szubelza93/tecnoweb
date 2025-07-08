const express = require('express');
const SerologController = require('../../business/gestionLaboratorio/SerologController');
const router = express.Router();

// Obtener todas las serologías
router.get('/', SerologController.getAll);

// Obtener una serología por ID
router.get('/:id', SerologController.getById);

// Crear una nueva serología
router.post('/', SerologController.create);

// Actualizar una serología
router.put('/:id', SerologController.update);

// Eliminar una serología
router.delete('/:id', SerologController.delete);

// Obtener serologías por extracción
router.get('/extraccion/:vexdNroExd', SerologController.getByExtraccion);

// Obtener serologías por prueba
router.get('/prueba/:vpruCodPru', SerologController.getByPrueba);

module.exports = router; 