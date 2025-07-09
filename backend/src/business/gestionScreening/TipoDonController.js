const TipoDon = require('../../data/gestionScreening/TipoDon');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class TipoDonController {
    static async getAll(req, res) {
        const tipos = await TipoDon.findAll();
        ResponseHelper.success(res, tipos);
    }

    static async getById(req, res) {
        const tipo = await TipoDon.findById(req.params.id);
        if (!tipo) throw new NotFoundError('Tipo de Donación');
        ResponseHelper.success(res, tipo);
    }
    
    static async create(req, res) {
        const nuevoTipo = await TipoDon.create(req.body);
        ResponseHelper.created(res, nuevoTipo, 'Tipo de donación creado exitosamente.');
    }

    static async update(req, res) {
        const tipoActualizado = await TipoDon.update(req.params.id, req.body);
        if (!tipoActualizado) throw new NotFoundError('Tipo de Donación');
        ResponseHelper.updated(res, tipoActualizado, 'Tipo de donación actualizado exitosamente.');
    }

    static async delete(req, res) {
        const tipoEliminado = await TipoDon.delete(req.params.id);
        if (!tipoEliminado) throw new NotFoundError('Tipo de Donación');
        ResponseHelper.deleted(res, 'Tipo de donación eliminado exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const tipos = await TipoDon.findByDescripcion(descripcion);
        ResponseHelper.success(res, tipos);
    }
}

module.exports = TipoDonController; 