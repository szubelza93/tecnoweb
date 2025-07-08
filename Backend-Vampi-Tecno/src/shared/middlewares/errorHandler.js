const ResponseHelper = require('./responseHelper');

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  console.error('ERROR CAPTURADO:', err);
  if (err.code) {
    switch (err.code) {
      case '23505':
        return ResponseHelper.badRequest(res, `Ya existe un registro con ese valor. Detalle: ${err.detail}`);
      case '23503':
        return ResponseHelper.badRequest(res, `Error de referencia: el registro está siendo usado por otros recursos. Detalle: ${err.detail}`);
      case '23502':
        return ResponseHelper.badRequest(res, `El campo '${err.column}' no puede ser nulo.`);
    }
  }
  // Manejo de errores de JWT
  if (err.name === 'JsonWebTokenError') {
    return ResponseHelper.unauthorized(res, 'Token inválido o malformado.');
  }
  if (err.name === 'TokenExpiredError') {
    return ResponseHelper.unauthorized(res, 'El token ha expirado.');
  }  
  if (err.name === 'ValidationError') {
    return ResponseHelper.badRequest(res, err.message, err.errors);
  }
  if (err.name === 'AuthorizationError') {
    return ResponseHelper.forbidden(res, err.message);
  }
  if (err.name === 'NotFoundError') {
    return ResponseHelper.notFound(res, err.message);
  }
  if (err.name === 'ConflictError') {
    return ResponseHelper.badRequest(res, err.message);
  }
  return ResponseHelper.error(res, 'Ha ocurrido un error.');
};

class ValidationError extends Error {
  constructor(message, errors = null) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

class AuthorizationError extends Error {
  constructor(message = 'No tienes permisos para realizar esta acción') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

class NotFoundError extends Error {
  constructor(resource = 'Recurso') {
    super(`${resource} no encontrado`);
    this.name = 'NotFoundError';
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
  }
}

module.exports = {
  asyncHandler,
  errorHandler,
  ValidationError,
  AuthorizationError,
  NotFoundError,
  ConflictError
};
