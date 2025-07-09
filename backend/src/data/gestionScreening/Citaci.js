const pool = require('../../shared/config/database');

class Citaci {
  // Obtener todas las citas
  static async findAll() {
    const query = `
      SELECT 
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      FROM vamCitaci 
      ORDER BY vcitNroCit
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Obtener cita por ID
  static async findById(vcitNroCit) {
    const query = `
      SELECT 
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      FROM vamCitaci 
      WHERE vcitNroCit = $1
    `;
    const result = await pool.query(query, [vcitNroCit]);
    return result.rows[0];
  }

  // Crear nueva cita
  static async create(citaData) {
    const {
      vcitNroCit,
      vuntCodUnt,
      vcitNroSol,
      vcitFecCli,
      vcitHrsCli,
      vcitNomPac,
      vgrsCodGrs,
      vantCantDo,
      vresCodRes
    } = citaData;

    const query = `
      INSERT INTO vamCitaci (
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const values = [
      vcitNroCit,
      vuntCodUnt,
      vcitNroSol,
      vcitFecCli,
      vcitHrsCli,
      vcitNomPac,
      vgrsCodGrs,
      vantCantDo,
      vresCodRes
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Actualizar cita
  static async update(vcitNroCit, citaData) {
    const {
      vuntCodUnt,
      vcitNroSol,
      vcitFecCli,
      vcitHrsCli,
      vcitNomPac,
      vgrsCodGrs,
      vantCantDo,
      vresCodRes
    } = citaData;

    const query = `
      UPDATE vamCitaci 
      SET 
        vuntCodUnt = $1,
        vcitNroSol = $2,
        vcitFecCli = $3,
        vcitHrsCli = $4,
        vcitNomPac = $5,
        vgrsCodGrs = $6,
        vantCantDo = $7,
        vresCodRes = $8
      WHERE vcitNroCit = $9
      RETURNING *
    `;
    
    const values = [
      vuntCodUnt,
      vcitNroSol,
      vcitFecCli,
      vcitHrsCli,
      vcitNomPac,
      vgrsCodGrs,
      vantCantDo,
      vresCodRes,
      vcitNroCit
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Eliminar cita
  static async delete(vcitNroCit) {
    const query = 'DELETE FROM vamCitaci WHERE vcitNroCit = $1 RETURNING *';
    const result = await pool.query(query, [vcitNroCit]);
    return result.rows[0];
  }

  // Buscar citas por unidad
  static async findByUnidad(vuntCodUnt) {
    const query = `
      SELECT 
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      FROM vamCitaci 
      WHERE vuntCodUnt = $1
      ORDER BY vcitFecCli DESC
    `;
    const result = await pool.query(query, [vuntCodUnt]);
    return result.rows;
  }

  // Buscar citas por paciente
  static async findByPaciente(vcitNomPac) {
    const query = `
      SELECT 
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      FROM vamCitaci 
      WHERE vcitNomPac ILIKE $1
      ORDER BY vcitFecCli DESC
    `;
    const result = await pool.query(query, [`%${vcitNomPac}%`]);
    return result.rows;
  }

  // Buscar citas por grupo sanguíneo
  static async findByGrupoSanguineo(vgrsCodGrs) {
    const query = `
      SELECT 
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      FROM vamCitaci 
      WHERE vgrsCodGrs = $1
      ORDER BY vcitFecCli DESC
    `;
    const result = await pool.query(query, [vgrsCodGrs]);
    return result.rows;
  }

  // Buscar citas por fecha
  static async findByFecha(fecha) {
    const query = `
      SELECT 
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      FROM vamCitaci 
      WHERE DATE(vcitFecCli) = $1
      ORDER BY vcitHrsCli
    `;
    const result = await pool.query(query, [fecha]);
    return result.rows;
  }

  // Buscar citas por rango de fechas
  static async findByRangoFechas(fechaInicio, fechaFin) {
    const query = `
      SELECT 
        vcitNroCit,
        vuntCodUnt,
        vcitNroSol,
        vcitFecCli,
        vcitHrsCli,
        vcitNomPac,
        vgrsCodGrs,
        vantCantDo,
        vresCodRes
      FROM vamCitaci 
      WHERE DATE(vcitFecCli) BETWEEN $1 AND $2
      ORDER BY vcitFecCli, vcitHrsCli
    `;
    const result = await pool.query(query, [fechaInicio, fechaFin]);
    return result.rows;
  }

  // Contar citas por unidad
  static async countByUnidad(vuntCodUnt) {
    const query = 'SELECT COUNT(*) as total FROM vamCitaci WHERE vuntCodUnt = $1';
    const result = await pool.query(query, [vuntCodUnt]);
    return parseInt(result.rows[0].total);
  }

  // Obtener estadísticas de citas
  static async getEstadisticas() {
    const query = `
      SELECT 
        COUNT(*) as total_citas,
        COUNT(DISTINCT vuntCodUnt) as total_unidades,
        COUNT(DISTINCT vgrsCodGrs) as total_grupos_sanguineos,
        MIN(vcitFecCli) as fecha_primera_cita,
        MAX(vcitFecCli) as fecha_ultima_cita
      FROM vamCitaci
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
}

module.exports = Citaci; 