const express = require('express');
const { AuthController } = require('../../business/gestionUsuario');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate } = require('../../shared/middlewares/auth');

const router = express.Router();

// Rutas públicas (no requieren autenticación)
router.post('/login', asyncHandler(AuthController.login));
router.post('/register', asyncHandler(AuthController.register));
router.post('/refresh-token', asyncHandler(AuthController.refreshToken));
router.post('/logout', asyncHandler(AuthController.logout));

// Rutas protegidas (requieren autenticación)
router.get('/profile', authenticate, asyncHandler(AuthController.getProfile));

module.exports = router;
