const pool = require('../../shared/config/database');

class Reaccio {
  static async create(data) {
    const { vracCodRac, vracDescri, vracCaract } = data;
    const res = await pool.query(
      'INSERT INTO vamReaccio (vracCodRac, vracDescri, vracCaract) VALUES ($1, $2, $3) RETURNING *',
      [vracCodRac, vracDescri, vracCaract]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamReaccio ORDER BY vracCodRac ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamReaccio WHERE vracCodRac = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vracDescri, vracCaract } = data;
    const res = await pool.query(
      'UPDATE vamReaccio SET vracDescri = $1, vracCaract = $2 WHERE vracCodRac = $3 RETURNING *',
      [vracDescri, vracCaract, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamReaccio WHERE vracCodRac = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamReaccio WHERE vracDescri ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }

  static async findByCaracteristica(caracteristica) {
    const res = await pool.query(
      'SELECT * FROM vamReaccio WHERE vracCaract ILIKE $1',
      [`%${caracteristica}%`]
    );
    return res.rows;
  }
}

module.exports = Reaccio; 