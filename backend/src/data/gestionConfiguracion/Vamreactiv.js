const pool = require('../../shared/config/database');

class Vamreactiv {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamreactiv ORDER BY vreacodrea ASC');
    return res.rows;
  }

  static async obtener(id) {
    const res = await pool.query('SELECT * FROM vamreactiv WHERE vreacodrea = $1', [id]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vreadescri, vreacaract, vreaingres, vreasalida, vreacantid } = data;
    const res = await pool.query(
      'INSERT INTO vamreactiv (vreadescri, vreacaract, vreaingres, vreasalida, vreacantid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [vreadescri, vreacaract, vreaingres, vreasalida, vreacantid]
    );
    return res.rows[0];
  }

  static async actualizar(id, data) {
    const { vreadescri, vreacaract, vreaingres, vreasalida, vreacantid } = data;
    const res = await pool.query(
      'UPDATE vamreactiv SET vreadescri = $1, vreacaract = $2, vreaingres = $3, vreasalida = $4, vreacantid = $5 WHERE vreacodrea = $6 RETURNING *',
      [vreadescri, vreacaract, vreaingres, vreasalida, vreacantid, id]
    );
    return res.rows[0];
  }

  static async eliminar(id) {
    const res = await pool.query('DELETE FROM vamreactiv WHERE vreacodrea = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

module.exports = Vamreactiv;
