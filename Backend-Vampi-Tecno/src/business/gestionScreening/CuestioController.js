const Cuestio = require('../../data/gestionScreening/Cuestio');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class CuestioController {
    static async getAll(req, res) {
        const preguntas = await Cuestio.findAll();
        ResponseHelper.success(res, preguntas);
    }

    static async getById(req, res) {
        const { numeroCue, numeroPre } = req.params;
        const pregunta = await Cuestio.findById(numeroCue, numeroPre);
        if (!pregunta) throw new NotFoundError('Pregunta');
        ResponseHelper.success(res, pregunta);
    }
    
    static async create(req, res) {
        const nuevaPregunta = await Cuestio.create(req.body);
        ResponseHelper.created(res, nuevaPregunta, 'Pregunta creada exitosamente.');
    }

    static async update(req, res) {
        const { numeroCue, numeroPre } = req.params;
        const preguntaActualizada = await Cuestio.update(numeroCue, numeroPre, req.body);
        if (!preguntaActualizada) throw new NotFoundError('Pregunta');
        ResponseHelper.updated(res, preguntaActualizada, 'Pregunta actualizada exitosamente.');
    }

    static async delete(req, res) {
        const { numeroCue, numeroPre } = req.params;
        const preguntaEliminada = await Cuestio.delete(numeroCue, numeroPre);
        if (!preguntaEliminada) throw new NotFoundError('Pregunta');
        ResponseHelper.deleted(res, 'Pregunta eliminada exitosamente.');
    }

    static async searchByCuestionario(req, res) {
        const { numeroCue } = req.query;
        if (!numeroCue) {
            return ResponseHelper.badRequest(res, 'El parámetro numeroCue es requerido');
        }
        const preguntas = await Cuestio.findByCuestionario(numeroCue);
        ResponseHelper.success(res, preguntas);
    }

    static async searchByPregunta(req, res) {
        const { pregunta } = req.query;
        if (!pregunta) {
            return ResponseHelper.badRequest(res, 'El parámetro pregunta es requerido');
        }
        const preguntas = await Cuestio.findByPregunta(pregunta);
        ResponseHelper.success(res, preguntas);
    }

    static async searchByRespuesta(req, res) {
        const { respuesta } = req.query;
        if (!respuesta) {
            return ResponseHelper.badRequest(res, 'El parámetro respuesta es requerido');
        }
        const preguntas = await Cuestio.findByRespuesta(respuesta);
        ResponseHelper.success(res, preguntas);
    }
}

module.exports = CuestioController; 