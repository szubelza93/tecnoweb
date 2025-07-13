const pool = require('../../shared/config/database');

class Vamcentdon {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamcentdon ORDER BY vcencodcen ASC');
    return res.rows;
  }

  static async obtener(id) {
    const res = await pool.query('SELECT * FROM vamcentdon WHERE vcencodcen = $1', [id]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vcennombre, vcendirecc, vcentelefo, vtcecodtce } = data;
    const res = await pool.query(
      'INSERT INTO vamcentdon (vcennombre, vcendirecc, vcentelefo, vtcecodtce) VALUES ($1, $2, $3, $4) RETURNING *',
      [vcennombre, vcendirecc, vcentelefo, vtcecodtce]
    );
    return res.rows[0];
  }

  static async actualizar(id, data) {
    const { vcennombre, vcendirecc, vcentelefo, vtcecodtce } = data;
    const res = await pool.query(
      'UPDATE vamcentdon SET vcennombre = $1, vcendirecc = $2, vcentelefo = $3, vtcecodtce = $4 WHERE vcencodcen = $5 RETURNING *',
      [vcennombre, vcendirecc, vcentelefo, vtcecodtce, id]
    );
    return res.rows[0];
  }

  static async eliminar(id) {
    const res = await pool.query('DELETE FROM vamcentdon WHERE vcencodcen = $1 RETURNING *', [id]);
    return res.rows[0];
  }
}

module.exports = Vamcentdon;
