const express = require('express');
const { UsuarioController } = require('../../business/gestionUsuario');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');
const { uploadProfileImage } = require('../../shared/middlewares/uploadMiddleware');

const router = express.Router();

// Middleware de autenticación para todas las rutas
router.use(authenticate);

// Rutas CRUD básicas
router.get('/', authorize('admin'), asyncHandler(UsuarioController.getAll));
router.post('/', authorize('admin'), asyncHandler(UsuarioController.create));
router.get('/:id', authorize('admin'), asyncHandler(UsuarioController.getById));
router.put('/:id', authorize('admin'), asyncHandler(UsuarioController.update));
router.delete('/:id', authorize('admin'), asyncHandler(UsuarioController.delete));

// Ruta para subir imagen de perfil
router.post('/:id/upload-profile-image', authorize('admin'), uploadProfileImage, asyncHandler(UsuarioController.uploadProfileImage));

module.exports = router;
