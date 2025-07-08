const pool = require('../../shared/config/database');

class CuesNro {
  static async create(data) {
    const { vcueNroCue, vcueDescri } = data;
    const res = await pool.query(
      'INSERT INTO vamCuesNro (vcueNroCue, vcueDescri) VALUES ($1, $2) RETURNING *',
      [vcueNroCue, vcueDescri]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamCuesNro ORDER BY vcueNroCue ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamCuesNro WHERE vcueNroCue = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vcueDescri } = data;
    const res = await pool.query(
      'UPDATE vamCuesNro SET vcueDescri = $1 WHERE vcueNroCue = $2 RETURNING *',
      [vcueDescri, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamCuesNro WHERE vcueNroCue = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamCuesNro WHERE vcueDescri ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }
}

module.exports = CuesNro; 