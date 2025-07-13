const pool = require('../../shared/config/database');

class VamCuestio {
  static async listar() {
    const res = await pool.query('SELECT * FROM vamcuestio ORDER BY vcuenrocue ASC, vcuenropre ASC');
    return res.rows;
  }

  static async obtener(vcuenropre) {
    const res = await pool.query('SELECT * FROM vamcuestio WHERE vcuenropre = $1', [vcuenropre]);
    return res.rows[0];
  }

  static async crear(data) {
    const { vcuenrocue, vcuepregun, vcueopcio1, vcueopcio2, vcuerespue } = data;
    const res = await pool.query(
      'INSERT INTO vamcuestio (vcuenrocue, vcuepregun, vcueopcio1, vcueopcio2, vcuerespue) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [vcuenrocue, vcuepregun, vcueopcio1, vcueopcio2, vcuerespue]
    );
    return res.rows[0];
  }

  static async actualizar(vcuenropre, data) {
    const { vcuepregun, vcueopcio1, vcueopcio2, vcuerespue } = data;
    const res = await pool.query(
      'UPDATE vamcuestio SET vcuepregun = $1, vcueopcio1 = $2, vcueopcio2 = $3, vcuerespue = $4 WHERE vcuenropre = $5 RETURNING *',
      [vcuepregun, vcueopcio1, vcueopcio2, vcuerespue, vcuenropre]
    );
    return res.rows[0];
  }

  static async eliminar(vcuenropre) {
    const res = await pool.query('DELETE FROM vamcuestio WHERE vcuenropre = $1 RETURNING *', [vcuenropre]);
    return res.rows[0];
  }
}

module.exports = VamCuestio;
