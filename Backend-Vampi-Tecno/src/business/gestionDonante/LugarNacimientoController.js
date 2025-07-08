const LugarNacimiento = require('../../data/gestionDonante/LugarNacimiento');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const errorHandler = require('../../shared/middlewares/errorHandler');
const { NotFoundError } = errorHandler;

class LugarNacimientoController {
    static async getAll(req, res) {
        const lugares = await LugarNacimiento.findAll();
        ResponseHelper.success(res, lugares);
    }

    static async getById(req, res) {
        const lugar = await LugarNacimiento.findById(req.params.id);
        if (!lugar) throw new NotFoundError('Lugar de Nacimiento');
        ResponseHelper.success(res, lugar);
    }
    
    static async create(req, res) {
        const nuevoLugar = await LugarNacimiento.create(req.body);
        ResponseHelper.created(res, nuevoLugar, 'Lugar de nacimiento creado exitosamente.');
    }

    static async update(req, res) {
        const lugarActualizado = await LugarNacimiento.update(req.params.id, req.body);
        if (!lugarActualizado) throw new NotFoundError('Lugar de Nacimiento');
        ResponseHelper.updated(res, lugarActualizado, 'Lugar de nacimiento actualizado exitosamente.');
    }

    static async delete(req, res) {
        const lugarEliminado = await LugarNacimiento.delete(req.params.id);
        if (!lugarEliminado) throw new NotFoundError('Lugar de Nacimiento');
        ResponseHelper.deleted(res, 'Lugar de nacimiento eliminado exitosamente.');
    }

    static async searchByCiudad(req, res) {
        const { ciudad } = req.query;
        if (!ciudad) {
            return ResponseHelper.badRequest(res, 'El parámetro ciudad es requerido');
        }
        const lugares = await LugarNacimiento.findByCiudad(ciudad);
        ResponseHelper.success(res, lugares);
    }

    static async searchByProvincia(req, res) {
        const { provincia } = req.query;
        if (!provincia) {
            return ResponseHelper.badRequest(res, 'El parámetro provincia es requerido');
        }
        const lugares = await LugarNacimiento.findByProvincia(provincia);
        ResponseHelper.success(res, lugares);
    }

    static async searchByPais(req, res) {
        const { pais } = req.query;
        if (!pais) {
            return ResponseHelper.badRequest(res, 'El parámetro país es requerido');
        }
        const lugares = await LugarNacimiento.findByPais(pais);
        ResponseHelper.success(res, lugares);
    }
}

module.exports = LugarNacimientoController; 