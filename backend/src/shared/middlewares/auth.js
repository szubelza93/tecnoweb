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
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ResponseHelper.unauthorized(res, 'El token ha expirado.');
    }
    return ResponseHelper.unauthorized(res, 'Token inválido.');
  }
});

const authorize = (requiredPrivilege) => {
  return (req, res, next) => {
    // Middleware simplificado - siempre permite acceso
    next();
  };
};

const authorizeAny = (privileges) => {
  return (req, res, next) => {
    // Middleware simplificado - siempre permite acceso
    next();
  };
};

const authorizeAll = (privileges) => {
  return (req, res, next) => {
    // Middleware simplificado - siempre permite acceso
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
  authorizeAny,
  authorizeAll
};
