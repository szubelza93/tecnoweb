const pool = require('../../shared/config/database');

class VamRefrige {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamrefrige ORDER BY vrefcodref ASC');
    return res.rows;
  }

  static async obtener(id) {
    const res = await pool.query('SELECT * FROM vamrefrige WHERE vrefcodref = $1', [id]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vrefdescri, vrefcaract, vrefingres, vrefsalida, vrefcantid } = data;
    const res = await pool.query(
      `INSERT INTO vamrefrige (vrefdescri, vrefcaract, vrefingres, vrefsalida, vrefcantid)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [vrefdescri, vrefcaract, vrefingres, vrefsalida, vrefcantid]
    );
    return res.rows[0];
  }

  static async actualizar(id, data) {
    const { vrefdescri, vrefcaract, vrefingres, vrefsalida, vrefcantid } = data;
    const res = await pool.query(
      `UPDATE vamrefrige SET vrefdescri=$1, vrefcaract=$2, vrefingres=$3, vrefsalida=$4, vrefcantid=$5
       WHERE vrefcodref=$6 RETURNING *`,
      [vrefdescri, vrefcaract, vrefingres, vrefsalida, vrefcantid, id]
    );
    return res.rows[0];
  }

  static async eliminar(id) {
    const res = await pool.query('DELETE FROM vamrefrige WHERE vrefcodref = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

module.exports = VamRefrige; 