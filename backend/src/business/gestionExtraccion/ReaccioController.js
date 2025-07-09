const Reaccio = require('../../data/gestionExtraccion/Reaccio');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class ReaccioController {
    static async getAll(req, res) {
        const reacciones = await Reaccio.findAll();
        ResponseHelper.success(res, reacciones);
    }

    static async getById(req, res) {
        const reaccion = await Reaccio.findById(req.params.id);
        if (!reaccion) throw new NotFoundError('Reacción');
        ResponseHelper.success(res, reaccion);
    }
    
    static async create(req, res) {
        const nuevaReaccion = await Reaccio.create(req.body);
        ResponseHelper.created(res, nuevaReaccion, 'Reacción creada exitosamente.');
    }

    static async update(req, res) {
        const reaccionActualizada = await Reaccio.update(req.params.id, req.body);
        if (!reaccionActualizada) throw new NotFoundError('Reacción');
        ResponseHelper.updated(res, reaccionActualizada, 'Reacción actualizada exitosamente.');
    }

    static async delete(req, res) {
        const reaccionEliminada = await Reaccio.delete(req.params.id);
        if (!reaccionEliminada) throw new NotFoundError('Reacción');
        ResponseHelper.deleted(res, 'Reacción eliminada exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const reacciones = await Reaccio.findByDescripcion(descripcion);
        ResponseHelper.success(res, reacciones);
    }

    static async searchByCaracteristica(req, res) {
        const { caracteristica } = req.query;
        if (!caracteristica) {
            return ResponseHelper.badRequest(res, 'El parámetro característica es requerido');
        }
        const reacciones = await Reaccio.findByCaracteristica(caracteristica);
        ResponseHelper.success(res, reacciones);
    }
}

module.exports = ReaccioController; 