const pool = require('../../shared/config/database');

class Vamunitran {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamunitran ORDER BY vuntcoduni ASC');
    return res.rows;
  }

  static async obtener(id) {
    const res = await pool.query('SELECT * FROM vamunitran WHERE vuntcoduni = $1', [id]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vuntnombre, vuntdirecc, vuntrespon, vunttelefo, vtutcodtut, sconnrocta, scondesccta } = data;
    const res = await pool.query(
      'INSERT INTO vamunitran (vuntnombre, vuntdirecc, vuntrespon, vunttelefo, vtutcodtut, sconnrocta, scondesccta) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [vuntnombre, vuntdirecc, vuntrespon, vunttelefo, vtutcodtut, sconnrocta, scondesccta]
    );
    return res.rows[0];
  }

  static async actualizar(id, data) {
    const { vuntnombre, vuntdirecc, vuntrespon, vunttelefo, vtutcodtut, sconnrocta, scondesccta } = data;
    const res = await pool.query(
      'UPDATE vamunitran SET vuntnombre = $1, vuntdirecc = $2, vuntrespon = $3, vunttelefo = $4, vtutcodtut = $5, sconnrocta = $6, scondesccta = $7 WHERE vuntcoduni = $8 RETURNING *',
      [vuntnombre, vuntdirecc, vuntrespon, vunttelefo, vtutcodtut, sconnrocta, scondesccta, id]
    );
    return res.rows[0];
  }

  static async eliminar(id) {
    const res = await pool.query('DELETE FROM vamunitran WHERE vuntcoduni = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

module.exports = Vamunitran;
