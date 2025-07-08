const ResponseHelper = require('./responseHelper');

/**
 * Middleware para validar el nivel de bolsa
 * @param {string} nivel - Nivel de la bolsa (A, B, C, etc.)
 */
const validateNivelBolsa = (req, res, next) => {
  const { vtblNivelb } = req.body;
  
  if (vtblNivelb && !/^[A-Z]$/.test(vtblNivelb)) {
    return ResponseHelper.badRequest(res, 'El nivel de bolsa debe ser una letra mayúscula (A-Z).');
  }
  
  next();
};

/**
 * Middleware para validar que el código de tipo de bolsa sea único
 */
const validateCodigoUnico = async (req, res, next) => {
  try {
    const { vtblCodTbl } = req.body;
    const pool = require('../../shared/config/database');
    
    const result = await pool.query(
      'SELECT vtblCodTbl FROM vamTipoBoi WHERE vtblCodTbl = $1',
      [vtblCodTbl]
    );
    
    if (result.rows.length > 0) {
      return ResponseHelper.badRequest(res, 'Ya existe un tipo de bolsa con este código.');
    }
    
    next();
  } catch (error) {
    return ResponseHelper.internalServerError(res, 'Error al validar código único.');
  }
};

/**
 * Middleware para validar que el tipo de bolsa existe antes de actualizar/eliminar
 */
const validateTipoBolsaExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pool = require('../../shared/config/database');
    
    const result = await pool.query(
      'SELECT vtblCodTbl FROM vamTipoBoi WHERE vtblCodTbl = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return ResponseHelper.notFound(res, 'Tipo de bolsa no encontrado.');
    }
    
    next();
  } catch (error) {
    return ResponseHelper.internalServerError(res, 'Error al validar existencia del tipo de bolsa.');
  }
};

/**
 * Middleware para validar que la bolsa hematológica existe antes de actualizar/eliminar
 */
const validateBolsaHematologicaExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pool = require('../../shared/config/database');
    
    const result = await pool.query(
      'SELECT vbolCodBol FROM vamBolsaHe WHERE vbolCodBol = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return ResponseHelper.notFound(res, 'Bolsa hematológica no encontrada.');
    }
    
    next();
  } catch (error) {
    return ResponseHelper.internalServerError(res, 'Error al validar existencia de la bolsa hematológica.');
  }
};

/**
 * Middleware para validar que la reacción existe antes de actualizar/eliminar
 */
const validateReaccionExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pool = require('../../shared/config/database');
    
    const result = await pool.query(
      'SELECT vracCodRac FROM vamReaccio WHERE vracCodRac = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return ResponseHelper.notFound(res, 'Reacción no encontrada.');
    }
    
    next();
  } catch (error) {
    return ResponseHelper.internalServerError(res, 'Error al validar existencia de la reacción.');
  }
};

/**
 * Middleware para sanitizar datos de entrada
 */
const sanitizeTipoBolData = (req, res, next) => {
  if (req.body.vtblDescri) {
    req.body.vtblDescri = req.body.vtblDescri.trim();
  }
  
  if (req.body.vtblCaract) {
    req.body.vtblCaract = req.body.vtblCaract.trim();
  }
  
  if (req.body.vtblNivelb) {
    req.body.vtblNivelb = req.body.vtblNivelb.toUpperCase().trim();
  }
  
  next();
};

/**
 * Middleware para validar permisos específicos de extracción
 */
const validateExtraccionPermissions = (operation) => {
  return (req, res, next) => {
    // Aquí se pueden agregar validaciones específicas de permisos
    // Por ahora, permitimos acceso a todos los usuarios autenticados
    next();
  };
};

module.exports = {
  validateNivelBolsa,
  validateCodigoUnico,
  validateTipoBolsaExists,
  validateBolsaHematologicaExists,
  validateReaccionExists,
  sanitizeTipoBolData,
  validateExtraccionPermissions
}; 