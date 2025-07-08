const pool = require('../../shared/config/database');

class EquipoAlmacen {

  static async create(data) {
    const {
      vequCodEqu, vequDescn, vequCaract, vequTipEqu,
      vequTotF, vequTotCol, vequTemper
    } = data;
    
    const res = await pool.query(`
      INSERT INTO vamEquAlm (
        vequCodEqu, vequDescn, vequCaract, vequTipEqu,
        vequTotF, vequTotCol, vequTemper
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [
      vequCodEqu, vequDescn, vequCaract, vequTipEqu,
      vequTotF, vequTotCol, vequTemper
    ]);
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT * FROM vamEquAlm
      ORDER BY vequCodEqu DESC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT * FROM vamEquAlm
      WHERE vequCodEqu = $1
    `, [id]);
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(`
      SELECT * FROM vamEquAlm
      WHERE vequDescn ILIKE $1
      ORDER BY vequCodEqu DESC
    `, [`%${descripcion}%`]);
    return res.rows;
  }

  static async update(id, data) {
    const {
      vequDescn, vequCaract, vequTipEqu,
      vequTotF, vequTotCol, vequTemper
    } = data;
    
    const res = await pool.query(`
      UPDATE vamEquAlm SET
        vequDescn = $1, vequCaract = $2, vequTipEqu = $3,
        vequTotF = $4, vequTotCol = $5, vequTemper = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE vequCodEqu = $7
      RETURNING *
    `, [
      vequDescn, vequCaract, vequTipEqu,
      vequTotF, vequTotCol, vequTemper, id
    ]);
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query('DELETE FROM vamEquAlm WHERE vequCodEqu = $1 RETURNING *', [id]);
    return res.rows[0];
  }

  static async getAlmacenesByEquipo(equipoId) {
    const res = await pool.query(`
      SELECT a.*, e.vequDescn as equipo_descripcion
      FROM vamAlmacen a
      INNER JOIN vamEquAlm e ON a.vequCodEqu = e.vequCodEqu
      WHERE a.vequCodEqu = $1
      ORDER BY a.valmCodAlm
    `, [equipoId]);
    return res.rows;
  }

}

module.exports = EquipoAlmacen; 