const pool = require('../../shared/config/database.js');

// Listar todos los obsequios
async function listar() {
  const result = await pool.query('SELECT * FROM vamobsequi ORDER BY vobscodobs');
  return result.rows;
}

// Obtener un obsequio por ID
async function obtener(id) {
  const result = await pool.query('SELECT * FROM vamobsequi WHERE vobscodobs = $1', [id]);
  return result.rows[0];
}

// Crear un nuevo obsequio
async function crear(data) {
  const { vobsdescri, vobscaract, vobsingres, vobssalida, vobscantid } = data;
  const result = await pool.query(
    'INSERT INTO vamobsequi (vobsdescri, vobscaract, vobsingres, vobssalida, vobscantid) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [vobsdescri, vobscaract, vobsingres, vobssalida, vobscantid]
  );
  return result.rows[0];
}

// Actualizar un obsequio
async function actualizar(id, data) {
  const { vobsdescri, vobscaract, vobsingres, vobssalida, vobscantid } = data;
  const result = await pool.query(
    'UPDATE vamobsequi SET vobsdescri=$1, vobscaract=$2, vobsingres=$3, vobssalida=$4, vobscantid=$5 WHERE vobscodobs=$6 RETURNING *',
    [vobsdescri, vobscaract, vobsingres, vobssalida, vobscantid, id]
  );
  return result.rows[0];
}

// Eliminar un obsequio
async function eliminar(id) {
  const result = await pool.query('DELETE FROM vamobsequi WHERE vobscodobs = $1 RETURNING *', [id]);
  return result.rowCount > 0;
}

module.exports = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
}; 