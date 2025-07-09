const CuesNro = require('../../data/gestionScreening/CuesNro');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class CuesNroController {
    static async getAll(req, res) {
        const cuestionarios = await CuesNro.findAll();
        ResponseHelper.success(res, cuestionarios);
    }

    static async getById(req, res) {
        const cuestionario = await CuesNro.findById(req.params.id);
        if (!cuestionario) throw new NotFoundError('Cuestionario');
        ResponseHelper.success(res, cuestionario);
    }
    
    static async create(req, res) {
        const nuevoCuestionario = await CuesNro.create(req.body);
        ResponseHelper.created(res, nuevoCuestionario, 'Cuestionario creado exitosamente.');
    }

    static async update(req, res) {
        const cuestionarioActualizado = await CuesNro.update(req.params.id, req.body);
        if (!cuestionarioActualizado) throw new NotFoundError('Cuestionario');
        ResponseHelper.updated(res, cuestionarioActualizado, 'Cuestionario actualizado exitosamente.');
    }

    static async delete(req, res) {
        const cuestionarioEliminado = await CuesNro.delete(req.params.id);
        if (!cuestionarioEliminado) throw new NotFoundError('Cuestionario');
        ResponseHelper.deleted(res, 'Cuestionario eliminado exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const cuestionarios = await CuesNro.findByDescripcion(descripcion);
        ResponseHelper.success(res, cuestionarios);
    }
}

module.exports = CuesNroController; 