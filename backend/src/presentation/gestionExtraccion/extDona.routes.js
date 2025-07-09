const express = require('express');
const ExtDonaController = require('../../business/gestionExtraccion/ExtDonaController');
const router = express.Router();

// Obtener todas las extracciones de donantes
router.get('/', ExtDonaController.findAll);

// Obtener una extracción de donante por ID
router.get('/:id', ExtDonaController.findById);

// Crear una nueva extracción de donante
router.post('/', ExtDonaController.create);

// Actualizar una extracción de donante
router.put('/:id', ExtDonaController.update);

// Eliminar una extracción de donante
router.delete('/:id', ExtDonaController.delete);

// Buscar extracciones por screening
router.get('/screening/:screeningNro/:centroCod', ExtDonaController.findByScreening);

// Buscar extracciones por bolsa
router.get('/bolsa/:bolsaCod', ExtDonaController.findByBolsa);

// Buscar extracciones por fecha
router.get('/fecha/buscar', ExtDonaController.findByFecha);

// Buscar extracciones por resultado
router.get('/resultado/:resultado', ExtDonaController.findByResultado);

// Buscar extracciones por estado
router.get('/estado/:estado', ExtDonaController.findByEstado);

// Obtener estadísticas de extracciones
router.get('/estadisticas/totales', ExtDonaController.getEstadisticas);

module.exports = router; 