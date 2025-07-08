const pool = require('../../shared/config/database');

class ClubDonantes {
  static async create(data) {
    const { vcluCodClu, vcluDescri, vcluDirecc, vcluTelefo, vcluRepRes } = data;
    const res = await pool.query(
      'INSERT INTO vamClubDon (vcluCodClu, vcluDescri, vcluDirecc, vcluTelefo, vcluRepRes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [vcluCodClu, vcluDescri, vcluDirecc, vcluTelefo, vcluRepRes]
    );
    return res.rows[0];
  }

  static async findAll() {
    const res = await pool.query('SELECT * FROM vamClubDon ORDER BY vcluCodClu ASC');
    return res.rows;
  }

  static async findById(id) {
    const res = await pool.query('SELECT * FROM vamClubDon WHERE vcluCodClu = $1', [id]);
    return res.rows[0];
  }

  static async update(id, data) {
    const { vcluDescri, vcluDirecc, vcluTelefo, vcluRepRes } = data;
    const res = await pool.query(
      'UPDATE vamClubDon SET vcluDescri = $1, vcluDirecc = $2, vcluTelefo = $3, vcluRepRes = $4 WHERE vcluCodClu = $5 RETURNING *',
      [vcluDescri, vcluDirecc, vcluTelefo, vcluRepRes, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    const res = await pool.query(
      'DELETE FROM vamClubDon WHERE vcluCodClu = $1 RETURNING *',
      [id]
    );
    return res.rows[0];
  }

  static async findByDescripcion(descripcion) {
    const res = await pool.query(
      'SELECT * FROM vamClubDon WHERE vcluDescri ILIKE $1',
      [`%${descripcion}%`]
    );
    return res.rows;
  }

  static async findByTelefono(telefono) {
    const res = await pool.query(
      'SELECT * FROM vamClubDon WHERE vcluTelefo = $1',
      [telefono]
    );
    return res.rows;
  }
}

module.exports = ClubDonantes; 