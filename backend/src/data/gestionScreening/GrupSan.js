const pool = require('../../shared/config/database');

class GrupSan {
  static async create(data) {
    const { vqrsCodGrs, vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax } = data;
    const res = await pool.query(
      'INSERT INTO vamGrupSan (vqrsCodGrs, vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [vqrsCodGrs, vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamGrupSan ORDER BY vqrsCodGrs ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamGrupSan WHERE vqrsCodGrs = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax } = data;
    const res = await pool.query(
      'UPDATE vamGrupSan SET vqrsGruABO = $1, vqrsTipoRH = $2, vprgCodPrg = $3, vprgEstMin = $4, vprgEstMax = $5 WHERE vqrsCodGrs = $6 RETURNING *',
      [vqrsGruABO, vqrsTipoRH, vprgCodPrg, vprgEstMin, vprgEstMax, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamGrupSan WHERE vqrsCodGrs = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByGrupoABO(grupoABO) {
    const res = await pool.query(
      'SELECT * FROM vamGrupSan WHERE vqrsGruABO ILIKE $1',
      [`%${grupoABO}%`]
    );
    return res.rows;
  }

  static async findByTipoRH(tipoRH) {
    const res = await pool.query(
      'SELECT * FROM vamGrupSan WHERE vqrsTipoRH = $1',
      [tipoRH]
    );
    return res.rows;
  }

  static async findByRangoEstatura(minEstatura, maxEstatura) {
    const res = await pool.query(
      'SELECT * FROM vamGrupSan WHERE vprgEstMin >= $1 AND vprgEstMax <= $2',
      [minEstatura, maxEstatura]
    );
    return res.rows;
  }
  
  static async count() {
    const res = await pool.query('SELECT COUNT(*) FROM vamGrupSan');
    return parseInt(res.rows[0].count, 10);
  }
}

module.exports = GrupSan; 