const express = require('express');
const SerCrviController = require('../../business/gestionExtraccion/SerCrviController');
const router = express.Router();

// Obtener todos los servicios de criovinificación
router.get('/', SerCrviController.findAll);

// Obtener un servicio de criovinificación por ID
router.get('/:id', SerCrviController.findById);

// Crear un nuevo servicio de criovinificación
router.post('/', SerCrviController.create);

// Actualizar un servicio de criovinificación
router.put('/:id', SerCrviController.update);

// Eliminar un servicio de criovinificación
router.delete('/:id', SerCrviController.delete);

// Buscar servicios por extracción
router.get('/extraccion/:extraccionId', SerCrviController.findByExtraccion);

// Buscar servicios por fecha
router.get('/fecha/buscar', SerCrviController.findByFecha);

// Buscar servicios por código de criovinificación
router.get('/codigo/:codigo', SerCrviController.findByCodigoCriovinificacion);

// Buscar servicios por fracción
router.get('/fraccion/:fraccion', SerCrviController.findByFraccion);

// Buscar servicios por responsable
router.get('/responsable/:responsableId', SerCrviController.findByResponsable);

// Buscar servicios por estado de liberación
router.get('/estado-liberacion/:estado', SerCrviController.findByEstadoLibreacion);

// Obtener estadísticas de servicios de criovinificación
router.get('/estadisticas/totales', SerCrviController.getEstadisticas);

// Obtener servicios por mes
router.get('/estadisticas/por-mes', SerCrviController.getServiciosPorMes);

module.exports = router; 