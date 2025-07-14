const pool = require('../../shared/config/database');

class Pruebas {

  static async create(data) {
    const {
      vprudescri, vprucaract, vprucodniv
    } = data;
    
    const res = await pool.query(`
      INSERT INTO vampruebas (
         vprudescri, vprucaract, vprucodniv
      ) VALUES ($1, $2, $3)
      RETURNING *
    `, [ vprudescri, vprucaract, vprucodniv]);
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT * FROM vampruebas
      ORDER BY vprucodpru DESC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT * FROM vampruebas 
      WHERE vprucodpru = $1
    `, [id]);
    return res.rows[0];
  }



  static async update(id, data) {
    const {
      vprudescri, vprucaract, vprucodniv
    } = data;
    
    const res = await pool.query(`
      UPDATE vampruebas SET
        vprudescri = $1, vprucaract = $2, vprucodniv = $3 
      WHERE vprucodpru = $4
      RETURNING *
    `, [ vprudescri, vprucaract, vprucodniv, id]);
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query('DELETE FROM vampruebas WHERE vprucodpru = $1 RETURNING *', [id]);
    return res.rows[0];
  }

}

module.exports = Pruebas; 