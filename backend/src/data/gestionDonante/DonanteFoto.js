const pool = require('../../shared/config/database');

class DonanteFoto {
  constructor(data) {
    this.vdonCodDon = data.vdonCodDon;
    this.vdonFotogr = data.vdonFotogr;
    this.created_at = data.created_at;
  }

  // Guardar foto de un donante
  static async saveFoto(vdonCodDon, fotoBuffer) {
    const query = `
      INSERT INTO vamDonFoto (vdonCodDon, vdonFotogr)
      VALUES ($1, $2)
      ON CONFLICT (vdonCodDon) 
      DO UPDATE SET vdonFotogr = $2, created_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [vdonCodDon, fotoBuffer]);
      return new DonanteFoto(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // Obtener foto de un donante
  static async getFoto(vdonCodDon) {
    const query = 'SELECT * FROM vamDonFoto WHERE vdonCodDon = $1';

    try {
      const result = await pool.query(query, [vdonCodDon]);
      return result.rows.length > 0 ? new DonanteFoto(result.rows[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar foto de un donante
  static async deleteFoto(vdonCodDon) {
    const query = 'DELETE FROM vamDonFoto WHERE vdonCodDon = $1 RETURNING *';

    try {
      const result = await pool.query(query, [vdonCodDon]);
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  // Verificar si un donante tiene foto
  static async hasFoto(vdonCodDon) {
    const query = 'SELECT COUNT(*) as count FROM vamDonFoto WHERE vdonCodDon = $1';

    try {
      const result = await pool.query(query, [vdonCodDon]);
      return result.rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todas las fotos (para administración)
  static async getAllFotos(limit = 50, offset = 0) {
    const query = `
      SELECT df.*, d.vdonNombre, d.vdonPatern, d.vdonMatern
      FROM vamDonFoto df
      LEFT JOIN vamDonante d ON df.vdonCodDon = d.vdonCodDon
      ORDER BY df.created_at DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows.map(row => new DonanteFoto(row));
    } catch (error) {
      throw error;
    }
  }

  // Obtener estadísticas de fotos
  static async getFotoStats() {
    const query = `
      SELECT 
        COUNT(*) as total_fotos,
        COUNT(DISTINCT vdonCodDon) as donantes_con_foto,
        (SELECT COUNT(*) FROM vamDonante) as total_donantes,
        ROUND(
          (COUNT(DISTINCT vdonCodDon)::DECIMAL / 
           (SELECT COUNT(*) FROM vamDonante)::DECIMAL) * 100, 2
        ) as porcentaje_con_foto
      FROM vamDonFoto
    `;

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DonanteFoto; 