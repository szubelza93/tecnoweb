const express = require('express');
const router = express.Router();
const CitaciController = require('../../business/gestionScreening/CitaciController');

// Rutas CRUD básicas
router.get('/', CitaciController.getAllCitas);
router.get('/:vcitNroCit', CitaciController.getCitaById);
router.post('/', CitaciController.createCita);
router.put('/:vcitNroCit', CitaciController.updateCita);
router.delete('/:vcitNroCit', CitaciController.deleteCita);

// Rutas de búsqueda especializada
router.get('/unidad/:vuntCodUnt', CitaciController.getCitasByUnidad);
router.get('/paciente/:vcitNomPac', CitaciController.getCitasByPaciente);
router.get('/grupo-sanguineo/:vgrsCodGrs', CitaciController.getCitasByGrupoSanguineo);
router.get('/fecha/:fecha', CitaciController.getCitasByFecha);
router.get('/rango-fechas/:fechaInicio/:fechaFin', CitaciController.getCitasByRangoFechas);

// Rutas de estadísticas
router.get('/unidad/:vuntCodUnt/count', CitaciController.countCitasByUnidad);
router.get('/estadisticas', CitaciController.getEstadisticas);

module.exports = router; 