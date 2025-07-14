const Vamunitran = require('../../data/gestionConfiguracion/Vamunitran');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamunitranController = {
  async listar(req, res) {
    try {
      const items = await Vamunitran.listar();
      ResponseHelper.success(res, items);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener las unidades de transfusión', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const item = await Vamunitran.obtener(id);
      if (!item) return ResponseHelper.notFound(res, 'Unidad de transfusión');
      ResponseHelper.success(res, item);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener la unidad de transfusión', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      const nuevo = await Vamunitran.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Unidad de transfusión creada exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear la unidad de transfusión', 400, error.message);
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await Vamunitran.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Unidad de transfusión');
      ResponseHelper.updated(res, actualizado, 'Unidad de transfusión actualizada exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar la unidad de transfusión', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await Vamunitran.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Unidad de transfusión');
      ResponseHelper.success(res, eliminado, 'Unidad de transfusión eliminada correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar la unidad de transfusión', 400, error.message);
    }
  }
};

module.exports = VamunitranController;
