const pool = require('../../shared/config/database');

class TipoBol {
  static async create(data) {
    const { vtblCodTbl, vtblDescri, vtblCaract, vtblNivelb } = data;
    const res = await pool.query(
      'INSERT INTO vamTipoBoi (vtblCodTbl, vtblDescri, vtblCaract, vtblNivelb) VALUES ($1, $2, $3, $4) RETURNING *',
      [vtblCodTbl, vtblDescri, vtblCaract, vtblNivelb]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamTipoBoi ORDER BY vtblCodTbl ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamTipoBoi WHERE vtblCodTbl = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vtblDescri, vtblCaract, vtblNivelb } = data;
    const res = await pool.query(
      'UPDATE vamTipoBoi SET vtblDescri = $1, vtblCaract = $2, vtblNivelb = $3 WHERE vtblCodTbl = $4 RETURNING *',
      [vtblDescri, vtblCaract, vtblNivelb, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamTipoBoi WHERE vtblCodTbl = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamTipoBoi WHERE vtblDescri ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }

  static async findByCaracteristica(caracteristica) {
    const res = await pool.query(
      'SELECT * FROM vamTipoBoi WHERE vtblCaract ILIKE $1',
      [`%${caracteristica}%`]
    );
    return res.rows;
  }

  static async findByNivel(nivel) {
    const res = await pool.query(
      'SELECT * FROM vamTipoBoi WHERE vtblNivelb = $1',
      [nivel]
    );
    return res.rows;
  }
}

module.exports = TipoBol; 