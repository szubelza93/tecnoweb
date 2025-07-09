const pool = require('../../shared/config/database');

class LugarNacimiento {
  static async create(data) {
    const { vlugCodLug, vlugPaisna, vlugCiudad, vlugProvin } = data;
    const res = await pool.query(
      'INSERT INTO vamLugNaci (vlugCodLug, vlugPaisna, vlugCiudad, vlugProvin) VALUES ($1, $2, $3, $4) RETURNING *',
      [vlugCodLug, vlugPaisna, vlugCiudad, vlugProvin]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamLugNaci ORDER BY vlugCodLug ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamLugNaci WHERE vlugCodLug = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vlugPaisna, vlugCiudad, vlugProvin } = data;
    const res = await pool.query(
      'UPDATE vamLugNaci SET vlugPaisna = $1, vlugCiudad = $2, vlugProvin = $3 WHERE vlugCodLug = $4 RETURNING *',
      [vlugPaisna, vlugCiudad, vlugProvin, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamLugNaci WHERE vlugCodLug = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByCiudad(ciudad) {
    const res = await pool.query(
      'SELECT * FROM vamLugNaci WHERE vlugCiudad ILIKE $1',
      [`%${ciudad}%`]
    );
    return res.rows;
  }

  static async findByProvincia(provincia) {
    const res = await pool.query(
      'SELECT * FROM vamLugNaci WHERE vlugProvin ILIKE $1',
      [`%${provincia}%`]
    );
    return res.rows;
  }

  static async findByPais(pais) {
    const res = await pool.query(
      'SELECT * FROM vamLugNaci WHERE vlugPaisna ILIKE $1',
      [`%${pais}%`]
    );
    return res.rows;
  }
}

module.exports = LugarNacimiento; 