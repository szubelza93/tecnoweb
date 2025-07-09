import { pool } from '../../shared/config/db.js';

export class CuestioModel {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM vamCuestio');
        return rows;
    }

    static async getById(vcueNroCue, vcueNroPre) {
        const { rows } = await pool.query(
            'SELECT * FROM vamCuestio WHERE vcueNroCue = $1 AND vcueNroPre = $2',
            [vcueNroCue, vcueNroPre]
        );
        return rows[0];
    }

    static async create(cuestio) {
        const { vcueNroCue, vcueNroPre, vcuePregun, vcueOpcion1, vcueOpcion2, vcueRespu } = cuestio;
        const { rows } = await pool.query(
            'INSERT INTO vamCuestio (vcueNroCue, vcueNroPre, vcuePregun, vcueOpcion1, vcueOpcion2, vcueRespu) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [vcueNroCue, vcueNroPre, vcuePregun, vcueOpcion1, vcueOpcion2, vcueRespu]
        );
        return rows[0];
    }

    static async update(vcueNroCue, vcueNroPre, { vcuePregun, vcueOpcion1, vcueOpcion2, vcueRespu }) {
        const { rows } = await pool.query(
            'UPDATE vamCuestio SET vcuePregun = $1, vcueOpcion1 = $2, vcueOpcion2 = $3, vcueRespu = $4 WHERE vcueNroCue = $5 AND vcueNroPre = $6 RETURNING *',
            [vcuePregun, vcueOpcion1, vcueOpcion2, vcueRespu, vcueNroCue, vcueNroPre]
        );
        return rows[0];
    }

    static async delete(vcueNroCue, vcueNroPre) {
        const { rows } = await pool.query(
            'DELETE FROM vamCuestio WHERE vcueNroCue = $1 AND vcueNroPre = $2 RETURNING *',
            [vcueNroCue, vcueNroPre]
        );
        return rows[0];
    }
}
