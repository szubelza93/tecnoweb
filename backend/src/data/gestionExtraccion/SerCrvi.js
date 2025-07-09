const pool = require('../../shared/config/database');

class SerCrvi {
  static async create(data) {
    const { 
      vcviNroPru,
      vexdNroExd,
      vcviFecIni,
      vcviFecLib,
      vcviCodCrv,
      vcviNroFra,
      vresCodRes
    } = data;
    
    const res = await pool.query(
      `INSERT INTO vamSerCrvi (
        vcviNroPru, vexdNroExd, vcviFecIni, vcviFecLib, 
        vcviCodCrv, vcviNroFra, vresCodRes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [vcviNroPru, vexdNroExd, vcviFecIni, vcviFecLib, vcviCodCrv, vcviNroFra, vresCodRes]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      ORDER BY s.vcviNroPru DESC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      WHERE s.vcviNroPru = $1
    `, [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { 
      vexdNroExd,
      vcviFecIni,
      vcviFecLib,
      vcviCodCrv,
      vcviNroFra,
      vresCodRes
    } = data;
    
    const res = await pool.query(
      `UPDATE vamSerCrvi SET 
        vexdNroExd = $1, vcviFecIni = $2, vcviFecLib = $3,
        vcviCodCrv = $4, vcviNroFra = $5, vresCodRes = $6
      WHERE vcviNroPru = $7 RETURNING *`,
      [vexdNroExd, vcviFecIni, vcviFecLib, vcviCodCrv, vcviNroFra, vresCodRes, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamSerCrvi WHERE vcviNroPru = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByExtraccion(extraccionId) {
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      WHERE s.vexdNroExd = $1
    `, [extraccionId]);
    return res.rows;
  }

  static async findByFecha(fechaInicio, fechaFin) {
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      WHERE s.vcviFecIni BETWEEN $1 AND $2
    `, [fechaInicio, fechaFin]);
    return res.rows;
  }

  static async findByCodigoCriovinificacion(codigo) {
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      WHERE s.vcviCodCrv = $1
    `, [codigo]);
    return res.rows;
  }

  static async findByFraccion(fraccion) {
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      WHERE s.vcviNroFra = $1
    `, [fraccion]);
    return res.rows;
  }

  static async findByResponsable(responsableId) {
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      WHERE s.vresCodRes = $1
    `, [responsableId]);
    return res.rows;
  }

  static async findByEstadoLibreacion(estado) {
    let query = '';
    let params = [];
    
    if (estado === 'liberado') {
      query = `WHERE s.vcviFecLib IS NOT NULL`;
    } else if (estado === 'pendiente') {
      query = `WHERE s.vcviFecLib IS NULL`;
    }
    
    const res = await pool.query(`
      SELECT s.*, 
             e.vexdFecIni as extraccion_fecha_inicio,
             e.vexdFecFin as extraccion_fecha_fin,
             e.vexdResult as extraccion_resultado,
             e.vexdCantmi as extraccion_cantidad,
             b.vbolDescri as bolsa_descripcion
      FROM vamSerCrvi s 
      LEFT JOIN vamExtDona e ON s.vexdNroExd = e.vexdNroExd
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol
      ${query}
      ORDER BY s.vcviNroPru DESC
    `, params);
    return res.rows;
  }

  static async getEstadisticas() {
    const res = await pool.query(`
      SELECT 
        COUNT(*) as total_servicios,
        COUNT(CASE WHEN vcviFecLib IS NOT NULL THEN 1 END) as liberados,
        COUNT(CASE WHEN vcviFecLib IS NULL THEN 1 END) as pendientes,
        AVG(EXTRACT(EPOCH FROM (vcviFecLib - vcviFecIni))/3600) as tiempo_promedio_horas,
        COUNT(DISTINCT vcviCodCrv) as tipos_criovinificacion,
        COUNT(DISTINCT vresCodRes) as responsables_unicos
      FROM vamSerCrvi
      WHERE vcviFecIni IS NOT NULL
    `);
    return res.rows[0];
  }

  static async getServiciosPorMes() {
    const res = await pool.query(`
      SELECT 
        DATE_TRUNC('month', vcviFecIni) as mes,
        COUNT(*) as total_servicios,
        COUNT(CASE WHEN vcviFecLib IS NOT NULL THEN 1 END) as liberados,
        COUNT(CASE WHEN vcviFecLib IS NULL THEN 1 END) as pendientes
      FROM vamSerCrvi
      WHERE vcviFecIni IS NOT NULL
      GROUP BY DATE_TRUNC('month', vcviFecIni)
      ORDER BY mes DESC
    `);
    return res.rows;
  }
}

module.exports = SerCrvi; 