const express = require('express');
const almacenRoutes = require('./almacen.routes');
const equipoAlmacenRoutes = require('./equipoAlmacen.routes');

const router = express.Router();

// Rutas de gestión de producción
router.use('/equipos-almacen', equipoAlmacenRoutes);
router.use('/almacenes', almacenRoutes);

module.exports = {
  almacenRoutes,
  equipoAlmacenRoutes
}; 