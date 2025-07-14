const Vamanticue = require('../../data/gestionConfiguracion/Vamanticue');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamanticueController = {
  async listar(req, res) {
    try {
      const items = await Vamanticue.listar();
      ResponseHelper.success(res, items);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los anticuerpos', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const item = await Vamanticue.obtener(id);
      if (!item) return ResponseHelper.notFound(res, 'Anticuerpo');
      ResponseHelper.success(res, item);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el anticuerpo', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      const nuevo = await Vamanticue.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Anticuerpo creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear el anticuerpo', 400, error.message);
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await Vamanticue.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Anticuerpo');
      ResponseHelper.updated(res, actualizado, 'Anticuerpo actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el anticuerpo', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Vamanticue.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Anticuerpo');
      ResponseHelper.success(res, eliminado, 'Anticuerpo eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el anticuerpo', 400, error.message);
    }
  }
};

module.exports = VamanticueController;
