const ExtDona = require('../../data/gestionExtraccion/ExtDona');
const { successResponse, errorResponse } = require('../../shared/middlewares/responseHelper');

class ExtDonaController {
  // Crear una nueva extracción de donante
  static async create(req, res) {
    try {
      const data = req.body;
      const extraccion = await ExtDona.create(data);
      return successResponse(res, 'Extracción de donante creada exitosamente', extraccion, 201);
    } catch (error) {
      console.error('Error al crear extracción de donante:', error);
      return errorResponse(res, 'Error al crear extracción de donante', error.message);
    }
  }

  // Obtener todas las extracciones de donantes
  static async findAll(req, res) {
    try {
      const extracciones = await ExtDona.findAll();
      return successResponse(res, 'Extracciones de donantes obtenidas exitosamente', extracciones);
    } catch (error) {
      console.error('Error al obtener extracciones de donantes:', error);
      return errorResponse(res, 'Error al obtener extracciones de donantes', error.message);
    }
  }

  // Obtener una extracción de donante por ID
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const extraccion = await ExtDona.findById(id);
      
      if (!extraccion) {
        return errorResponse(res, 'Extracción de donante no encontrada', null, 404);
      }
      
      return successResponse(res, 'Extracción de donante obtenida exitosamente', extraccion);
    } catch (error) {
      console.error('Error al obtener extracción de donante:', error);
      return errorResponse(res, 'Error al obtener extracción de donante', error.message);
    }
  }

  // Actualizar una extracción de donante
  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      
      const extraccionExistente = await ExtDona.findById(id);
      if (!extraccionExistente) {
        return errorResponse(res, 'Extracción de donante no encontrada', null, 404);
      }
      
      const extraccion = await ExtDona.update(id, data);
      return successResponse(res, 'Extracción de donante actualizada exitosamente', extraccion);
    } catch (error) {
      console.error('Error al actualizar extracción de donante:', error);
      return errorResponse(res, 'Error al actualizar extracción de donante', error.message);
    }
  }

  // Eliminar una extracción de donante
  static async delete(req, res) {
    try {
      const { id } = req.params;
      
      const extraccionExistente = await ExtDona.findById(id);
      if (!extraccionExistente) {
        return errorResponse(res, 'Extracción de donante no encontrada', null, 404);
      }
      
      const extraccion = await ExtDona.delete(id);
      return successResponse(res, 'Extracción de donante eliminada exitosamente', extraccion);
    } catch (error) {
      console.error('Error al eliminar extracción de donante:', error);
      return errorResponse(res, 'Error al eliminar extracción de donante', error.message);
    }
  }

  // Buscar extracciones por screening
  static async findByScreening(req, res) {
    try {
      const { screeningNro, centroCod } = req.params;
      const extracciones = await ExtDona.findByScreening(screeningNro, centroCod);
      
      return successResponse(res, 'Extracciones por screening obtenidas exitosamente', extracciones);
    } catch (error) {
      console.error('Error al obtener extracciones por screening:', error);
      return errorResponse(res, 'Error al obtener extracciones por screening', error.message);
    }
  }

  // Buscar extracciones por bolsa
  static async findByBolsa(req, res) {
    try {
      const { bolsaCod } = req.params;
      const extracciones = await ExtDona.findByBolsa(bolsaCod);
      
      return successResponse(res, 'Extracciones por bolsa obtenidas exitosamente', extracciones);
    } catch (error) {
      console.error('Error al obtener extracciones por bolsa:', error);
      return errorResponse(res, 'Error al obtener extracciones por bolsa', error.message);
    }
  }

  // Buscar extracciones por fecha
  static async findByFecha(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      
      if (!fechaInicio || !fechaFin) {
        return errorResponse(res, 'Fechas de inicio y fin son requeridas', null, 400);
      }
      
      const extracciones = await ExtDona.findByFecha(fechaInicio, fechaFin);
      return successResponse(res, 'Extracciones por fecha obtenidas exitosamente', extracciones);
    } catch (error) {
      console.error('Error al obtener extracciones por fecha:', error);
      return errorResponse(res, 'Error al obtener extracciones por fecha', error.message);
    }
  }

  // Buscar extracciones por resultado
  static async findByResultado(req, res) {
    try {
      const { resultado } = req.params;
      const extracciones = await ExtDona.findByResultado(resultado);
      
      return successResponse(res, 'Extracciones por resultado obtenidas exitosamente', extracciones);
    } catch (error) {
      console.error('Error al obtener extracciones por resultado:', error);
      return errorResponse(res, 'Error al obtener extracciones por resultado', error.message);
    }
  }

  // Buscar extracciones por estado
  static async findByEstado(req, res) {
    try {
      const { estado } = req.params;
      const extracciones = await ExtDona.findByEstado(estado);
      
      return successResponse(res, 'Extracciones por estado obtenidas exitosamente', extracciones);
    } catch (error) {
      console.error('Error al obtener extracciones por estado:', error);
      return errorResponse(res, 'Error al obtener extracciones por estado', error.message);
    }
  }

  // Obtener estadísticas de extracciones
  static async getEstadisticas(req, res) {
    try {
      const estadisticas = await ExtDona.getEstadisticas();
      return successResponse(res, 'Estadísticas de extracciones obtenidas exitosamente', estadisticas);
    } catch (error) {
      console.error('Error al obtener estadísticas de extracciones:', error);
      return errorResponse(res, 'Error al obtener estadísticas de extracciones', error.message);
    }
  }
}

module.exports = ExtDonaController; 