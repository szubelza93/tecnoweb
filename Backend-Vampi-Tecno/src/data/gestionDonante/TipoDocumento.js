const pool = require('../../shared/config/database');

class TipoDocumento {
  static async create(data) {
    const { vtidCodTid, vtidDescr } = data;
    const res = await pool.query(
      'INSERT INTO vamTipoDid (vtidCodTid, vtidDescr) VALUES ($1, $2) RETURNING *',
      [vtidCodTid, vtidDescr]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamTipoDid ORDER BY vtidCodTid ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamTipoDid WHERE vtidCodTid = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vtidDescr } = data;
    const res = await pool.query(
      'UPDATE vamTipoDid SET vtidDescr = $1 WHERE vtidCodTid = $2 RETURNING *',
      [vtidDescr, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamTipoDid WHERE vtidCodTid = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamTipoDid WHERE vtidDescr ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }
}

module.exports = TipoDocumento; 