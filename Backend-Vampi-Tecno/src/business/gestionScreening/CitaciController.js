const Citaci = require('../../data/gestionScreening/Citaci');
const { sanitizeInput } = require('../../shared/middlewares/validation');

class CitaciController {
  // Obtener todas las citas
  static async getAllCitas(req, res) {
    try {
      const citas = await Citaci.findAll();
      res.json({
        success: true,
        message: 'Citas obtenidas exitosamente',
        data: citas
      });
    } catch (error) {
      console.error('Error al obtener citas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Obtener cita por ID
  static async getCitaById(req, res) {
    try {
      const { vcitNroCit } = req.params;
      const cita = await Citaci.findById(vcitNroCit);
      
      if (!cita) {
        return res.status(404).json({
          success: false,
          message: 'Cita no encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Cita obtenida exitosamente',
        data: cita
      });
    } catch (error) {
      console.error('Error al obtener cita:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Crear nueva cita
  static async createCita(req, res) {
    try {
      const citaData = sanitizeInput(req.body);
      
      // Validaciones básicas
      if (!citaData.vcitNroCit || !citaData.vcitNomPac) {
        return res.status(400).json({
          success: false,
          message: 'El número de cita y nombre del paciente son obligatorios'
        });
      }

      const nuevaCita = await Citaci.create(citaData);
      
      res.status(201).json({
        success: true,
        message: 'Cita creada exitosamente',
        data: nuevaCita
      });
    } catch (error) {
      console.error('Error al crear cita:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Actualizar cita
  static async updateCita(req, res) {
    try {
      const { vcitNroCit } = req.params;
      const citaData = sanitizeInput(req.body);

      const citaExistente = await Citaci.findById(vcitNroCit);
      if (!citaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Cita no encontrada'
        });
      }

      const citaActualizada = await Citaci.update(vcitNroCit, citaData);
      
      res.json({
        success: true,
        message: 'Cita actualizada exitosamente',
        data: citaActualizada
      });
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Eliminar cita
  static async deleteCita(req, res) {
    try {
      const { vcitNroCit } = req.params;
      
      const citaExistente = await Citaci.findById(vcitNroCit);
      if (!citaExistente) {
        return res.status(404).json({
          success: false,
          message: 'Cita no encontrada'
        });
      }

      await Citaci.delete(vcitNroCit);
      
      res.json({
        success: true,
        message: 'Cita eliminada exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar cita:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas por unidad
  static async getCitasByUnidad(req, res) {
    try {
      const { vuntCodUnt } = req.params;
      const citas = await Citaci.findByUnidad(vuntCodUnt);
      
      res.json({
        success: true,
        message: 'Citas por unidad obtenidas exitosamente',
        data: citas
      });
    } catch (error) {
      console.error('Error al obtener citas por unidad:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas por paciente
  static async getCitasByPaciente(req, res) {
    try {
      const { vcitNomPac } = req.params;
      const citas = await Citaci.findByPaciente(vcitNomPac);
      
      res.json({
        success: true,
        message: 'Citas por paciente obtenidas exitosamente',
        data: citas
      });
    } catch (error) {
      console.error('Error al obtener citas por paciente:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas por grupo sanguíneo
  static async getCitasByGrupoSanguineo(req, res) {
    try {
      const { vgrsCodGrs } = req.params;
      const citas = await Citaci.findByGrupoSanguineo(vgrsCodGrs);
      
      res.json({
        success: true,
        message: 'Citas por grupo sanguíneo obtenidas exitosamente',
        data: citas
      });
    } catch (error) {
      console.error('Error al obtener citas por grupo sanguíneo:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas por fecha
  static async getCitasByFecha(req, res) {
    try {
      const { fecha } = req.params;
      const citas = await Citaci.findByFecha(fecha);
      
      res.json({
        success: true,
        message: 'Citas por fecha obtenidas exitosamente',
        data: citas
      });
    } catch (error) {
      console.error('Error al obtener citas por fecha:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Buscar citas por rango de fechas
  static async getCitasByRangoFechas(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.params;
      const citas = await Citaci.findByRangoFechas(fechaInicio, fechaFin);
      
      res.json({
        success: true,
        message: 'Citas por rango de fechas obtenidas exitosamente',
        data: citas
      });
    } catch (error) {
      console.error('Error al obtener citas por rango de fechas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Contar citas por unidad
  static async countCitasByUnidad(req, res) {
    try {
      const { vuntCodUnt } = req.params;
      const total = await Citaci.countByUnidad(vuntCodUnt);
      
      res.json({
        success: true,
        message: 'Total de citas por unidad obtenido exitosamente',
        data: { total }
      });
    } catch (error) {
      console.error('Error al contar citas por unidad:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // Obtener estadísticas de citas
  static async getEstadisticas(req, res) {
    try {
      const estadisticas = await Citaci.getEstadisticas();
      
      res.json({
        success: true,
        message: 'Estadísticas de citas obtenidas exitosamente',
        data: estadisticas
      });
    } catch (error) {
      console.error('Error al obtener estadísticas de citas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
}

module.exports = CitaciController; 