const CitaDon = require('../../data/gestionScreening/CitaDon');
const { sanitizeInput } = require('../../shared/middlewares/validation');

class CitaDonBusiness {
  // Obtener todas las citas de donantes
  static async getAllCitasDonantes(req, res) {
    try {
      const citasDonantes = await CitaDon.findAll();
      res.json({
        success: true,
        message: 'Citas de donantes obtenidas exitosamente',
        data: citasDonantes
      });
    } catch (error) {
      console.error('Error al obtener citas de donantes:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Obtener cita de donante por ID
  static async getCitaDonanteById(req, res) {
    try {
      const { vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen } = req.params;
      const citaDonante = await CitaDon.findById(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen);
      
      if (!citaDonante) {
        return res.status(404).json({
          success: false,
          message: 'Cita de donante no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Cita de donante obtenida exitosamente',
        data: citaDonante
      });
    } catch (error) {
      console.error('Error al obtener cita de donante:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Crear nueva cita de donante
  static async createCitaDonante(req, res) {
    try {
      const citaDonanteData = sanitizeInput(req.body);
      
      // Validaciones básicas
      if (!citaDonanteData.vcitNroCit || !citaDonanteData.vdonCodDon || 
          !citaDonanteData.vscrNroScr || !citaDonanteData.vcenCodCen) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos de identificación son obligatorios'
        });
      }

      const nuevaCitaDonante = await CitaDon.create(citaDonanteData);
      
      res.status(201).json({
        success: true,
        message: 'Cita de donante creada exitosamente',
        data: nuevaCitaDonante
      });
    } catch (error) {
      console.error('Error al crear cita de donante:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Actualizar cita de donante
  static async updateCitaDonante(req, res) {
    try {
      const { vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen } = req.params;
      const citaDonanteData = sanitizeInput(req.body);

      const citaDonanteExistente = await CitaDon.findById(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen);
      if (!citaDonanteExistente) {
        return res.status(404).json({
          success: false,
          message: 'Cita de donante no encontrada'
        });
      }

      const citaDonanteActualizada = await CitaDon.update(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen, citaDonanteData);
      
      res.json({
        success: true,
        message: 'Cita de donante actualizada exitosamente',
        data: citaDonanteActualizada
      });
    } catch (error) {
      console.error('Error al actualizar cita de donante:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Eliminar cita de donante
  static async deleteCitaDonante(req, res) {
    try {
      const { vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen } = req.params;
      
      const citaDonanteExistente = await CitaDon.findById(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen);
      if (!citaDonanteExistente) {
        return res.status(404).json({
          success: false,
          message: 'Cita de donante no encontrada'
        });
      }

      await CitaDon.delete(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen);
      
      res.json({
        success: true,
        message: 'Cita de donante eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar cita de donante:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas de donantes por número de cita
  static async getCitasDonantesByCita(req, res) {
    try {
      const { vcitNroCit } = req.params;
      const citasDonantes = await CitaDon.findByCita(vcitNroCit);
      
      res.json({
        success: true,
        message: 'Citas de donantes por cita obtenidas exitosamente',
        data: citasDonantes
      });
    } catch (error) {
      console.error('Error al obtener citas de donantes por cita:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas de donantes por donante
  static async getCitasDonantesByDonante(req, res) {
    try {
      const { vdonCodDon } = req.params;
      const citasDonantes = await CitaDon.findByDonante(vdonCodDon);
      
      res.json({
        success: true,
        message: 'Citas de donantes por donante obtenidas exitosamente',
        data: citasDonantes
      });
    } catch (error) {
      console.error('Error al obtener citas de donantes por donante:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas de donantes por screening
  static async getCitasDonantesByScreening(req, res) {
    try {
      const { vscrNroScr, vcenCodCen } = req.params;
      const citasDonantes = await CitaDon.findByScreening(vscrNroScr, vcenCodCen);
      
      res.json({
        success: true,
        message: 'Citas de donantes por screening obtenidas exitosamente',
        data: citasDonantes
      });
    } catch (error) {
      console.error('Error al obtener citas de donantes por screening:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas de donantes por resultado
  static async getCitasDonantesByResultado(req, res) {
    try {
      const { vcidResult } = req.params;
      const citasDonantes = await CitaDon.findByResultado(vcidResult);
      
      res.json({
        success: true,
        message: 'Citas de donantes por resultado obtenidas exitosamente',
        data: citasDonantes
      });
    } catch (error) {
      console.error('Error al obtener citas de donantes por resultado:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas de donantes por estado
  static async getCitasDonantesByEstado(req, res) {
    try {
      const { vcidSwCita } = req.params;
      const citasDonantes = await CitaDon.findByEstado(vcidSwCita);
      
      res.json({
        success: true,
        message: 'Citas de donantes por estado obtenidas exitosamente',
        data: citasDonantes
      });
    } catch (error) {
      console.error('Error al obtener citas de donantes por estado:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Obtener citas de donantes con detalles
  static async getCitasDonantesWithDetails(req, res) {
    try {
      const citasDonantes = await CitaDon.findWithDetails();
      
      res.json({
        success: true,
        message: 'Citas de donantes con detalles obtenidas exitosamente',
        data: citasDonantes
      });
    } catch (error) {
      console.error('Error al obtener citas de donantes con detalles:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Contar citas de donantes por cita
  static async countCitasDonantesByCita(req, res) {
    try {
      const { vcitNroCit } = req.params;
      const total = await CitaDon.countByCita(vcitNroCit);
      
      res.json({
        success: true,
        message: 'Total de citas de donantes por cita obtenido exitosamente',
        data: { total }
      });
    } catch (error) {
      console.error('Error al contar citas de donantes por cita:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Contar citas de donantes por donante
  static async countCitasDonantesByDonante(req, res) {
    try {
      const { vdonCodDon } = req.params;
      const total = await CitaDon.countByDonante(vdonCodDon);
      
      res.json({
        success: true,
        message: 'Total de citas de donantes por donante obtenido exitosamente',
        data: { total }
      });
    } catch (error) {
      console.error('Error al contar citas de donantes por donante:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Obtener estadísticas de citas de donantes
  static async getEstadisticas(req, res) {
    try {
      const estadisticas = await CitaDon.getEstadisticas();
      
      res.json({
        success: true,
        message: 'Estadísticas de citas de donantes obtenidas exitosamente',
        data: estadisticas
      });
    } catch (error) {
      console.error('Error al obtener estadísticas de citas de donantes:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
}

module.exports = CitaDonBusiness; 