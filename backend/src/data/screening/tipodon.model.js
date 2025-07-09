import { pool } from '../../shared/config/db.js';

export class TipoDonModel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM vamTipoDon');
        return rows;
    }

    static async getById(vtdnCodTdn) {
        const { rows } = await pool.query(
            'SELECT * FROM vamTipoDon WHERE vtdnCodTdn = $1',
            [vtdnCodTdn]
        );
        return rows[0];
    }

    static async create(tipodon) {
        const { vtdnCodTdn, vtdnDescn } = tipodon;
        const { rows } = await pool.query(
            'INSERT INTO vamTipoDon (vtdnCodTdn, vtdnDescn) VALUES ($1, $2) RETURNING *',
            [vtdnCodTdn, vtdnDescn]
        );
        return rows[0];
    }

    static async update(vtdnCodTdn, { vtdnDescn }) {
        const { rows } = await pool.query(
            'UPDATE vamTipoDon SET vtdnDescn = $1 WHERE vtdnCodTdn = $2 RETURNING *',
            [vtdnDescn, vtdnCodTdn]
        );
        return rows[0];
    }

    static async delete(vtdnCodTdn) {
        const { rows } = await pool.query(
            'DELETE FROM vamTipoDon WHERE vtdnCodTdn = $1 RETURNING *',
            [vtdnCodTdn]
        );
        return rows[0];
    }
}
