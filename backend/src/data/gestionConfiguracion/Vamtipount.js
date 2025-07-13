const pool = require('../../shared/config/database');

class Vamtipount {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamtipount ORDER BY vtutcodtut ASC');
    return res.rows;
  }

  static async obtener(id) {
    const res = await pool.query('SELECT * FROM vamtipount WHERE vtutcodtut = $1', [id]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vtutdescri } = data;
    const res = await pool.query(
      'INSERT INTO vamtipount (vtutdescri) VALUES ($1) RETURNING *',
      [vtutdescri]
    );
    return res.rows[0];
  }

  static async actualizar(id, data) {
    const { vtutdescri } = data;
    const res = await pool.query(
      'UPDATE vamtipount SET vtutdescri = $1 WHERE vtutcodtut = $2 RETURNING *',
      [vtutdescri, id]
    );
    return res.rows[0];
  }

  static async eliminar(id) {
    const res = await pool.query('DELETE FROM vamtipount WHERE vtutcodtut = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

module.exports = Vamtipount;
