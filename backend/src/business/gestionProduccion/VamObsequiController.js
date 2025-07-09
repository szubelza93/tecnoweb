const VamObsequi = require('../../data/gestionProduccion/VamObsequi');
const ResponseHelper = require('../../shared/middlewares/responseHelper');

const VamObsequiController = {
  // Listar todos
  async listar(req, res) {
    try {
      const obsequios = await VamObsequi.listar();
      ResponseHelper.success(res, obsequios);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener los obsequios', 500, error.message);
    }
  },

  // Obtener uno por ID
  async obtener(req, res) {
    try {
      const { id } = req.params;
      const obsequio = await VamObsequi.obtener(id);
      if (!obsequio) return ResponseHelper.notFound(res, 'Obsequio');
      ResponseHelper.success(res, obsequio);
    } catch (error) {
      ResponseHelper.error(res, 'Error al obtener el obsequio', 500, error.message);
    }
  },

  // Crear nuevo
  async crear(req, res) {
    try {
      const nuevo = await VamObsequi.crear(req.body);
      ResponseHelper.created(res, nuevo, 'Obsequio creado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al crear el obsequio', 400, error.message);
    }
  },

  // Actualizar
  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const actualizado = await VamObsequi.actualizar(id, req.body);
      if (!actualizado) return ResponseHelper.notFound(res, 'Obsequio');
      ResponseHelper.updated(res, actualizado, 'Obsequio actualizado exitosamente.');
    } catch (error) {
      ResponseHelper.error(res, 'Error al actualizar el obsequio', 400, error.message);
    }
  },

  // Eliminar
  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const eliminado = await VamObsequi.eliminar(id);
      if (!eliminado) return ResponseHelper.notFound(res, 'Obsequio');
      ResponseHelper.deleted(res, 'Obsequio eliminado correctamente');
    } catch (error) {
      ResponseHelper.error(res, 'Error al eliminar el obsequio', 400, error.message);
    }
  }
};

module.exports = VamObsequiController; 