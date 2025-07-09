const pool = require('../../shared/config/database');

class ResPreg {
  static async create(data) {
    const { vscrNroScr, vcenCodCen, vcueNroCue, vcueNroPre, vrepResPre } = data;
    const res = await pool.query(
      'INSERT INTO vamResPreg (vscrNroScr, vcenCodCen, vcueNroCue, vcueNroPre, vrepResPre) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [vscrNroScr, vcenCodCen, vcueNroCue, vcueNroPre, vrepResPre]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT rp.*, 
             s.vdonCodDon, s.vscrFechas,
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             c.vcuePregun, c.vcueOpcio1, c.vcueOpcio2, c.vcueRespue,
             cn.vcueDescri as cuestionario_descripcion
      FROM vamResPreg rp
      LEFT JOIN vamScreeni s ON rp.vscrNroScr = s.vscrNroScr AND rp.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamCuestio c ON rp.vcueNroCue = c.vcueNroCue AND rp.vcueNroPre = c.vcueNroPre
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      ORDER BY rp.vscrNroScr ASC, rp.vcenCodCen ASC, rp.vcueNroCue ASC, rp.vcueNroPre ASC
    `);
    return res.rows;
  }

  static async findById(numeroScr, centro, numeroCue, numeroPre) {
    const res = await pool.query(`
      SELECT rp.*, 
             s.vdonCodDon, s.vscrFechas,
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             c.vcuePregun, c.vcueOpcio1, c.vcueOpcio2, c.vcueRespue,
             cn.vcueDescri as cuestionario_descripcion
      FROM vamResPreg rp
      LEFT JOIN vamScreeni s ON rp.vscrNroScr = s.vscrNroScr AND rp.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamCuestio c ON rp.vcueNroCue = c.vcueNroCue AND rp.vcueNroPre = c.vcueNroPre
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE rp.vscrNroScr = $1 AND rp.vcenCodCen = $2 AND rp.vcueNroCue = $3 AND rp.vcueNroPre = $4
    `, [numeroScr, centro, numeroCue, numeroPre]);
    return res.rows[0];
  }

  static async update(numeroScr, centro, numeroCue, numeroPre, data) {
    const { vrepResPre } = data;
    const res = await pool.query(
      'UPDATE vamResPreg SET vrepResPre = $1 WHERE vscrNroScr = $2 AND vcenCodCen = $3 AND vcueNroCue = $4 AND vcueNroPre = $5 RETURNING *',
      [vrepResPre, numeroScr, centro, numeroCue, numeroPre]
    );
    return res.rows[0];
  }

  static async delete(numeroScr, centro, numeroCue, numeroPre) {
    const res = await pool.query(
      'DELETE FROM vamResPreg WHERE vscrNroScr = $1 AND vcenCodCen = $2 AND vcueNroCue = $3 AND vcueNroPre = $4 RETURNING *',
      [numeroScr, centro, numeroCue, numeroPre]
    );
    return res.rows[0];
  }

  static async findByScreening(numeroScr, centro) {
    const res = await pool.query(`
      SELECT rp.*, 
             s.vdonCodDon, s.vscrFechas,
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             c.vcuePregun, c.vcueOpcio1, c.vcueOpcio2, c.vcueRespue,
             cn.vcueDescri as cuestionario_descripcion
      FROM vamResPreg rp
      LEFT JOIN vamScreeni s ON rp.vscrNroScr = s.vscrNroScr AND rp.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamCuestio c ON rp.vcueNroCue = c.vcueNroCue AND rp.vcueNroPre = c.vcueNroPre
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE rp.vscrNroScr = $1 AND rp.vcenCodCen = $2
      ORDER BY rp.vcueNroCue ASC, rp.vcueNroPre ASC
    `, [numeroScr, centro]);
    return res.rows;
  }

  static async findByCuestionario(numeroCue) {
    const res = await pool.query(`
      SELECT rp.*, 
             s.vdonCodDon, s.vscrFechas,
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             c.vcuePregun, c.vcueOpcio1, c.vcueOpcio2, c.vcueRespue,
             cn.vcueDescri as cuestionario_descripcion
      FROM vamResPreg rp
      LEFT JOIN vamScreeni s ON rp.vscrNroScr = s.vscrNroScr AND rp.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamCuestio c ON rp.vcueNroCue = c.vcueNroCue AND rp.vcueNroPre = c.vcueNroPre
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE rp.vcueNroCue = $1
      ORDER BY rp.vscrNroScr ASC, rp.vcenCodCen ASC, rp.vcueNroPre ASC
    `, [numeroCue]);
    return res.rows;
  }

  static async findByRespuesta(respuesta) {
    const res = await pool.query(`
      SELECT rp.*, 
             s.vdonCodDon, s.vscrFechas,
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             c.vcuePregun, c.vcueOpcio1, c.vcueOpcio2, c.vcueRespue,
             cn.vcueDescri as cuestionario_descripcion
      FROM vamResPreg rp
      LEFT JOIN vamScreeni s ON rp.vscrNroScr = s.vscrNroScr AND rp.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamCuestio c ON rp.vcueNroCue = c.vcueNroCue AND rp.vcueNroPre = c.vcueNroPre
      LEFT JOIN vamCuesNro cn ON c.vcueNroCue = cn.vcueNroCue
      WHERE rp.vrepResPre = $1
      ORDER BY rp.vscrNroScr ASC, rp.vcenCodCen ASC, rp.vcueNroCue ASC, rp.vcueNroPre ASC
    `, [respuesta]);
    return res.rows;
  }

  static async getEstadisticas() {
    const res = await pool.query(`
      SELECT 
        COUNT(*) as total_respuestas,
        COUNT(CASE WHEN vrepResPre = 'S' THEN 1 END) as respuestas_si,
        COUNT(CASE WHEN vrepResPre = 'N' THEN 1 END) as respuestas_no,
        COUNT(CASE WHEN vrepResPre IS NULL THEN 1 END) as respuestas_pendientes
      FROM vamResPreg
    `);
    return res.rows[0];
  }
}

module.exports = ResPreg; 