const pool = require('../../shared/config/database');

class CitaDon {
  // Obtener todas las citas de donantes
  static async findAll() {
    const query = `
      SELECT 
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      FROM vamCitaDon 
      ORDER BY vcitNroCit, vdonCodDon
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Obtener cita de donante por clave primaria
  static async findById(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen) {
    const query = `
      SELECT 
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      FROM vamCitaDon 
      WHERE vcitNroCit = $1 AND vdonCodDon = $2 AND vscrNroScr = $3 AND vcenCodCen = $4
    `;
    const result = await pool.query(query, [vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen]);
    return result.rows[0];
  }

  // Crear nueva cita de donante
  static async create(citaDonData) {
    const {
      vcitNroCit,
      vdonCodDon,
      vscrNroScr,
      vcenCodCen,
      vcidCanDon,
      vcidResult,
      vcidSwCita
    } = citaDonData;

    const query = `
      INSERT INTO vamCitaDon (
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    
    const values = [
      vcitNroCit,
      vdonCodDon,
      vscrNroScr,
      vcenCodCen,
      vcidCanDon,
      vcidResult,
      vcidSwCita
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Actualizar cita de donante
  static async update(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen, citaDonData) {
    const {
      vcidCanDon,
      vcidResult,
      vcidSwCita
    } = citaDonData;

    const query = `
      UPDATE vamCitaDon 
      SET 
        vcidCanDon = $1,
        vcidResult = $2,
        vcidSwCita = $3
      WHERE vcitNroCit = $4 AND vdonCodDon = $5 AND vscrNroScr = $6 AND vcenCodCen = $7
      RETURNING *
    `;
    
    const values = [
      vcidCanDon,
      vcidResult,
      vcidSwCita,
      vcitNroCit,
      vdonCodDon,
      vscrNroScr,
      vcenCodCen
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Eliminar cita de donante
  static async delete(vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen) {
    const query = `
      DELETE FROM vamCitaDon 
      WHERE vcitNroCit = $1 AND vdonCodDon = $2 AND vscrNroScr = $3 AND vcenCodCen = $4 
      RETURNING *
    `;
    const result = await pool.query(query, [vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen]);
    return result.rows[0];
  }

  // Buscar citas de donantes por número de cita
  static async findByCita(vcitNroCit) {
    const query = `
      SELECT 
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      FROM vamCitaDon 
      WHERE vcitNroCit = $1
      ORDER BY vdonCodDon
    `;
    const result = await pool.query(query, [vcitNroCit]);
    return result.rows;
  }

  // Buscar citas de donantes por donante
  static async findByDonante(vdonCodDon) {
    const query = `
      SELECT 
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      FROM vamCitaDon 
      WHERE vdonCodDon = $1
      ORDER BY vcitNroCit DESC
    `;
    const result = await pool.query(query, [vdonCodDon]);
    return result.rows;
  }

  // Buscar citas de donantes por screening
  static async findByScreening(vscrNroScr, vcenCodCen) {
    const query = `
      SELECT 
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      FROM vamCitaDon 
      WHERE vscrNroScr = $1 AND vcenCodCen = $2
      ORDER BY vcitNroCit
    `;
    const result = await pool.query(query, [vscrNroScr, vcenCodCen]);
    return result.rows;
  }

  // Buscar citas de donantes por resultado
  static async findByResultado(vcidResult) {
    const query = `
      SELECT 
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      FROM vamCitaDon 
      WHERE vcidResult ILIKE $1
      ORDER BY vcitNroCit DESC
    `;
    const result = await pool.query(query, [`%${vcidResult}%`]);
    return result.rows;
  }

  // Buscar citas de donantes por estado
  static async findByEstado(vcidSwCita) {
    const query = `
      SELECT 
        vcitNroCit,
        vdonCodDon,
        vscrNroScr,
        vcenCodCen,
        vcidCanDon,
        vcidResult,
        vcidSwCita
      FROM vamCitaDon 
      WHERE vcidSwCita = $1
      ORDER BY vcitNroCit DESC
    `;
    const result = await pool.query(query, [vcidSwCita]);
    return result.rows;
  }

  // Obtener citas de donantes con información de cita y donante
  static async findWithDetails() {
    const query = `
      SELECT 
        cd.vcitNroCit,
        cd.vdonCodDon,
        cd.vscrNroScr,
        cd.vcenCodCen,
        cd.vcidCanDon,
        cd.vcidResult,
        cd.vcidSwCita,
        c.vcitNomPac,
        c.vcitFecCli,
        c.vcitHrsCli,
        d.vdonNombre,
        d.vdonPatern,
        d.vdonMatern
      FROM vamCitaDon cd
      LEFT JOIN vamCitaci c ON cd.vcitNroCit = c.vcitNroCit
      LEFT JOIN vamDonante d ON cd.vdonCodDon = d.vdonCodDon
      ORDER BY cd.vcitNroCit DESC, cd.vdonCodDon
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Contar citas de donantes por cita
  static async countByCita(vcitNroCit) {
    const query = 'SELECT COUNT(*) as total FROM vamCitaDon WHERE vcitNroCit = $1';
    const result = await pool.query(query, [vcitNroCit]);
    return parseInt(result.rows[0].total);
  }

  // Contar citas de donantes por donante
  static async countByDonante(vdonCodDon) {
    const query = 'SELECT COUNT(*) as total FROM vamCitaDon WHERE vdonCodDon = $1';
    const result = await pool.query(query, [vdonCodDon]);
    return parseInt(result.rows[0].total);
  }

  // Obtener estadísticas de citas de donantes
  static async getEstadisticas() {
    const query = `
      SELECT 
        COUNT(*) as total_citas_donantes,
        COUNT(DISTINCT vcitNroCit) as total_citas,
        COUNT(DISTINCT vdonCodDon) as total_donantes,
        COUNT(DISTINCT vscrNroScr) as total_screenings,
        COUNT(CASE WHEN vcidSwCita = 1 THEN 1 END) as citas_activas,
        COUNT(CASE WHEN vcidSwCita = 0 THEN 1 END) as citas_inactivas
      FROM vamCitaDon
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
}

module.exports = CitaDon; 