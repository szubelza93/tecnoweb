const express = require('express');
const router = express.Router();
const CitaDonController = require('../../business/gestionScreening/CitaDonController');

// Rutas CRUD básicas
router.get('/', CitaDonController.getAllCitasDonantes);
router.get('/:vcitNroCit/:vdonCodDon/:vscrNroScr/:vcenCodCen', CitaDonController.getCitaDonanteById);
router.post('/', CitaDonController.createCitaDonante);
router.put('/:vcitNroCit/:vdonCodDon/:vscrNroScr/:vcenCodCen', CitaDonController.updateCitaDonante);
router.delete('/:vcitNroCit/:vdonCodDon/:vscrNroScr/:vcenCodCen', CitaDonController.deleteCitaDonante);

// Rutas de búsqueda especializada
router.get('/cita/:vcitNroCit', CitaDonController.getCitasDonantesByCita);
router.get('/donante/:vdonCodDon', CitaDonController.getCitasDonantesByDonante);
router.get('/screening/:vscrNroScr/:vcenCodCen', CitaDonController.getCitasDonantesByScreening);
router.get('/resultado/:vcidResult', CitaDonController.getCitasDonantesByResultado);
router.get('/estado/:vcidSwCita', CitaDonController.getCitasDonantesByEstado);

// Rutas con detalles
router.get('/detalles', CitaDonController.getCitasDonantesWithDetails);

// Rutas de estadísticas
router.get('/cita/:vcitNroCit/count', CitaDonController.countCitasDonantesByCita);
router.get('/donante/:vdonCodDon/count', CitaDonController.countCitasDonantesByDonante);
router.get('/estadisticas', CitaDonController.getEstadisticas);

module.exports = router; 