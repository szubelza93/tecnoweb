const VamCuestio = require('../../data/gestionScreening/VamCuestio');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');


const VamCuestioController = {
  async listar(req, res) {
    try {
      const items = await VamCuestio.listar();
      ResponseHelper.success(res, items);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los cuestionarios', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { vcuenropre } = req.params;
      const item = await VamCuestio.obtener(vcuenropre);
      if (!item) return ResponseHelper.notFound(res, 'Cuestionario');
      ResponseHelper.success(res, item);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el cuestionario', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      
    
      const { vcuenrocue, vcuepregun, vcueopcio1, vcueopcio2, vcuerespue } = req.body;
      const nuevo = await VamCuestio.crear({ vcuenrocue, vcuepregun, vcueopcio1, vcueopcio2, vcuerespue });
      ResponseHelper.created(res, nuevo, 'Cuestionario creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el cuestionario', 400, error.message);
    }  
  },

  async actualizar(req, res) {
    try {
      const { vcuenropre } = req.params;
      const { vcuepregun, vcueopcio1, vcueopcio2, vcuerespue } = req.body;
      const actualizado = await VamCuestio.actualizar(vcuenropre, { vcuepregun, vcueopcio1, vcueopcio2, vcuerespue });
      if (!actualizado) return ResponseHelper.notFound(res, 'Cuestionario');
      ResponseHelper.updated(res, actualizado, 'Cuestionario actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el cuestionario', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { vcuenropre } = req.params;
      const eliminado = await VamCuestio.eliminar(vcuenropre);
      if (!eliminado) return ResponseHelper.notFound(res, 'Cuestionario');
      ResponseHelper.deleted(res, 'Cuestionario eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el cuestionario', 400, error.message);
    }
  }
};

module.exports = VamCuestioController;
