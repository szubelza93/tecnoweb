const pool = require('../../shared/config/database');

class Ocupacion {
  static async create(data) {
    const { vocucodocu, vocudescri } = data;
    const res = await pool.query(
      'INSERT INTO vamOcupaci (vocucodocu, vocudescri) VALUES ($1, $2) RETURNING *',
      [vocucodocu, vocudescri]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamOcupaci ORDER BY vocucodocu ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamOcupaci WHERE vocucodocu = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vocudescri } = data;
    const res = await pool.query(
      'UPDATE vamOcupaci SET vocudescri = $1 WHERE vocucodocu = $2 RETURNING *',
      [vocudescri, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamOcupaci WHERE vocucodocu = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamOcupaci WHERE vocudescri ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }
}

module.exports = Ocupacion; 