const GradoInstruccion = require('../../data/gestionDonante/GradoInstruccion');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class GradoInstruccionController {
    static async getAll(req, res) {
        const grados = await GradoInstruccion.findAll();
        ResponseHelper.success(res, grados);
    }

    static async getById(req, res) {
        const grado = await GradoInstruccion.findById(req.params.id);
        if (!grado) throw new NotFoundError('Grado de Instrucción');
        ResponseHelper.success(res, grado);
    }
    
    static async create(req, res) {
        console.log('JSON recibido en el backend:', req.body);
        const nuevoGrado = await GradoInstruccion.create(req.body);
        ResponseHelper.created(res, nuevoGrado, 'Grado de instrucción creado exitosamente.');
    }

    static async update(req, res) {
        const gradoActualizado = await GradoInstruccion.update(req.params.id, req.body);
        if (!gradoActualizado) throw new NotFoundError('Grado de Instrucción');
        ResponseHelper.updated(res, gradoActualizado, 'Grado de instrucción actualizado exitosamente.');
    }

    static async delete(req, res) {
        const gradoEliminado = await GradoInstruccion.delete(req.params.id);
        if (!gradoEliminado) throw new NotFoundError('Grado de Instrucción');
        ResponseHelper.deleted(res, 'Grado de instrucción eliminado exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const grados = await GradoInstruccion.findByDescripcion(descripcion);
        ResponseHelper.success(res, grados);
    }
}

module.exports = GradoInstruccionController; 