const pool = require('../../shared/config/database');

class Vamtipocen {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamtipocen ORDER BY vtcecodtce ASC');
    return res.rows;
  }

  static async obtener(id) {
    const res = await pool.query('SELECT * FROM vamtipocen WHERE vtcecodtce = $1', [id]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vtcedescri } = data;
    const res = await pool.query(
      'INSERT INTO vamtipocen (vtcedescri) VALUES ($1) RETURNING *',
      [vtcedescri]
    );
    return res.rows[0];
  }

  static async actualizar(id, data) {
    const { vtcedescri } = data;
    const res = await pool.query(
      'UPDATE vamtipocen SET vtcedescri = $1 WHERE vtcecodtce = $2 RETURNING *',
      [vtcedescri, id]
    );
    return res.rows[0];
  }

  static async eliminar(id) {
    const res = await pool.query('DELETE FROM vamtipocen WHERE vtcecodtce = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

module.exports = Vamtipocen;
