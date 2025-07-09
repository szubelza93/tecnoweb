const ResPreg = require('../../data/gestionScreening/ResPreg');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class ResPregController {
    static async getAll(req, res) {
        const respuestas = await ResPreg.findAll();
        ResponseHelper.success(res, respuestas);
    }

    static async getById(req, res) {
        const { numeroScr, centro, numeroCue, numeroPre } = req.params;
        const respuesta = await ResPreg.findById(numeroScr, centro, numeroCue, numeroPre);
        if (!respuesta) throw new NotFoundError('Respuesta');
        ResponseHelper.success(res, respuesta);
    }
    
    static async create(req, res) {
        const nuevaRespuesta = await ResPreg.create(req.body);
        ResponseHelper.created(res, nuevaRespuesta, 'Respuesta creada exitosamente.');
    }

    static async update(req, res) {
        const { numeroScr, centro, numeroCue, numeroPre } = req.params;
        const respuestaActualizada = await ResPreg.update(numeroScr, centro, numeroCue, numeroPre, req.body);
        if (!respuestaActualizada) throw new NotFoundError('Respuesta');
        ResponseHelper.updated(res, respuestaActualizada, 'Respuesta actualizada exitosamente.');
    }

    static async delete(req, res) {
        const { numeroScr, centro, numeroCue, numeroPre } = req.params;
        const respuestaEliminada = await ResPreg.delete(numeroScr, centro, numeroCue, numeroPre);
        if (!respuestaEliminada) throw new NotFoundError('Respuesta');
        ResponseHelper.deleted(res, 'Respuesta eliminada exitosamente.');
    }

    static async searchByScreening(req, res) {
        const { numeroScr, centro } = req.query;
        if (!numeroScr || !centro) {
            return ResponseHelper.badRequest(res, 'Los parámetros numeroScr y centro son requeridos');
        }
        const respuestas = await ResPreg.findByScreening(numeroScr, centro);
        ResponseHelper.success(res, respuestas);
    }

    static async searchByCuestionario(req, res) {
        const { numeroCue } = req.query;
        if (!numeroCue) {
            return ResponseHelper.badRequest(res, 'El parámetro numeroCue es requerido');
        }
        const respuestas = await ResPreg.findByCuestionario(numeroCue);
        ResponseHelper.success(res, respuestas);
    }

    static async searchByRespuesta(req, res) {
        const { respuesta } = req.query;
        if (!respuesta) {
            return ResponseHelper.badRequest(res, 'El parámetro respuesta es requerido');
        }
        const respuestas = await ResPreg.findByRespuesta(respuesta);
        ResponseHelper.success(res, respuestas);
    }

    static async getEstadisticas(req, res) {
        const estadisticas = await ResPreg.getEstadisticas();
        ResponseHelper.success(res, estadisticas);
    }
}

module.exports = ResPregController; 