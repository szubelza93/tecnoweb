const Ocupacion = require('../../data/gestionDonante/Ocupacion');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class OcupacionController {
    static async getAll(req, res) {
        const ocupaciones = await Ocupacion.findAll();
        ResponseHelper.success(res, ocupaciones);
    }

    static async getById(req, res) {
        const ocupacion = await Ocupacion.findById(req.params.id);
        if (!ocupacion) throw new NotFoundError('Ocupación');
        ResponseHelper.success(res, ocupacion);
    }
    
    static async create(req, res) {
        const nuevaOcupacion = await Ocupacion.create(req.body);
        ResponseHelper.created(res, nuevaOcupacion, 'Ocupación creada exitosamente.');
    }

    static async update(req, res) {
        const ocupacionActualizada = await Ocupacion.update(req.params.id, req.body);
        if (!ocupacionActualizada) throw new NotFoundError('Ocupación');
        ResponseHelper.updated(res, ocupacionActualizada, 'Ocupación actualizada exitosamente.');
    }

    static async delete(req, res) {
        const ocupacionEliminada = await Ocupacion.delete(req.params.id);
        if (!ocupacionEliminada) throw new NotFoundError('Ocupación');
        ResponseHelper.deleted(res, 'Ocupación eliminada exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const ocupaciones = await Ocupacion.findByDescripcion(descripcion);
        ResponseHelper.success(res, ocupaciones);
    }
}

module.exports = OcupacionController; 