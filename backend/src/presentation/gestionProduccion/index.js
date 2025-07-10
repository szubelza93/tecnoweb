const express = require('express');
const almacenRoutes = require('./almacen.routes');
const equipoAlmacenRoutes = require('./equipoAlmacen.routes');
const vamObsequiRoutes = require('./vamObsequi.routes');
const vamRefrigeRoutes = require('./vamRefrige.routes');

const router = express.Router();

// Rutas de gestión de producción
router.use('/equipos-almacen', equipoAlmacenRoutes);
router.use('/almacenes', almacenRoutes);
router.use('/obsequios', vamObsequiRoutes);
router.use('/refrigeradores', vamRefrigeRoutes);

module.exports = {
  almacenRoutes,
  equipoAlmacenRoutes,
  vamObsequiRoutes,
  vamRefrigeRoutes
}; 