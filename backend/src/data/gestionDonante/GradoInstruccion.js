const pool = require('../../shared/config/database');

class GradoInstruccion {
  static async create(data) {
    const { vgraCodGra, vgraDescrn } = data;
    const res = await pool.query(
      'INSERT INTO vamGradIns (vgraCodGra, vgraDescrn) VALUES ($1, $2) RETURNING *',
      [vgraCodGra, vgraDescrn]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamGradIns ORDER BY vgraCodGra ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamGradIns WHERE vgraCodGra = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vgraDescrn } = data;
    const res = await pool.query(
      'UPDATE vamGradIns SET vgraDescrn = $1 WHERE vgraCodGra = $2 RETURNING *',
      [vgraDescrn, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamGradIns WHERE vgraCodGra = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamGradIns WHERE vgraDescrn ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }
}

module.exports = GradoInstruccion; 