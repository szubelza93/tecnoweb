const express = require('express');
const { UsuarioController } = require('../../business/gestionUsuario');
const { asyncHandler } = require('../../shared/middlewares/errorHandler');
const { authenticate, authorize } = require('../../shared/middlewares/auth');

const router = express.Router();

// Middleware de autenticación para todas las rutas
// router.use(authenticate); // Comentado para permitir acceso sin autenticación

// Rutas CRUD básicas
router.get('/', /* authorize('usuarios.listar'), */ asyncHandler(UsuarioController.getAll));
router.post('/', /* authorize('usuarios.crear'), */ asyncHandler(UsuarioController.create));
router.get('/:id', /* authorize('usuarios.leer'), */ asyncHandler(UsuarioController.getById));
router.put('/:id', /* authorize('usuarios.actualizar'), */ asyncHandler(UsuarioController.update));
router.delete('/:id', /* authorize('usuarios.eliminar'), */ asyncHandler(UsuarioController.delete));

module.exports = router;