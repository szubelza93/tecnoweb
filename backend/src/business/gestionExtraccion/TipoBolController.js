const TipoBol = require('../../data/gestionExtraccion/TipoBol');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class TipoBolController {
    static async getAll(req, res) {
        const tipos = await TipoBol.findAll();
        ResponseHelper.success(res, tipos);
    }

    static async getById(req, res) {
        const tipo = await TipoBol.findById(req.params.id);
        if (!tipo) throw new NotFoundError('Tipo de Bolsa');
        ResponseHelper.success(res, tipo);
    }
    
    static async create(req, res) {
        const nuevoTipo = await TipoBol.create(req.body);
        ResponseHelper.created(res, nuevoTipo, 'Tipo de bolsa creado exitosamente.');
    }

    static async update(req, res) {
        const tipoActualizado = await TipoBol.update(req.params.id, req.body);
        if (!tipoActualizado) throw new NotFoundError('Tipo de Bolsa');
        ResponseHelper.updated(res, tipoActualizado, 'Tipo de bolsa actualizado exitosamente.');
    }

    static async delete(req, res) {
        const tipoEliminado = await TipoBol.delete(req.params.id);
        if (!tipoEliminado) throw new NotFoundError('Tipo de Bolsa');
        ResponseHelper.deleted(res, 'Tipo de bolsa eliminado exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const tipos = await TipoBol.findByDescripcion(descripcion);
        ResponseHelper.success(res, tipos);
    }

    static async searchByCaracteristica(req, res) {
        const { caracteristica } = req.query;
        if (!caracteristica) {
            return ResponseHelper.badRequest(res, 'El parámetro característica es requerido');
        }
        const tipos = await TipoBol.findByCaracteristica(caracteristica);
        ResponseHelper.success(res, tipos);
    }

    static async searchByNivel(req, res) {
        const { nivel } = req.query;
        if (!nivel) {
            return ResponseHelper.badRequest(res, 'El parámetro nivel es requerido');
        }
        const tipos = await TipoBol.findByNivel(nivel);
        ResponseHelper.success(res, tipos);
    }
}

module.exports = TipoBolController; 