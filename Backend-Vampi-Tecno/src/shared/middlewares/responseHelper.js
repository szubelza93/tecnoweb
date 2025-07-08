class ResponseHelper {
  static success(res, data = null, message = 'Operación exitosa', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(res, message = 'Error interno del servidor', statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    });
  }

  static notFound(res, resource = 'Recurso') {
    return this.error(res, `${resource} no encontrado`, 404);
  }

  static unauthorized(res, message = 'No autorizado') {
    return this.error(res, message, 401);
  }

  static forbidden(res, message = 'Acceso denegado') {
    return this.error(res, message, 403);
  }

  static badRequest(res, message = 'Solicitud inválida', errors = null) {
    return this.error(res, message, 400, errors);
  }

  static created(res, data, message = 'Recurso creado exitosamente') {
    return this.success(res, data, message, 201);
  }

  static updated(res, data, message = 'Recurso actualizado exitosamente') {
    return this.success(res, data, message, 200);
  }

  static deleted(res, message = 'Recurso eliminado exitosamente') {
    return this.success(res, null, message, 200);
  }

  static paginated(res, data, pagination, message = 'Datos obtenidos exitosamente') {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        pages: Math.ceil(pagination.total / pagination.limit)
      },
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = ResponseHelper;
