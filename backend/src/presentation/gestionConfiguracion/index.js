const express = require('express');
const vamtipocenRoutes = require('./vamtipocen.routes');
const vamcentdonRoutes = require('./vamcentdon.routes');
const vamtipountRoutes = require('./vamtipount.routes');
const vamunitranRoutes = require('./vamunitran.routes');
const vamanticueRoutes = require('./vamanticue.routes');
const vamreactivRoutes = require('./vamreactiv.routes');

const router = express.Router();

router.use('/vamtipocen', vamtipocenRoutes);
router.use('/vamtipount', vamtipountRoutes);
router.use('/vamunitran', vamunitranRoutes);
router.use('/vamcentdon', vamcentdonRoutes);
router.use('/vamanticue', vamanticueRoutes);
router.use('/vamreactiv', vamreactivRoutes);

module.exports = {
  vamtipocenRoutes,
  vamcentdonRoutes,
  vamtipountRoutes,
  vamunitranRoutes,
  vamanticueRoutes,
  vamreactivRoutes
};
