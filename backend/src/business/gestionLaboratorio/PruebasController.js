const Pruebas = require('../../data/gestionLaboratorio/Pruebas');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class PruebasController {
    static async getAll(req, res) {
        const pruebas = await Pruebas.findAll();
        ResponseHelper.success(res, pruebas);
    }

    static async getById(req, res) {
        const prueba = await Pruebas.findById(req.params.id);
        if (!prueba) throw new NotFoundError('Prueba');
        ResponseHelper.success(res, prueba);
    }
    
    static async create(req, res) {
        const nuevaPrueba = await Pruebas.create(req.body);
        ResponseHelper.created(res, nuevaPrueba, 'Prueba creada exitosamente.');
    }

    static async update(req, res) {
        const pruebaActualizada = await Pruebas.update(req.params.id, req.body);
        if (!pruebaActualizada) throw new NotFoundError('Prueba');
        ResponseHelper.updated(res, pruebaActualizada, 'Prueba actualizada exitosamente.');
    }

    static async delete(req, res) {
        const pruebaEliminada = await Pruebas.delete(req.params.id);
        if (!pruebaEliminada) throw new NotFoundError('Prueba');
        ResponseHelper.deleted(res, 'Prueba eliminada exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripcion es requerido');
        }
        const pruebas = await Pruebas.findByDescripcion(descripcion);
        ResponseHelper.success(res, pruebas);
    }
}

module.exports = PruebasController; 