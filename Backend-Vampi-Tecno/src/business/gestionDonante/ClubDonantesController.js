const ClubDonantes = require('../../data/gestionDonante/ClubDonantes');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class ClubDonantesController {
    static async getAll(req, res) {
        const clubs = await ClubDonantes.findAll();
        ResponseHelper.success(res, clubs);
    }

    static async getById(req, res) {
        const club = await ClubDonantes.findById(req.params.id);
        if (!club) throw new NotFoundError('Club de Donantes');
        ResponseHelper.success(res, club);
    }
    
    static async create(req, res) {
        const nuevoClub = await ClubDonantes.create(req.body);
        ResponseHelper.created(res, nuevoClub, 'Club de donantes creado exitosamente.');
    }

    static async update(req, res) {
        const clubActualizado = await ClubDonantes.update(req.params.id, req.body);
        if (!clubActualizado) throw new NotFoundError('Club de Donantes');
        ResponseHelper.updated(res, clubActualizado, 'Club de donantes actualizado exitosamente.');
    }

    static async delete(req, res) {
        const clubEliminado = await ClubDonantes.delete(req.params.id);
        if (!clubEliminado) throw new NotFoundError('Club de Donantes');
        ResponseHelper.deleted(res, 'Club de donantes eliminado exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const clubs = await ClubDonantes.findByDescripcion(descripcion);
        ResponseHelper.success(res, clubs);
    }

    static async searchByTelefono(req, res) {
        const { telefono } = req.query;
        if (!telefono) {
            return ResponseHelper.badRequest(res, 'El parámetro teléfono es requerido');
        }
        const clubs = await ClubDonantes.findByTelefono(telefono);
        ResponseHelper.success(res, clubs);
    }
}

module.exports = ClubDonantesController; 