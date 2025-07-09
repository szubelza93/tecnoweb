const pool = require('../../shared/config/database');

class TipoDon {
  static async create(data) {
    const { vtdnCodTdn, vtdnDescn } = data;
    const res = await pool.query(
      'INSERT INTO vamTipoDon (vtdnCodTdn, vtdnDescn) VALUES ($1, $2) RETURNING *',
      [vtdnCodTdn, vtdnDescn]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamTipoDon ORDER BY vtdnCodTdn ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamTipoDon WHERE vtdnCodTdn = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vtdnDescn } = data;
    const res = await pool.query(
      'UPDATE vamTipoDon SET vtdnDescn = $1 WHERE vtdnCodTdn = $2 RETURNING *',
      [vtdnDescn, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamTipoDon WHERE vtdnCodTdn = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamTipoDon WHERE vtdnDescn ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }
}

module.exports = TipoDon; 