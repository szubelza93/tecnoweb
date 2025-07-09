const pool = require('../../shared/config/database');

class ExtDona {
  static async create(data) {
    const { 
      vexdNroExd,
      vscrNroScr,
      vcenCodCen,
      vexdFecIni,
      vexdFecFin,
      vexdBrazoe,
      vexdReacci,
      vracCodRac,
      vexdResult,
      vexdObsequ,
      vexdRefrig,
      vexdCantmi,
      vbolCodBol,
      vexdTubula,
      vgrsCodGrs,
      vexdHpraci,
      vexdHprant,
      vexdScrivi,
      vexdEsiExd,
      vexdResExd,
      vexdResTra
    } = data;
    
    const res = await pool.query(
      `INSERT INTO vamExtDona (
        vexdNroExd, vscrNroScr, vcenCodCen, vexdFecIni, vexdFecFin,
        vexdBrazoe, vexdReacci, vracCodRac, vexdResult, vexdObsequ,
        vexdRefrig, vexdCantmi, vbolCodBol, vexdTubula, vgrsCodGrs,
        vexdHpraci, vexdHprant, vexdScrivi, vexdEsiExd, vexdResExd, vexdResTra
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *`,
      [vexdNroExd, vscrNroScr, vcenCodCen, vexdFecIni, vexdFecFin, vexdBrazoe, vexdReacci, vracCodRac, vexdResult, vexdObsequ, vexdRefrig, vexdCantmi, vbolCodBol, vexdTubula, vgrsCodGrs, vexdHpraci, vexdHprant, vexdScrivi, vexdEsiExd, vexdResExd, vexdResTra]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT e.*, 
             s.vscrFechas as screening_fecha,
             b.vbolDescri as bolsa_descripcion,
             r.vracDescri as reaccion_descripcion,
             g.vqrsGruABO as grupo_abo,
             g.vqrsTipoRH as grupo_rh
      FROM vamExtDona e 
      LEFT JOIN vamScreeni s ON e.vscrNroScr = s.vscrNroScr AND e.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol 
      LEFT JOIN vamReaccio r ON e.vracCodRac = r.vracCodRac
      LEFT JOIN vamGrupSan g ON e.vgrsCodGrs = g.vqrsCodGrs
      ORDER BY e.vexdNroExd DESC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT e.*, 
             s.vscrFechas as screening_fecha,
             b.vbolDescri as bolsa_descripcion,
             r.vracDescri as reaccion_descripcion,
             g.vqrsGruABO as grupo_abo,
             g.vqrsTipoRH as grupo_rh
      FROM vamExtDona e 
      LEFT JOIN vamScreeni s ON e.vscrNroScr = s.vscrNroScr AND e.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol 
      LEFT JOIN vamReaccio r ON e.vracCodRac = r.vracCodRac
      LEFT JOIN vamGrupSan g ON e.vgrsCodGrs = g.vqrsCodGrs
      WHERE e.vexdNroExd = $1
    `, [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { 
      vscrNroScr,
      vcenCodCen,
      vexdFecIni,
      vexdFecFin,
      vexdBrazoe,
      vexdReacci,
      vracCodRac,
      vexdResult,
      vexdObsequ,
      vexdRefrig,
      vexdCantmi,
      vbolCodBol,
      vexdTubula,
      vgrsCodGrs,
      vexdHpraci,
      vexdHprant,
      vexdScrivi,
      vexdEsiExd,
      vexdResExd,
      vexdResTra
    } = data;
    
    const res = await pool.query(
      `UPDATE vamExtDona SET 
        vscrNroScr = $1, vcenCodCen = $2, vexdFecIni = $3, vexdFecFin = $4,
        vexdBrazoe = $5, vexdReacci = $6, vracCodRac = $7, vexdResult = $8,
        vexdObsequ = $9, vexdRefrig = $10, vexdCantmi = $11, vbolCodBol = $12,
        vexdTubula = $13, vgrsCodGrs = $14, vexdHpraci = $15, vexdHprant = $16,
        vexdScrivi = $17, vexdEsiExd = $18, vexdResExd = $19, vexdResTra = $20
      WHERE vexdNroExd = $21 RETURNING *`,
      [vscrNroScr, vcenCodCen, vexdFecIni, vexdFecFin, vexdBrazoe, vexdReacci, vracCodRac, vexdResult, vexdObsequ, vexdRefrig, vexdCantmi, vbolCodBol, vexdTubula, vgrsCodGrs, vexdHpraci, vexdHprant, vexdScrivi, vexdEsiExd, vexdResExd, vexdResTra, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamExtDona WHERE vexdNroExd = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByScreening(screeningNro, centroCod) {
    const res = await pool.query(`
      SELECT e.*, 
             s.vscrFechas as screening_fecha,
             b.vbolDescri as bolsa_descripcion,
             r.vracDescri as reaccion_descripcion,
             g.vqrsGruABO as grupo_abo,
             g.vqrsTipoRH as grupo_rh
      FROM vamExtDona e 
      LEFT JOIN vamScreeni s ON e.vscrNroScr = s.vscrNroScr AND e.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol 
      LEFT JOIN vamReaccio r ON e.vracCodRac = r.vracCodRac
      LEFT JOIN vamGrupSan g ON e.vgrsCodGrs = g.vqrsCodGrs
      WHERE e.vscrNroScr = $1 AND e.vcenCodCen = $2
    `, [screeningNro, centroCod]);
    return res.rows;
  }

  static async findByBolsa(bolsaCod) {
    const res = await pool.query(`
      SELECT e.*, 
             s.vscrFechas as screening_fecha,
             b.vbolDescri as bolsa_descripcion,
             r.vracDescri as reaccion_descripcion,
             g.vqrsGruABO as grupo_abo,
             g.vqrsTipoRH as grupo_rh
      FROM vamExtDona e 
      LEFT JOIN vamScreeni s ON e.vscrNroScr = s.vscrNroScr AND e.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol 
      LEFT JOIN vamReaccio r ON e.vracCodRac = r.vracCodRac
      LEFT JOIN vamGrupSan g ON e.vgrsCodGrs = g.vqrsCodGrs
      WHERE e.vbolCodBol = $1
    `, [bolsaCod]);
    return res.rows;
  }

  static async findByFecha(fechaInicio, fechaFin) {
    const res = await pool.query(`
      SELECT e.*, 
             s.vscrFechas as screening_fecha,
             b.vbolDescri as bolsa_descripcion,
             r.vracDescri as reaccion_descripcion,
             g.vqrsGruABO as grupo_abo,
             g.vqrsTipoRH as grupo_rh
      FROM vamExtDona e 
      LEFT JOIN vamScreeni s ON e.vscrNroScr = s.vscrNroScr AND e.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol 
      LEFT JOIN vamReaccio r ON e.vracCodRac = r.vracCodRac
      LEFT JOIN vamGrupSan g ON e.vgrsCodGrs = g.vqrsCodGrs
      WHERE e.vexdFecIni BETWEEN $1 AND $2
    `, [fechaInicio, fechaFin]);
    return res.rows;
  }

  static async findByResultado(resultado) {
    const res = await pool.query(`
      SELECT e.*, 
             s.vscrFechas as screening_fecha,
             b.vbolDescri as bolsa_descripcion,
             r.vracDescri as reaccion_descripcion,
             g.vqrsGruABO as grupo_abo,
             g.vqrsTipoRH as grupo_rh
      FROM vamExtDona e 
      LEFT JOIN vamScreeni s ON e.vscrNroScr = s.vscrNroScr AND e.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol 
      LEFT JOIN vamReaccio r ON e.vracCodRac = r.vracCodRac
      LEFT JOIN vamGrupSan g ON e.vgrsCodGrs = g.vqrsCodGrs
      WHERE e.vexdResult = $1
    `, [resultado]);
    return res.rows;
  }

  static async findByEstado(estado) {
    const res = await pool.query(`
      SELECT e.*, 
             s.vscrFechas as screening_fecha,
             b.vbolDescri as bolsa_descripcion,
             r.vracDescri as reaccion_descripcion,
             g.vqrsGruABO as grupo_abo,
             g.vqrsTipoRH as grupo_rh
      FROM vamExtDona e 
      LEFT JOIN vamScreeni s ON e.vscrNroScr = s.vscrNroScr AND e.vcenCodCen = s.vcenCodCen
      LEFT JOIN vamBolsaHe b ON e.vbolCodBol = b.vbolCodBol 
      LEFT JOIN vamReaccio r ON e.vracCodRac = r.vracCodRac
      LEFT JOIN vamGrupSan g ON e.vgrsCodGrs = g.vqrsCodGrs
      WHERE e.vexdEsiExd = $1
    `, [estado]);
    return res.rows;
  }

  static async getEstadisticas() {
    const res = await pool.query(`
      SELECT 
        COUNT(*) as total_extracciones,
        COUNT(CASE WHEN vexdResult = 'A' THEN 1 END) as aprobadas,
        COUNT(CASE WHEN vexdResult = 'R' THEN 1 END) as rechazadas,
        COUNT(CASE WHEN vexdReacci = 1 THEN 1 END) as con_reacciones,
        COUNT(CASE WHEN vexdObsequ = 1 THEN 1 END) as con_obsequios,
        COUNT(CASE WHEN vexdRefrig = 1 THEN 1 END) as refrigeradas,
        AVG(vexdCantmi) as promedio_cantidad
      FROM vamExtDona
    `);
    return res.rows[0];
  }
}

module.exports = ExtDona; 