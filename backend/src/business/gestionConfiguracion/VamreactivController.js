const Vamreactiv = require('../../data/gestionConfiguracion/Vamreactiv');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamreactivController = {
  async listar(req, res) {
    try {
      const items = await Vamreactiv.listar();
      ResponseHelper.success(res, items);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los reactivos', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const item = await Vamreactiv.obtener(id);
      if (!item) return ResponseHelper.notFound(res, 'Reactivo');
      ResponseHelper.success(res, item);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el reactivo', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      const nuevo = await Vamreactiv.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Reactivo creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear el reactivo', 400, error.message);
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await Vamreactiv.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Reactivo');
      ResponseHelper.updated(res, actualizado, 'Reactivo actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el reactivo', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Vamreactiv.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Reactivo');
      ResponseHelper.success(res, eliminado, 'Reactivo eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el reactivo', 400, error.message);
    }
  }
};

module.exports = VamreactivController;
