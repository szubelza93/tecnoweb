const BolsaHe = require('../../data/gestionExtraccion/BolsaHe');
const ResponseHelper = require('../../shared/middlewares/responseHelper');
const { NotFoundError } = require('../../shared/middlewares/errorHandler');

class BolsaHeController {
    static async getAll(req, res) {
        const bolsas = await BolsaHe.findAll();
        ResponseHelper.success(res, bolsas);
    }

    static async getById(req, res) {
        const bolsa = await BolsaHe.findById(req.params.id);
        if (!bolsa) throw new NotFoundError('Bolsa Hematológica');
        ResponseHelper.success(res, bolsa);
    }
    
    static async create(req, res) {
        const nuevaBolsa = await BolsaHe.create(req.body);
        ResponseHelper.created(res, nuevaBolsa, 'Bolsa hematológica creada exitosamente.');
    }

    static async update(req, res) {
        const bolsaActualizada = await BolsaHe.update(req.params.id, req.body);
        if (!bolsaActualizada) throw new NotFoundError('Bolsa Hematológica');
        ResponseHelper.updated(res, bolsaActualizada, 'Bolsa hematológica actualizada exitosamente.');
    }

    static async delete(req, res) {
        const bolsaEliminada = await BolsaHe.delete(req.params.id);
        if (!bolsaEliminada) throw new NotFoundError('Bolsa Hematológica');
        ResponseHelper.deleted(res, 'Bolsa hematológica eliminada exitosamente.');
    }

    static async searchByDescripcion(req, res) {
        const { descripcion } = req.query;
        if (!descripcion) {
            return ResponseHelper.badRequest(res, 'El parámetro descripción es requerido');
        }
        const bolsas = await BolsaHe.findByDescripcion(descripcion);
        ResponseHelper.success(res, bolsas);
    }

    static async searchByTipo(req, res) {
        const { tipo } = req.query;
        if (!tipo) {
            return ResponseHelper.badRequest(res, 'El parámetro tipo es requerido');
        }
        const bolsas = await BolsaHe.findByTipo(tipo);
        ResponseHelper.success(res, bolsas);
    }

    static async searchByMarca(req, res) {
        const { marca } = req.query;
        if (!marca) {
            return ResponseHelper.badRequest(res, 'El parámetro marca es requerido');
        }
        const bolsas = await BolsaHe.findByMarca(marca);
        ResponseHelper.success(res, bolsas);
    }

    static async searchByCantidad(req, res) {
        const { min, max } = req.query;
        if (!min || !max) {
            return ResponseHelper.badRequest(res, 'Los parámetros min y max son requeridos');
        }
        const bolsas = await BolsaHe.findByCantidad(parseInt(min), parseInt(max));
        ResponseHelper.success(res, bolsas);
    }

    static async getStockInfo(req, res) {
        const stockInfo = await BolsaHe.getStockInfo();
        ResponseHelper.success(res, stockInfo);
    }
}

module.exports = BolsaHeController; 