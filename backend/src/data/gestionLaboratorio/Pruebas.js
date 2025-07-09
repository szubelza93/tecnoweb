const pool = require('../../shared/config/database');

class Pruebas {

  static async create(data) {
    const {
      vpruCodPru, vpruDescri, vpruCaract, vpruCodNiv
    } = data;
    
    const res = await pool.query(`
      INSERT INTO vamPruebas (
        vpruCodPru, vpruDescri, vpruCaract, vpruCodNiv
      ) VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [vpruCodPru, vpruDescri, vpruCaract, vpruCodNiv]);
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query(`
      SELECT * FROM vamPruebas
      ORDER BY vpruCodPru DESC
    `);
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query(`
      SELECT * FROM vamPruebas
      WHERE vpruCodPru = $1
    `, [id]);
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(`
      SELECT * FROM vamPruebas
      WHERE vpruDescri ILIKE $1
      ORDER BY vpruCodPru DESC
    `, [`%${descripcion}%`]);
    return res.rows;
  }

  static async update(id, data) {
    const {
      vpruDescri, vpruCaract, vpruCodNiv
    } = data;
    
    const res = await pool.query(`
      UPDATE vamPruebas SET
        vpruDescri = $1, vpruCaract = $2, vpruCodNiv = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE vpruCodPru = $4
      RETURNING *
    `, [vpruDescri, vpruCaract, vpruCodNiv, id]);
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query('DELETE FROM vamPruebas WHERE vpruCodPru = $1 RETURNING *', [id]);
    return res.rows[0];
  }

}

module.exports = Pruebas; 