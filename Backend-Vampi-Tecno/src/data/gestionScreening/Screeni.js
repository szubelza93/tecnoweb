const pool = require('../../shared/config/database');

class Screeni {
  static async create(data) {
    const {
      vscrNroScr, vcenCodCen, vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr,
      vscrFecAnt, vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin,
      vscrFechas, vscrGhemog, vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud,
      vscrGrsCon, vscrComent, vscrAparie, vscrInsBra, vscrActivg, vscrPreSer,
      vscrNroEti, vscrLabMed, vscrResMed, vscrResScr, vscrResTra, vscrFecMed, vscrFecLab
    } = data;
    
    const res = await pool.query(`
      INSERT INTO vamScreeni (
        vscrNroScr, vcenCodCen, vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr,
        vscrFecAnt, vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin,
        vscrFechas, vscrGhemog, vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud,
        vscrGrsCon, vscrComent, vscrAparie, vscrInsBra, vscrActivg, vscrPreSer,
        vscrNroEti, vscrLabMed, vscrResMed, vscrResScr, vscrResTra, vscrFecMed, vscrFecLab
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31) RETURNING *
    `, [
      vscrNroScr, vcenCodCen, vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr,
      vscrFecAnt, vscrPesodo, vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin,
      vscrFechas, vscrGhemog, vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud,
      vscrGrsCon, vscrComent, vscrAparie, vscrInsBra, vscrActivg, vscrPreSer,
      vscrNroEti, vscrLabMed, vscrResMed, vscrResScr, vscrResTra, vscrFecMed, vscrFecLab
    ]);
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT s.*, 
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             td.vtdnDescn as tipo_donacion_descripcion,
             gs.vqrsGruABO, gs.vqrsTipoRH
      FROM vamScreeni s
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamTipoDon td ON s.vtdnCodTdn = td.vtdnCodTdn
      LEFT JOIN vamGrupSan gs ON s.vgrsCodGrs = gs.vqrsCodGrs
      ORDER BY s.vscrNroScr ASC, s.vcenCodCen ASC
    `);
    return res.rows;
  }

  static async findById(numeroScr, centro) {
    const res = await pool.query(`
      SELECT s.*, 
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             td.vtdnDescn as tipo_donacion_descripcion,
             gs.vqrsGruABO, gs.vqrsTipoRH
      FROM vamScreeni s
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamTipoDon td ON s.vtdnCodTdn = td.vtdnCodTdn
      LEFT JOIN vamGrupSan gs ON s.vgrsCodGrs = gs.vqrsCodGrs
      WHERE s.vscrNroScr = $1 AND s.vcenCodCen = $2
    `, [numeroScr, centro]);
    return res.rows[0];
  }

  static async update(numeroScr, centro, data) {
    const {
      vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr, vscrFecAnt, vscrPesodo,
      vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin, vscrFechas, vscrGhemog,
      vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud, vscrGrsCon, vscrComent,
      vscrAparie, vscrInsBra, vscrActivg, vscrPreSer, vscrNroEti, vscrLabMed,
      vscrResMed, vscrResScr, vscrResTra, vscrFecMed, vscrFecLab
    } = data;
    
    const res = await pool.query(`
      UPDATE vamScreeni SET 
        vdonCodDon = $1, vtdnCodTdn = $2, vscrDonAnt = $3, vscrDonBsr = $4,
        vscrFecAnt = $5, vscrPesodo = $6, vscrTemped = $7, vscrPulsod = $8,
        vscrPreMax = $9, vscrPreMin = $10, vscrFechas = $11, vscrGhemog = $12,
        vscrHemato = $13, vscrSulcob = $14, vgrsCodGrs = $15, vscrResDud = $16,
        vscrGrsCon = $17, vscrComent = $18, vscrAparie = $19, vscrInsBra = $20,
        vscrActivg = $21, vscrPreSer = $22, vscrNroEti = $23, vscrLabMed = $24,
        vscrResMed = $25, vscrResScr = $26, vscrResTra = $27, vscrFecMed = $28, vscrFecLab = $29
      WHERE vscrNroScr = $30 AND vcenCodCen = $31 RETURNING *
    `, [
      vdonCodDon, vtdnCodTdn, vscrDonAnt, vscrDonBsr, vscrFecAnt, vscrPesodo,
      vscrTemped, vscrPulsod, vscrPreMax, vscrPreMin, vscrFechas, vscrGhemog,
      vscrHemato, vscrSulcob, vgrsCodGrs, vscrResDud, vscrGrsCon, vscrComent,
      vscrAparie, vscrInsBra, vscrActivg, vscrPreSer, vscrNroEti, vscrLabMed,
      vscrResMed, vscrResScr, vscrResTra, vscrFecMed, vscrFecLab, numeroScr, centro
    ]);
    return res.rows[0];
  }

  static async delete(numeroScr, centro) {
    const res = await pool.query(
      'DELETE FROM vamScreeni WHERE vscrNroScr = $1 AND vcenCodCen = $2 RETURNING *',
      [numeroScr, centro]
    );
    return res.rows[0];
  }

  static async findByDonante(donanteId) {
    const res = await pool.query(`
      SELECT s.*, 
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             td.vtdnDescn as tipo_donacion_descripcion,
             gs.vqrsGruABO, gs.vqrsTipoRH
      FROM vamScreeni s
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamTipoDon td ON s.vtdnCodTdn = td.vtdnCodTdn
      LEFT JOIN vamGrupSan gs ON s.vgrsCodGrs = gs.vqrsCodGrs
      WHERE s.vdonCodDon = $1
      ORDER BY s.vscrFechas DESC
    `, [donanteId]);
    return res.rows;
  }

  static async findByCentro(centroId) {
    const res = await pool.query(`
      SELECT s.*, 
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             td.vtdnDescn as tipo_donacion_descripcion,
             gs.vqrsGruABO, gs.vqrsTipoRH
      FROM vamScreeni s
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamTipoDon td ON s.vtdnCodTdn = td.vtdnCodTdn
      LEFT JOIN vamGrupSan gs ON s.vgrsCodGrs = gs.vqrsCodGrs
      WHERE s.vcenCodCen = $1
      ORDER BY s.vscrFechas DESC
    `, [centroId]);
    return res.rows;
  }

  static async findByFecha(fechaInicio, fechaFin) {
    const res = await pool.query(`
      SELECT s.*, 
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             td.vtdnDescn as tipo_donacion_descripcion,
             gs.vqrsGruABO, gs.vqrsTipoRH
      FROM vamScreeni s
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamTipoDon td ON s.vtdnCodTdn = td.vtdnCodTdn
      LEFT JOIN vamGrupSan gs ON s.vgrsCodGrs = gs.vqrsCodGrs
      WHERE s.vscrFechas BETWEEN $1 AND $2
      ORDER BY s.vscrFechas DESC
    `, [fechaInicio, fechaFin]);
    return res.rows;
  }

  static async findByEtiqueta(etiqueta) {
    const res = await pool.query(`
      SELECT s.*, 
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             td.vtdnDescn as tipo_donacion_descripcion,
             gs.vqrsGruABO, gs.vqrsTipoRH
      FROM vamScreeni s
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamTipoDon td ON s.vtdnCodTdn = td.vtdnCodTdn
      LEFT JOIN vamGrupSan gs ON s.vgrsCodGrs = gs.vqrsCodGrs
      WHERE s.vscrNroEti ILIKE $1
      ORDER BY s.vscrFechas DESC
    `, [`%${etiqueta}%`]);
    return res.rows;
  }

  static async findByGrupoSanguineo(grupoSanguineoId) {
    const res = await pool.query(`
      SELECT s.*, 
             d.vdonNombre, d.vdonPatern, d.vdonMatern,
             td.vtdnDescn as tipo_donacion_descripcion,
             gs.vqrsGruABO, gs.vqrsTipoRH
      FROM vamScreeni s
      LEFT JOIN vamDonante d ON s.vdonCodDon = d.vdonCodDon
      LEFT JOIN vamTipoDon td ON s.vtdnCodTdn = td.vtdnCodTdn
      LEFT JOIN vamGrupSan gs ON s.vgrsCodGrs = gs.vqrsCodGrs
      WHERE s.vgrsCodGrs = $1
      ORDER BY s.vscrFechas DESC
    `, [grupoSanguineoId]);
    return res.rows;
  }

  static async getEstadisticas() {
    const res = await pool.query(`
      SELECT 
        COUNT(*) as total_screenings,
        COUNT(CASE WHEN vscrResScr = 1 THEN 1 END) as aprobados,
        COUNT(CASE WHEN vscrResScr = 0 THEN 1 END) as rechazados,
        COUNT(CASE WHEN vscrResScr IS NULL THEN 1 END) as pendientes
      FROM vamScreeni
    `);
    return res.rows[0];
  }
}

module.exports = Screeni; 