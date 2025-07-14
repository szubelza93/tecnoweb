const Vamcentdon = require('../../data/gestionConfiguracion/Vamcentdon');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamcentdonController = {
  async listar(req, res) {
    try {
      const items = await Vamcentdon.listar();
      ResponseHelper.success(res, items);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los centros de donación', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const item = await Vamcentdon.obtener(id);
      if (!item) return ResponseHelper.notFound(res, 'Centro de donación');
      ResponseHelper.success(res, item);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el centro de donación', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      const nuevo = await Vamcentdon.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Centro de donación creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear el centro de donación', 400, error.message);
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await Vamcentdon.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Centro de donación');
      ResponseHelper.updated(res, actualizado, 'Centro de donación actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el centro de donación', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Vamcentdon.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Centro de donación');
      ResponseHelper.deleted(res, 'Centro de donación eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el centro de donación', 400, error.message);
    }
  }
};

module.exports = VamcentdonController;
