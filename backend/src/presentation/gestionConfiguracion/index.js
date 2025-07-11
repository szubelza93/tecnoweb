const express = require('express');
const vamtipocenRoutes = require('./vamtipocen.routes');
const vamcentdonRoutes = require('./vamcentdon.routes');

const router = express.Router();

router.use('/vamtipocen', vamtipocenRoutes);
router.use('/vamcentdon', vamcentdonRoutes);

module.exports = {
  vamtipocenRoutes,
  vamcentdonRoutes
};
