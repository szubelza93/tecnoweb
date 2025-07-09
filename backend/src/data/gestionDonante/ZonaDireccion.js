const pool = require('../../shared/config/database');

class ZonaDireccion {
  static async create(data) {
    const { vzonCodZon, vlugCodLug, vzonDescr } = data;
    const res = await pool.query(
      'INSERT INTO vamZonaDir (vzonCodZon, vlugCodLug, vzonDescr) VALUES ($1, $2, $3) RETURNING *',
      [vzonCodZon, vlugCodLug, vzonDescr]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamZonaDir ORDER BY vzonCodZon ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamZonaDir WHERE vzonCodZon = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vlugCodLug, vzonDescr } = data;
    const res = await pool.query(
      'UPDATE vamZonaDir SET vlugCodLug = $1, vzonDescr = $2 WHERE vzonCodZon = $3 RETURNING *',
      [vlugCodLug, vzonDescr, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamZonaDir WHERE vzonCodZon = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamZonaDir WHERE vzonDescr ILIKE $1 ORDER BY vzonCodZon ASC',
      [`%${descripcion}%`]
    );
    return res.rows;
  }

  static async findByLugar(lugCodLug) {
    const res = await pool.query(
      'SELECT * FROM vamZonaDir WHERE vlugCodLug = $1 ORDER BY vzonCodZon ASC',
      [lugCodLug]
    );
    return res.rows;
  }

  static async count() {
    const res = await pool.query('SELECT COUNT(*) FROM vamZonaDir');
    return parseInt(res.rows[0].count);
  }

  static async exists(id) {
    if (!id || isNaN(id)) {
      return false;
    }
    
    const res = await pool.query(
      'SELECT 1 FROM vamZonaDir WHERE vzonCodZon = $1',
      [id]
    );
    return res.rows.length > 0;
  }

  static async getZonasConDonantes() {
    const res = await pool.query(`
      SELECT z.*, l.vlugPaisna, l.vlugCiudad, l.vlugProvin, COUNT(d.vdonCodDon) as total_donantes
      FROM vamZonaDir z
      LEFT JOIN vamLugNaci l ON z.vlugCodLug = l.vlugCodLug
      LEFT JOIN vamDonante d ON z.vzonCodZon = d.vzonCodZon
      GROUP BY z.vzonCodZon, l.vlugPaisna, l.vlugCiudad, l.vlugProvin
      ORDER BY total_donantes DESC, z.vzonCodZon ASC
    `);
    return res.rows;
  }

  static async getZonasVacias() {
    const res = await pool.query(`
      SELECT z.*, l.vlugPaisna, l.vlugCiudad, l.vlugProvin
      FROM vamZonaDir z
      LEFT JOIN vamLugNaci l ON z.vlugCodLug = l.vlugCodLug
      WHERE NOT EXISTS (
        SELECT 1 FROM vamDonante d WHERE d.vzonCodZon = z.vzonCodZon
      )
      ORDER BY z.vzonCodZon ASC
    `);
    return res.rows;
  }
}

module.exports = ZonaDireccion; 