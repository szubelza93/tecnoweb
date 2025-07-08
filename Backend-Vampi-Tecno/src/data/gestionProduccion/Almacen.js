const pool = require('../../shared/config/database');

class Almacen {

  static async create(data) {
    const {
      valmCodAlm, vequCodEqu, valmNroF, valmNroCol
    } = data;
    
    const res = await pool.query(`
      INSERT INTO vamAlmacen (
        valmCodAlm, vequCodEqu, "valmNroF#", valmNroCol
      ) VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [
      valmCodAlm, vequCodEqu, valmNroF, valmNroCol
    ]);
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT a.*, e.vequDescn as equipo_descripcion
      FROM vamAlmacen a
      INNER JOIN vamEquAlm e ON a.vequCodEqu = e.vequCodEqu
      ORDER BY a.valmCodAlm DESC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT a.*, e.vequDescn as equipo_descripcion
      FROM vamAlmacen a
      INNER JOIN vamEquAlm e ON a.vequCodEqu = e.vequCodEqu
      WHERE a.valmCodAlm = $1
    `, [id]);
    return res.rows[0];
  }

  static async findByEquipo(equipoId) {
    const res = await pool.query(`
      SELECT a.*, e.vequDescn as equipo_descripcion
      FROM vamAlmacen a
      INNER JOIN vamEquAlm e ON a.vequCodEqu = e.vequCodEqu
      WHERE a.vequCodEqu = $1
      ORDER BY a.valmCodAlm
    `, [equipoId]);
    return res.rows;
  }

  static async update(id, data) {
    const {
      vequCodEqu, valmNroF, valmNroCol
    } = data;
    
    const res = await pool.query(`
      UPDATE vamAlmacen SET
        vequCodEqu = $1, "valmNroF#" = $2, valmNroCol = $3
      WHERE valmCodAlm = $4
      RETURNING *
    `, [
      vequCodEqu, valmNroF, valmNroCol, id
    ]);
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query('DELETE FROM vamAlmacen WHERE valmCodAlm = $1 RETURNING *', [id]);
    return res.rows[0];
  }

  static async getDisponibilidad(equipoId) {
    const res = await pool.query(`
      SELECT 
        e.vequCodEqu,
        e.vequDescn,
        e.vequTotF as total_filas,
        e.vequTotCol as total_columnas,
        COUNT(a.valmCodAlm) as almacenes_ocupados,
        (e.vequTotF * e.vequTotCol) - COUNT(a.valmCodAlm) as espacios_disponibles
      FROM vamEquAlm e
      LEFT JOIN vamAlmacen a ON e.vequCodEqu = a.vequCodEqu
      WHERE e.vequCodEqu = $1
      GROUP BY e.vequCodEqu, e.vequDescn, e.vequTotF, e.vequTotCol
    `, [equipoId]);
    return res.rows[0];
  }

}

module.exports = Almacen; 