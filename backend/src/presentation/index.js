const express = require('express');
const { 
  donanteRoutes, ocupacionRoutes, gradoInstruccionRoutes, lugarNacimientoRoutes, clubDonantesRoutes, zonaDireccionRoutes, 
  tipoDocumentoRoutes } = require('./gestionDonante');

const { tipoBolRoutes, bolsaHeRoutes, reaccioRoutes, extDonaRoutes, serCrviRoutes } = require('./gestionExtraccion');
const { almacenRoutes, equipoAlmacenRoutes, vamObsequiRoutes, vamRefrigeRoutes } = require('./gestionProduccion');
const { grupSanRoutes, tipoDonRoutes, screeniRoutes, cuesNroRoutes, cuestioRoutes, resPregRoutes, citaciRoutes, citaDonRoutes } = require('./gestionScreening');
const { pruebasRoutes, serologRoutes } = require('./gestionLaboratorio');
const { usuarioRoutes, authRoutes } = require('./gestionUsuario');

const router = express.Router();

router.use('/donantes', donanteRoutes);
router.use('/ocupaciones', ocupacionRoutes);
router.use('/grados-instruccion', gradoInstruccionRoutes);
router.use('/lugares-nacimiento', lugarNacimientoRoutes);
router.use('/clubs-donantes', clubDonantesRoutes);
router.use('/zonas-direccion', zonaDireccionRoutes);
router.use('/tipos-documento', tipoDocumentoRoutes);

// Rutas de gestión de extracción
router.use('/tipos-bolsa', tipoBolRoutes);
router.use('/bolsas-hematologicas', bolsaHeRoutes);
router.use('/reacciones', reaccioRoutes);
router.use('/extracciones-donantes', extDonaRoutes);
router.use('/servicios-criovinificacion', serCrviRoutes);

// Rutas de gestión de producción
router.use('/almacenes', almacenRoutes);
router.use('/equipos-almacen', equipoAlmacenRoutes);
router.use('/obsequios', vamObsequiRoutes);
router.use('/refrigeradores', vamRefrigeRoutes);

// Rutas de gestión de laboratorio
router.use('/pruebas', pruebasRoutes);
router.use('/serologias', serologRoutes);

// Rutas de gestión de screening
router.use('/grupos-sanguineos', grupSanRoutes);
router.use('/tipos-donacion', tipoDonRoutes);
router.use('/screenings', screeniRoutes);
router.use('/cuestionarios-numeros', cuesNroRoutes);
router.use('/cuestionarios', cuestioRoutes);
router.use('/respuestas-preguntas', resPregRoutes);
router.use('/citas', citaciRoutes);
router.use('/citas-donantes', citaDonRoutes);

// Rutas de gestión de usuarios
router.use('/usuarios', usuarioRoutes);
router.use('/auth', authRoutes);

module.exports = router;
