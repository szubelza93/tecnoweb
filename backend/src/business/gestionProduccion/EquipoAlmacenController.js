const EquipoAlmacen = require('../../data/gestionProduccion/EquipoAlmacen');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class EquipoAlmacenController {
    static async getAll(req, res) {
        const equipos = await EquipoAlmacen.findAll();
        ResponseHelper.success(res, equipos);
    }

    static async getById(req, res) {
        const equipo = await EquipoAlmacen.findById(req.params.id);
        if (!equipo) throw new NotFoundError('Equipo de Almacén');
        ResponseHelper.success(res, equipo);
    }
    
    static async create(req, res) {
        const nuevoEquipo = await EquipoAlmacen.create(req.body);
        ResponseHelper.created(res, nuevoEquipo, 'Equipo de Almacén creado exitosamente.');
    }

    static async update(req, res) {
        const equipoActualizado = await EquipoAlmacen.update(req.params.id, req.body);
        if (!equipoActualizado) throw new NotFoundError('Equipo de Almacén');
        ResponseHelper.updated(res, equipoActualizado, 'Equipo de Almacén actualizado exitosamente.');
    }

    static async delete(req, res) {
        const equipoEliminado = await EquipoAlmacen.delete(req.params.id);
        if (!equipoEliminado) throw new NotFoundError('Equipo de Almacén');
        ResponseHelper.deleted(res, 'Equipo de Almacén eliminado exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripcion es requerido');
        }
        const equipos = await EquipoAlmacen.findByDescripcion(descripcion);
        ResponseHelper.success(res, equipos);
    }

    static async getAlmacenesByEquipo(req, res) {
        const almacenes = await EquipoAlmacen.getAlmacenesByEquipo(req.params.id);
        ResponseHelper.success(res, almacenes);
    }
}

module.exports = EquipoAlmacenController; 