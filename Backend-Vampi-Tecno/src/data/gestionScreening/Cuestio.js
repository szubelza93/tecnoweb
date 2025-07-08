const pool = require('../../shared/config/database');

class Cuestio {
  static async create(data) {
    const { vcueNroCue, vcueNroPre, vcuePregun, vcueOpcio1, vcueOpcio2, vcueRespue } = data;
    const res = await pool.query(
      'INSERT INTO vamCuestio (vcueNroCue, vcueNroPre, vcuePregun, vcueOpcio1, vcueOpcio2, vcueRespue) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [vcueNroCue, vcueNroPre, vcuePregun, vcueOpcio1, vcueOpcio2, vcueRespue]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT c.*, cn.vcueDescri as cuestionario_descripcion
      FROM vamCuestio c
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      ORDER BY c.vcueNroCue ASC, c.vcueNroPre ASC
    `);
    return res.rows;
  }

  static async findById(numeroCue, numeroPre) {
    const res = await pool.query(`
      SELECT c.*, cn.vcueDescri as cuestionario_descripcion
      FROM vamCuestio c
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE c.vcueNroCue = $1 AND c.vcueNroPre = $2
    `, [numeroCue, numeroPre]);
    return res.rows[0];
  }

  static async update(numeroCue, numeroPre, data) {
    const { vcuePregun, vcueOpcio1, vcueOpcio2, vcueRespue } = data;
    const res = await pool.query(
      'UPDATE vamCuestio SET vcuePregun = $1, vcueOpcio1 = $2, vcueOpcio2 = $3, vcueRespue = $4 WHERE vcueNroCue = $5 AND vcueNroPre = $6 RETURNING *',
      [vcuePregun, vcueOpcio1, vcueOpcio2, vcueRespue, numeroCue, numeroPre]
    );
    return res.rows[0];
  }

  static async delete(numeroCue, numeroPre) {
    const res = await pool.query(
      'DELETE FROM vamCuestio WHERE vcueNroCue = $1 AND vcueNroPre = $2 RETURNING *',
      [numeroCue, numeroPre]
    );
    return res.rows[0];
  }

  static async findByCuestionario(numeroCue) {
    const res = await pool.query(`
      SELECT c.*, cn.vcueDescri as cuestionario_descripcion
      FROM vamCuestio c
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE c.vcueNroCue = $1
      ORDER BY c.vcueNroPre ASC
    `, [numeroCue]);
    return res.rows;
  }

  static async findByPregunta(pregunta) {
    const res = await pool.query(`
      SELECT c.*, cn.vcueDescri as cuestionario_descripcion
      FROM vamCuestio c
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE c.vcuePregun ILIKE $1
      ORDER BY c.vcueNroCue ASC, c.vcueNroPre ASC
    `, [`%${pregunta}%`]);
    return res.rows;
  }

  static async findByRespuesta(respuesta) {
    const res = await pool.query(`
      SELECT c.*, cn.vcueDescri as cuestionario_descripcion
      FROM vamCuestio c
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE c.vcueRespue = $1
      ORDER BY c.vcueNroCue ASC, c.vcueNroPre ASC
    `, [respuesta]);
    return res.rows;
  }
}

module.exports = Cuestio; 