const jwt = require('jsonwebtoken');
const ResponseHelper = require('./responseHelper');
const { asyncHandler } = require('./errorHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return ResponseHelper.unauthorized(res, 'Se requiere un token de acceso.');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { 
      id: decoded.id, 
      email: decoded.email,
      role: decoded.role 
    };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ResponseHelper.unauthorized(res, 'El token ha expirado.');
    }
    return ResponseHelper.unauthorized(res, 'Token inválido.');
  }
});

const authorize = (requiredRole) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return ResponseHelper.unauthorized(res, 'Se requiere autenticación.');
    }

    // Verificar si el usuario tiene el rol requerido
    if (requiredRole && req.user.role !== requiredRole) {
      return ResponseHelper.forbidden(res, 'No tiene permisos para realizar esta acción.');
    }

    next();
  };
};

const authorizeAny = (roles) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return ResponseHelper.unauthorized(res, 'Se requiere autenticación.');
    }

    // Si no se especifican roles, permitir acceso
    if (!roles || roles.length === 0) {
      return next();
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    if (!roles.includes(req.user.role)) {
      return ResponseHelper.forbidden(res, 'No tiene permisos para realizar esta acción.');
    }

    next();
  };
};

const authorizeAll = (roles) => {
  return (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return ResponseHelper.unauthorized(res, 'Se requiere autenticación.');
    }

    // Si no se especifican roles, permitir acceso
    if (!roles || roles.length === 0) {
      return next();
    }

    // Para authorizeAll, el usuario debe tener el rol de administrador
    if (req.user.role !== 'admin') {
      return ResponseHelper.forbidden(res, 'Se requiere rol de administrador para esta acción.');
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
  authorizeAny,
  authorizeAll
};
