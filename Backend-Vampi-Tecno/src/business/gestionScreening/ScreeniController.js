const Screeni = require('../../data/gestionScreening/Screeni');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class ScreeniController {
    static async getAll(req, res) {
        const screenings = await Screeni.findAll();
        ResponseHelper.success(res, screenings);
    }

    static async getById(req, res) {
        const { numeroScr, centro } = req.params;
        const screening = await Screeni.findById(numeroScr, centro);
        if (!screening) throw new NotFoundError('Screening');
        ResponseHelper.success(res, screening);
    }
    
    static async create(req, res) {
        const nuevoScreening = await Screeni.create(req.body);
        ResponseHelper.created(res, nuevoScreening, 'Screening creado exitosamente.');
    }

    static async update(req, res) {
        const { numeroScr, centro } = req.params;
        const screeningActualizado = await Screeni.update(numeroScr, centro, req.body);
        if (!screeningActualizado) throw new NotFoundError('Screening');
        ResponseHelper.updated(res, screeningActualizado, 'Screening actualizado exitosamente.');
    }

    static async delete(req, res) {
        const { numeroScr, centro } = req.params;
        const screeningEliminado = await Screeni.delete(numeroScr, centro);
        if (!screeningEliminado) throw new NotFoundError('Screening');
        ResponseHelper.deleted(res, 'Screening eliminado exitosamente.');
    }

    static async searchByDonante(req, res) {
        const { donanteId } = req.query;
        if (!donanteId) {
            return ResponseHelper.badRequest(res, 'El parámetro donanteId es requerido');
        }
        const screenings = await Screeni.findByDonante(donanteId);
        ResponseHelper.success(res, screenings);
    }

    static async searchByCentro(req, res) {
        const { centroId } = req.query;
        if (!centroId) {
            return ResponseHelper.badRequest(res, 'El parámetro centroId es requerido');
        }
        const screenings = await Screeni.findByCentro(centroId);
        ResponseHelper.success(res, screenings);
    }

    static async searchByFecha(req, res) {
        const { fechaInicio, fechaFin } = req.query;
        if (!fechaInicio || !fechaFin) {
            return ResponseHelper.badRequest(res, 'Los parámetros fechaInicio y fechaFin son requeridos');
        }
        const screenings = await Screeni.findByFecha(fechaInicio, fechaFin);
        ResponseHelper.success(res, screenings);
    }

    static async searchByEtiqueta(req, res) {
        const { etiqueta } = req.query;
        if (!etiqueta) {
            return ResponseHelper.badRequest(res, 'El parámetro etiqueta es requerido');
        }
        const screenings = await Screeni.findByEtiqueta(etiqueta);
        ResponseHelper.success(res, screenings);
    }

    static async searchByGrupoSanguineo(req, res) {
        const { grupoSanguineoId } = req.query;
        if (!grupoSanguineoId) {
            return ResponseHelper.badRequest(res, 'El parámetro grupoSanguineoId es requerido');
        }
        const screenings = await Screeni.findByGrupoSanguineo(grupoSanguineoId);
        ResponseHelper.success(res, screenings);
    }

    static async getEstadisticas(req, res) {
        const estadisticas = await Screeni.getEstadisticas();
        ResponseHelper.success(res, estadisticas);
    }
}

module.exports = ScreeniController; 