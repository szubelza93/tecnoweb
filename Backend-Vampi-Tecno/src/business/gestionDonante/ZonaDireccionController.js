const ZonaDireccion = require('../../data/gestionDonante/ZonaDireccion');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class ZonaDireccionController {
    static async getAll(req, res) {
        const zonas = await ZonaDireccion.findAll();
        ResponseHelper.success(res, zonas);
    }

    static async getById(req, res) {
        const zona = await ZonaDireccion.findById(req.params.id);
        if (!zona) throw new NotFoundError('Zona de Dirección');
        ResponseHelper.success(res, zona);
    }
    
    static async create(req, res) {
        const nuevaZona = await ZonaDireccion.create(req.body);
        ResponseHelper.created(res, nuevaZona, 'Zona de dirección creada exitosamente.');
    }

    static async update(req, res) {
        const zonaActualizada = await ZonaDireccion.update(req.params.id, req.body);
        if (!zonaActualizada) throw new NotFoundError('Zona de Dirección');
        ResponseHelper.updated(res, zonaActualizada, 'Zona de dirección actualizada exitosamente.');
    }

    static async delete(req, res) {
        const zonaEliminada = await ZonaDireccion.delete(req.params.id);
        if (!zonaEliminada) throw new NotFoundError('Zona de Dirección');
        ResponseHelper.deleted(res, 'Zona de dirección eliminada exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const zonas = await ZonaDireccion.findByDescripcion(descripcion);
        ResponseHelper.success(res, zonas);
    }

    static async searchByLugar(req, res) {
        const { lugCodLug } = req.query;
        if (!lugCodLug) {
            return ResponseHelper.badRequest(res, 'El parámetro lugCodLug es requerido');
        }
        const zonas = await ZonaDireccion.findByLugar(lugCodLug);
        ResponseHelper.success(res, zonas);
    }
}

module.exports = ZonaDireccionController;