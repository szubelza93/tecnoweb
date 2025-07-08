const pool = require('../../shared/config/database');

class BolsaHe {
  static async create(data) {
    const { 
      vbolCodBol, 
      vbolCodTbl, 
      vbolDescri, 
      vbolMarcab, 
      vbolRendm, 
      vbolIngres, 
      vbolSalida, 
      vbolCantid 
    } = data;
    
    const res = await pool.query(
      `INSERT INTO vamBolsaHe (
        vbolCodBol, vbolCodTbl, vbolDescri, vbolMarcab, 
        vbolRendm, vbolIngres, vbolSalida, vbolCantid
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [vbolCodBol, vbolCodTbl, vbolDescri, vbolMarcab, vbolRendm, vbolIngres, vbolSalida, vbolCantid]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT b.*, t.vtblDescri as tipo_descripcion 
      FROM vamBolsaHe b 
      LEFT JOIN vamTipoBoi t ON b.vbolCodTbl = t.vtblCodTbl 
      ORDER BY b.vbolCodBol ASC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT b.*, t.vtblDescri as tipo_descripcion 
      FROM vamBolsaHe b 
      LEFT JOIN vamTipoBoi t ON b.vbolCodTbl = t.vtblCodTbl 
      WHERE b.vbolCodBol = $1
    `, [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { 
      vbolCodTbl, 
      vbolDescri, 
      vbolMarcab, 
      vbolRendm, 
      vbolIngres, 
      vbolSalida, 
      vbolCantid 
    } = data;
    
    const res = await pool.query(
      `UPDATE vamBolsaHe SET 
        vbolCodTbl = $1, vbolDescri = $2, vbolMarcab = $3, 
        vbolRendm = $4, vbolIngres = $5, vbolSalida = $6, vbolCantid = $7 
      WHERE vbolCodBol = $8 RETURNING *`,
      [vbolCodTbl, vbolDescri, vbolMarcab, vbolRendm, vbolIngres, vbolSalida, vbolCantid, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamBolsaHe WHERE vbolCodBol = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(`
      SELECT b.*, t.vtblDescri as tipo_descripcion 
      FROM vamBolsaHe b 
      LEFT JOIN vamTipoBoi t ON b.vbolCodTbl = t.vtblCodTbl 
      WHERE b.vbolDescri ILIKE $1
    `, [`%${descripcion}%`]);
    return res.rows;
  }

  static async findByTipo(tipoId) {
    const res = await pool.query(`
      SELECT b.*, t.vtblDescri as tipo_descripcion 
      FROM vamBolsaHe b 
      LEFT JOIN vamTipoBoi t ON b.vbolCodTbl = t.vtblCodTbl 
      WHERE b.vbolCodTbl = $1
    `, [tipoId]);
    return res.rows;
  }

  static async findByMarca(marca) {
    const res = await pool.query(`
      SELECT b.*, t.vtblDescri as tipo_descripcion 
      FROM vamBolsaHe b 
      LEFT JOIN vamTipoBoi t ON b.vbolCodTbl = t.vtblCodTbl 
      WHERE b.vbolMarcab ILIKE $1
    `, [`%${marca}%`]);
    return res.rows;
  }

  static async findByCantidad(minCantidad, maxCantidad) {
    const res = await pool.query(`
      SELECT b.*, t.vtblDescri as tipo_descripcion 
      FROM vamBolsaHe b 
      LEFT JOIN vamTipoBoi t ON b.vbolCodTbl = t.vtblCodTbl 
      WHERE b.vbolCantid BETWEEN $1 AND $2
    `, [minCantidad, maxCantidad]);
    return res.rows;
  }

  static async getStockInfo() {
    const res = await pool.query(`
      SELECT 
        b.vbolCodBol,
        b.vbolDescri,
        b.vbolMarcab,
        t.vtblDescri as tipo_descripcion,
        b.vbolIngres,
        b.vbolSalida,
        b.vbolCantid,
        (b.vbolIngres - b.vbolSalida) as stock_actual
      FROM vamBolsaHe b 
      LEFT JOIN vamTipoBoi t ON b.vbolCodTbl = t.vtblCodTbl 
      ORDER BY b.vbolCodBol ASC
    `);
    return res.rows;
  }
}

module.exports = BolsaHe; 