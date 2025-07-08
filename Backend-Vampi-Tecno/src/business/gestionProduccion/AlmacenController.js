const Almacen = require('../../data/gestionProduccion/Almacen');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class AlmacenController {
    static async getAll(req, res) {
        const almacenes = await Almacen.findAll();
        ResponseHelper.success(res, almacenes);
    }

    static async getById(req, res) {
        const almacen = await Almacen.findById(req.params.id);
        if (!almacen) throw new NotFoundError('Almacén');
        ResponseHelper.success(res, almacen);
    }
    
    static async create(req, res) {
        const nuevoAlmacen = await Almacen.create(req.body);
        ResponseHelper.created(res, nuevoAlmacen, 'Almacén creado exitosamente.');
    }

    static async update(req, res) {
        const almacenActualizado = await Almacen.update(req.params.id, req.body);
        if (!almacenActualizado) throw new NotFoundError('Almacén');
        ResponseHelper.updated(res, almacenActualizado, 'Almacén actualizado exitosamente.');
    }

    static async delete(req, res) {
        const almacenEliminado = await Almacen.delete(req.params.id);
        if (!almacenEliminado) throw new NotFoundError('Almacén');
        ResponseHelper.deleted(res, 'Almacén eliminado exitosamente.');
    }

    static async getByEquipo(req, res) {
        const { equipoId } = req.params;
        const almacenes = await Almacen.findByEquipo(equipoId);
        ResponseHelper.success(res, almacenes);
    }

    static async getDisponibilidad(req, res) {
        const { equipoId } = req.params;
        const disponibilidad = await Almacen.getDisponibilidad(equipoId);
        if (!disponibilidad) throw new NotFoundError('Equipo de Almacén');
        ResponseHelper.success(res, disponibilidad);
    }
}

module.exports = AlmacenController; 