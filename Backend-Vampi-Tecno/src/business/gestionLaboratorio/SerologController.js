const Serolog = require('../../data/gestionLaboratorio/Serolog');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class SerologController {
    static async getAll(req, res) {
        const serologs = await Serolog.findAll();
        ResponseHelper.success(res, serologs);
    }

    static async getById(req, res) {
        const serolog = await Serolog.findById(req.params.id);
        if (!serolog) throw new NotFoundError('Serología');
        ResponseHelper.success(res, serolog);
    }
    
    static async create(req, res) {
        const nuevaSerolog = await Serolog.create(req.body);
        ResponseHelper.created(res, nuevaSerolog, 'Serología creada exitosamente.');
    }

    static async update(req, res) {
        const serologActualizada = await Serolog.update(req.params.id, req.body);
        if (!serologActualizada) throw new NotFoundError('Serología');
        ResponseHelper.updated(res, serologActualizada, 'Serología actualizada exitosamente.');
    }

    static async delete(req, res) {
        const serologEliminada = await Serolog.delete(req.params.id);
        if (!serologEliminada) throw new NotFoundError('Serología');
        ResponseHelper.deleted(res, 'Serología eliminada exitosamente.');
    }

    static async getByExtraccion(req, res) {
        const { vexdNroExd } = req.params;
        const serologs = await Serolog.findByExtraccion(vexdNroExd);
        ResponseHelper.success(res, serologs);
    }

    static async getByPrueba(req, res) {
        const { vpruCodPru } = req.params;
        const serologs = await Serolog.findByPrueba(vpruCodPru);
        ResponseHelper.success(res, serologs);
    }
}

module.exports = SerologController; 