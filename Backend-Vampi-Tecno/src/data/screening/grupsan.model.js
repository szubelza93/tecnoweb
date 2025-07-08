import { pool } from '../../shared/config/db.js';

export class GrupSanModel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM vamGrupSan');
        return rows;
    }

    static async getById(vqrsCodGrs) {
        const { rows } = await pool.query(
            'SELECT * FROM vamGrupSan WHERE vqrsCodGrs = $1',
            [vqrsCodGrs]
        );
        return rows[0];
    }

    static async create(grupsan) {
        const { vqrsCodGrs, vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax } = grupsan;
        const { rows } = await pool.query(
            'INSERT INTO vamGrupSan (vqrsCodGrs, vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [vqrsCodGrs, vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax]
        );
        return rows[0];
    }

    static async update(vqrsCodGrs, { vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax }) {
        const { rows } = await pool.query(
            'UPDATE vamGrupSan SET vqrsGruABO = $1, vqrsTipoRH = $2, vprgCodPrg = $3, vprgEstMin = $4, vprgEstMax = $5 WHERE vqrsCodGrs = $6 RETURNING *',
            [vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax, vqrsCodGrs]
        );
        return rows[0];
    }

    static async delete(vqrsCodGrs) {
        const { rows } = await pool.query(
            'DELETE FROM vamGrupSan WHERE vqrsCodGrs = $1 RETURNING *',
            [vqrsCodGrs]
        );
        return rows[0];
    }
}
