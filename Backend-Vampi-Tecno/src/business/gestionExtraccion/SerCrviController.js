const SerCrvi = require('../../data/gestionExtraccion/SerCrvi');
const { successResponse, errorResponse } = require('../../shared/middlewares/responseHelper');

class SerCrviController {
  // Crear un nuevo servicio de criovinificación
  static async create(req, res) {
    try {
      const data = req.body;
      const servicio = await SerCrvi.create(data);
      return successResponse(res, 'Servicio de criovinificación creado exitosamente', servicio, 201);
    } catch (error) {
      console.error('Error al crear servicio de criovinificación:', error);
      return errorResponse(res, 'Error al crear servicio de criovinificación', error.message);
    }
  }

  // Obtener todos los servicios de criovinificación
  static async findAll(req, res) {
    try {
      const servicios = await SerCrvi.findAll();
      return successResponse(res, 'Servicios de criovinificación obtenidos exitosamente', servicios);
    } catch (error) {
      console.error('Error al obtener servicios de criovinificación:', error);
      return errorResponse(res, 'Error al obtener servicios de criovinificación', error.message);
    }
  }

  // Obtener un servicio de criovinificación por ID
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const servicio = await SerCrvi.findById(id);
      
      if (!servicio) {
        return errorResponse(res, 'Servicio de criovinificación no encontrado', null, 404);
      }
      
      return successResponse(res, 'Servicio de criovinificación obtenido exitosamente', servicio);
    } catch (error) {
      console.error('Error al obtener servicio de criovinificación:', error);
      return errorResponse(res, 'Error al obtener servicio de criovinificación', error.message);
    }
  }

  // Actualizar un servicio de criovinificación
  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      
      const servicioExistente = await SerCrvi.findById(id);
      if (!servicioExistente) {
        return errorResponse(res, 'Servicio de criovinificación no encontrado', null, 404);
      }
      
      const servicio = await SerCrvi.update(id, data);
      return successResponse(res, 'Servicio de criovinificación actualizado exitosamente', servicio);
    } catch (error) {
      console.error('Error al actualizar servicio de criovinificación:', error);
      return errorResponse(res, 'Error al actualizar servicio de criovinificación', error.message);
    }
  }

  // Eliminar un servicio de criovinificación
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      const servicioExistente = await SerCrvi.findById(id);
      if (!servicioExistente) {
        return errorResponse(res, 'Servicio de criovinificación no encontrado', null, 404);
      }
      
      const servicio = await SerCrvi.delete(id);
      return successResponse(res, 'Servicio de criovinificación eliminado exitosamente', servicio);
    } catch (error) {
      console.error('Error al eliminar servicio de criovinificación:', error);
      return errorResponse(res, 'Error al eliminar servicio de criovinificación', error.message);
    }
  }

  // Buscar servicios por extracción
  static async findByExtraccion(req, res) {
    try {
      const { extraccionId } = req.params;
      const servicios = await SerCrvi.findByExtraccion(extraccionId);
      
      return successResponse(res, 'Servicios por extracción obtenidos exitosamente', servicios);
    } catch (error) {
      console.error('Error al obtener servicios por extracción:', error);
      return errorResponse(res, 'Error al obtener servicios por extracción', error.message);
    }
  }

  // Buscar servicios por fecha
  static async findByFecha(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      
      if (!fechaInicio || !fechaFin) {
        return errorResponse(res, 'Fechas de inicio y fin son requeridas', null, 400);
      }
      
      const servicios = await SerCrvi.findByFecha(fechaInicio, fechaFin);
      return successResponse(res, 'Servicios por fecha obtenidos exitosamente', servicios);
    } catch (error) {
      console.error('Error al obtener servicios por fecha:', error);
      return errorResponse(res, 'Error al obtener servicios por fecha', error.message);
    }
  }

  // Buscar servicios por código de criovinificación
  static async findByCodigoCriovinificacion(req, res) {
    try {
      const { codigo } = req.params;
      const servicios = await SerCrvi.findByCodigoCriovinificacion(codigo);
      
      return successResponse(res, 'Servicios por código de criovinificación obtenidos exitosamente', servicios);
    } catch (error) {
      console.error('Error al obtener servicios por código de criovinificación:', error);
      return errorResponse(res, 'Error al obtener servicios por código de criovinificación', error.message);
    }
  }

  // Buscar servicios por fracción
  static async findByFraccion(req, res) {
    try {
      const { fraccion } = req.params;
      const servicios = await SerCrvi.findByFraccion(fraccion);
      
      return successResponse(res, 'Servicios por fracción obtenidos exitosamente', servicios);
    } catch (error) {
      console.error('Error al obtener servicios por fracción:', error);
      return errorResponse(res, 'Error al obtener servicios por fracción', error.message);
    }
  }

  // Buscar servicios por responsable
  static async findByResponsable(req, res) {
    try {
      const { responsableId } = req.params;
      const servicios = await SerCrvi.findByResponsable(responsableId);
      
      return successResponse(res, 'Servicios por responsable obtenidos exitosamente', servicios);
    } catch (error) {
      console.error('Error al obtener servicios por responsable:', error);
      return errorResponse(res, 'Error al obtener servicios por responsable', error.message);
    }
  }

  // Buscar servicios por estado de liberación
  static async findByEstadoLibreacion(req, res) {
    try {
      const { estado } = req.params;
      
      if (!['liberado', 'pendiente'].includes(estado)) {
        return errorResponse(res, 'Estado debe ser "liberado" o "pendiente"', null, 400);
      }
      
      const servicios = await SerCrvi.findByEstadoLibreacion(estado);
      return successResponse(res, 'Servicios por estado de liberación obtenidos exitosamente', servicios);
    } catch (error) {
      console.error('Error al obtener servicios por estado de liberación:', error);
      return errorResponse(res, 'Error al obtener servicios por estado de liberación', error.message);
    }
  }

  // Obtener estadísticas de servicios de criovinificación
  static async getEstadisticas(req, res) {
    try {
      const estadisticas = await SerCrvi.getEstadisticas();
      return successResponse(res, 'Estadísticas de servicios de criovinificación obtenidas exitosamente', estadisticas);
    } catch (error) {
      console.error('Error al obtener estadísticas de servicios de criovinificación:', error);
      return errorResponse(res, 'Error al obtener estadísticas de servicios de criovinificación', error.message);
    }
  }

  // Obtener servicios por mes
  static async getServiciosPorMes(req, res) {
    try {
      const serviciosPorMes = await SerCrvi.getServiciosPorMes();
      return successResponse(res, 'Servicios por mes obtenidos exitosamente', serviciosPorMes);
    } catch (error) {
      console.error('Error al obtener servicios por mes:', error);
      return errorResponse(res, 'Error al obtener servicios por mes', error.message);
    }
  }
}

module.exports = SerCrviController; 