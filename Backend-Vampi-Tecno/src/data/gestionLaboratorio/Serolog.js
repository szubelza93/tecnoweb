const pool = require('../../shared/config/database');

class Serolog {

  static async create(data) {
    const {
      vserNroPru, vexdNroExd, vpruCodPru, vpatCodPat, vreaCodRea,
      vserResult, vserEnvCne, vserResCne, vresCodRes, vserCanPru, vserFecSer
    } = data;
    
    const res = await pool.query(`
      INSERT INTO vamSerolog (
        vserNroPru, vexdNroExd, vpruCodPru, vpatCodPat, vreaCodRea,
        vserResult, vserEnvCne, vserResCne, vresCodRes, vserCanPru, vserFecSer
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      vserNroPru, vexdNroExd, vpruCodPru, vpatCodPat, vreaCodRea,
      vserResult, vserEnvCne, vserResCne, vresCodRes, vserCanPru, vserFecSer
    ]);
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT 
        s.*,
        p.vpruDescri as prueba_descripcion,
        e.vexdNroExd as extraccion_numero
      FROM vamSerolog s
      LEFT JOIN vamPruebas p ON s.vpruCodPru = p.vpruCodPru
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      ORDER BY s.vserNroPru DESC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT 
        s.*,
        p.vpruDescri as prueba_descripcion,
        e.vexdNroExd as extraccion_numero
      FROM vamSerolog s
      LEFT JOIN vamPruebas p ON s.vpruCodPru = p.vpruCodPru
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      WHERE s.vserNroPru = $1
    `, [id]);
    return res.rows[0];
  }

  static async findByExtraccion(vexdNroExd) {
    const res = await pool.query(`
      SELECT 
        s.*,
        p.vpruDescri as prueba_descripcion,
        e.vexdNroExd as extraccion_numero
      FROM vamSerolog s
      LEFT JOIN vamPruebas p ON s.vpruCodPru = p.vpruCodPru
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      WHERE s.vexdNroExd = $1
      ORDER BY s.vserNroPru DESC
    `, [vexdNroExd]);
    return res.rows;
  }

  static async findByPrueba(vpruCodPru) {
    const res = await pool.query(`
      SELECT 
        s.*,
        p.vpruDescri as prueba_descripcion,
        e.vexdNroExd as extraccion_numero
      FROM vamSerolog s
      LEFT JOIN vamPruebas p ON s.vpruCodPru = p.vpruCodPru
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      WHERE s.vpruCodPru = $1
      ORDER BY s.vserNroPru DESC
    `, [vpruCodPru]);
    return res.rows;
  }

  static async update(id, data) {
    const {
      vexdNroExd, vpruCodPru, vpatCodPat, vreaCodRea,
      vserResult, vserEnvCne, vserResCne, vresCodRes, vserCanPru, vserFecSer
    } = data;
    
    const res = await pool.query(`
      UPDATE vamSerolog SET
        vexdNroExd = $1, vpruCodPru = $2, vpatCodPat = $3, vreaCodRea = $4,
        vserResult = $5, vserEnvCne = $6, vserResCne = $7, vresCodRes = $8, 
        vserCanPru = $9, vserFecSer = $10, updated_at = CURRENT_TIMESTAMP
      WHERE vserNroPru = $11
      RETURNING *
    `, [
      vexdNroExd, vpruCodPru, vpatCodPat, vreaCodRea,
      vserResult, vserEnvCne, vserResCne, vresCodRes, vserCanPru, vserFecSer, id
    ]);
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query('DELETE FROM vamSerolog WHERE vserNroPru = $1 RETURNING *', [id]);
    return res.rows[0];
  }

}

module.exports = Serolog; 