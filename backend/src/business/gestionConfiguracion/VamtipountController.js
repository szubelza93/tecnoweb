const Vamtipount = require('../../data/gestionConfiguracion/Vamtipount');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamtipountController = {
  async listar(req, res) {
    try {
      const items = await Vamtipount.listar();
      ResponseHelper.success(res, items);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los tipos de unidad', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const item = await Vamtipount.obtener(id);
      if (!item) return ResponseHelper.notFound(res, 'Tipo de unidad');
      ResponseHelper.success(res, item);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el tipo de unidad', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      const nuevo = await Vamtipount.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Tipo de unidad creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear el tipo de unidad', 400, error.message);
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await Vamtipount.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Tipo de unidad');
      ResponseHelper.updated(res, actualizado, 'Tipo de unidad actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el tipo de unidad', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Vamtipount.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Tipo de unidad');
      ResponseHelper.deleted(res, 'Tipo de unidad eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el tipo de unidad', 400, error.message);
    }
  }
};

module.exports = VamtipountController;
