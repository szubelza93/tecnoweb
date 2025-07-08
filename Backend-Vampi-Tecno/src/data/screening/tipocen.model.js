import { pool } from '../../shared/config/db.js';

export class TipoCenModel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM vamTipoCen');
        return rows;
    }

    static async getById(viceCodTce) {
        const { rows } = await pool.query(
            'SELECT * FROM vamTipoCen WHERE viceCodTce = $1',
            [viceCodTce]
        );
        return rows[0];
    }

    static async create(tipocen) {
        const { viceCodTce, viceDescri } = tipocen;
        const { rows } = await pool.query(
            'INSERT INTO vamTipoCen (viceCodTce, viceDescri) VALUES ($1, $2) RETURNING *',
            [viceCodTce, viceDescri]
        );
        return rows[0];
    }

    static async update(viceCodTce, { viceDescri }) {
        const { rows } = await pool.query(
            'UPDATE vamTipoCen SET viceDescri = $1 WHERE viceCodTce = $2 RETURNING *',
            [viceDescri, viceCodTce]
        );
        return rows[0];
    }

    static async delete(viceCodTce) {
        const { rows } = await pool.query(
            'DELETE FROM vamTipoCen WHERE viceCodTce = $1 RETURNING *',
            [viceCodTce]
        );
        return rows[0];
    }
}
