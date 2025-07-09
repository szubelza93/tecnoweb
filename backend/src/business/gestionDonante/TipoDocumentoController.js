const TipoDocumento = require('../../data/gestionDonante/TipoDocumento');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class TipoDocumentoController {
    static async getAll(req, res) {
        const tipos = await TipoDocumento.findAll();
        ResponseHelper.success(res, tipos);
    }

    static async getById(req, res) {
        const tipo = await TipoDocumento.findById(req.params.id);
        if (!tipo) throw new NotFoundError('Tipo de Documento');
        ResponseHelper.success(res, tipo);
    }
    
    static async create(req, res) {
        const nuevoTipo = await TipoDocumento.create(req.body);
        ResponseHelper.created(res, nuevoTipo, 'Tipo de documento creado exitosamente.');
    }

    static async update(req, res) {
        const tipoActualizado = await TipoDocumento.update(req.params.id, req.body);
        if (!tipoActualizado) throw new NotFoundError('Tipo de Documento');
        ResponseHelper.updated(res, tipoActualizado, 'Tipo de documento actualizado exitosamente.');
    }

    static async delete(req, res) {
        const tipoEliminado = await TipoDocumento.delete(req.params.id);
        if (!tipoEliminado) throw new NotFoundError('Tipo de Documento');
        ResponseHelper.deleted(res, 'Tipo de documento eliminado exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const tipos = await TipoDocumento.findByDescripcion(descripcion);
        ResponseHelper.success(res, tipos);
    }
}

module.exports = TipoDocumentoController; 