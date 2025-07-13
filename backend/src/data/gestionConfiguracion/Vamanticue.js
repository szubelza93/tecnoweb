const pool = require('../../shared/config/database');

class Vamanticue {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamanticue ORDER BY vantcodant ASC');
    return res.rows;
  }

  static async obtener(id) {
    const res = await pool.query('SELECT * FROM vamanticue WHERE vantcodant = $1', [id]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vantdescri, vantcaract } = data;
    const res = await pool.query(
      'INSERT INTO vamanticue (vantdescri, vantcaract) VALUES ($1, $2) RETURNING *',
      [vantdescri, vantcaract]
    );
    return res.rows[0];
  }

  static async actualizar(id, data) {
    const { vantdescri, vantcaract } = data;
    const res = await pool.query(
      'UPDATE vamanticue SET vantdescri = $1, vantcaract = $2 WHERE vantcodant = $3 RETURNING *',
      [vantdescri, vantcaract, id]
    );
    return res.rows[0];
  }

  static async eliminar(id) {
    const res = await pool.query('DELETE FROM vamanticue WHERE vantcodant = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

module.exports = Vamanticue;
