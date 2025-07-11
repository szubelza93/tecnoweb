const Vamtipocen = require('../../data/gestionConfiguracion/Vamtipocen');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamtipocenController = {
  async listar(req, res) {
    try {
      const items = await Vamtipocen.listar();
      ResponseHelper.success(res, items);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los tipos de centro', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const item = await Vamtipocen.obtener(id);
      if (!item) return ResponseHelper.notFound(res, 'Tipo de centro');
      ResponseHelper.success(res, item);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el tipo de centro', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      const nuevo = await Vamtipocen.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Tipo de centro creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear el tipo de centro', 400, error.message);
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await Vamtipocen.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Tipo de centro');
      ResponseHelper.updated(res, actualizado, 'Tipo de centro actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el tipo de centro', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Vamtipocen.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Tipo de centro');
      ResponseHelper.deleted(res, 'Tipo de centro eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el tipo de centro', 400, error.message);
    }
  }
};

module.exports = VamtipocenController;
