const VamRefrige = require('../../data/gestionProduccion/VamRefrige');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamRefrigeController = {
  async listar(req, res) {
    try {
      const refris = await VamRefrige.listar();
      ResponseHelper.success(res, refris);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los refrigeradores', 500, error.message);
    }
  },

  async obtener(req, res) {
    try {
      const { id } = req.params;
      const refri = await VamRefrige.obtener(id);
      if (!refri) return ResponseHelper.notFound(res, 'Refrigerador');
      ResponseHelper.success(res, refri);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el refrigerador', 500, error.message);
    }
  },

  async crear(req, res) {
    try {
      const nuevo = await VamRefrige.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Refrigerador creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear el refrigerador', 400, error.message);
    }
  },

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await VamRefrige.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Refrigerador');
      ResponseHelper.updated(res, actualizado, 'Refrigerador actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el refrigerador', 400, error.message);
    }
  },

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await VamRefrige.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Refrigerador');
      ResponseHelper.deleted(res, 'Refrigerador eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el refrigerador', 400, error.message);
    }
  }
};

module.exports = VamRefrigeController; 