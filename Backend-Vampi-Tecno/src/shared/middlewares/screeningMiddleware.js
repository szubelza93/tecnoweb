const { body, param, query } = require('express-validator');
const { handleValidationErrors } = require('./validation');

// Middleware para validar parámetros de búsqueda de grupos sanguíneos
const validateGrupoSanguineoSearch = [
  query('grupoABO').optional().trim().isLength({ min: 1, max: 15 }).withMessage('El grupo ABO debe tener entre 1 y 15 caracteres.'),
  query('tipoRH').optional().trim().isLength({ min: 1, max: 1 }).withMessage('El tipo RH debe ser un solo carácter.'),
  query('minEstatura').optional().isInt({ min: 1 }).withMessage('La estatura mínima debe ser un entero positivo.'),
  query('maxEstatura').optional().isInt({ min: 1 }).withMessage('La estatura máxima debe ser un entero positivo.'),
  handleValidationErrors
];

// Middleware para validar parámetros de búsqueda de tipos de donación
const validateTipoDonacionSearch = [
  query('descripcion').optional().trim().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  handleValidationErrors
];

// Middleware para validar parámetros de búsqueda de screening
const validateScreeniSearch = [
  query('donanteId').optional().isInt({ min: 1 }).withMessage('El ID del donante debe ser un entero positivo.'),
  query('centroId').optional().isInt({ min: 1 }).withMessage('El ID del centro debe ser un entero positivo.'),
  query('fechaInicio').optional().isISO8601().withMessage('La fecha de inicio debe ser una fecha válida.'),
  query('fechaFin').optional().isISO8601().withMessage('La fecha de fin debe ser una fecha válida.'),
  query('etiqueta').optional().trim().isLength({ max: 16 }).withMessage('La etiqueta no puede exceder 16 caracteres.'),
  query('grupoSanguineoId').optional().isInt({ min: 1 }).withMessage('El ID del grupo sanguíneo debe ser un entero positivo.'),
  handleValidationErrors
];

// Middleware para sanitizar datos de screening
const sanitizeScreeniData = [
  body('vscrPesodo').optional().trim().toUpperCase(),
  body('vscrTemped').optional().trim().toUpperCase(),
  body('vscrPulsod').optional().trim().toUpperCase(),
  body('vscrPreMax').optional().trim().toUpperCase(),
  body('vscrPreMin').optional().trim().toUpperCase(),
  body('vscrGhemog').optional().trim().toUpperCase(),
  body('vscrHemato').optional().trim().toUpperCase(),
  body('vscrNroEti').optional().trim().toUpperCase(),
  body('vscrLabMed').optional().trim().toUpperCase(),
  body('vscrComent').optional().trim(),
  (req, res, next) => {
    // Convertir campos booleanos
    if (req.body.vscrDonAnt !== undefined) req.body.vscrDonAnt = Boolean(req.body.vscrDonAnt);
    if (req.body.vscrDonBsr !== undefined) req.body.vscrDonBsr = Boolean(req.body.vscrDonBsr);
    if (req.body.vscrSulcob !== undefined) req.body.vscrSulcob = Boolean(req.body.vscrSulcob);
    if (req.body.vscrResDud !== undefined) req.body.vscrResDud = Boolean(req.body.vscrResDud);
    if (req.body.vscrAparie !== undefined) req.body.vscrAparie = Boolean(req.body.vscrAparie);
    if (req.body.vscrInsBra !== undefined) req.body.vscrInsBra = Boolean(req.body.vscrInsBra);
    if (req.body.vscrActivg !== undefined) req.body.vscrActivg = Boolean(req.body.vscrActivg);
    
    // Convertir campos numéricos
    if (req.body.vscrNroScr !== undefined) req.body.vscrNroScr = parseInt(req.body.vscrNroScr);
    if (req.body.vcenCodCen !== undefined) req.body.vcenCodCen = parseInt(req.body.vcenCodCen);
    if (req.body.vdonCodDon !== undefined) req.body.vdonCodDon = parseInt(req.body.vdonCodDon);
    if (req.body.vtdnCodTdn !== undefined) req.body.vtdnCodTdn = parseInt(req.body.vtdnCodTdn);
    if (req.body.vgrsCodGrs !== undefined) req.body.vgrsCodGrs = parseInt(req.body.vgrsCodGrs);
    if (req.body.vscrGrsCon !== undefined) req.body.vscrGrsCon = parseInt(req.body.vscrGrsCon);
    if (req.body.vscrPreSer !== undefined) req.body.vscrPreSer = parseInt(req.body.vscrPreSer);
    if (req.body.vscrResMed !== undefined) req.body.vscrResMed = parseInt(req.body.vscrResMed);
    if (req.body.vscrResScr !== undefined) req.body.vscrResScr = parseInt(req.body.vscrResScr);
    if (req.body.vscrResTra !== undefined) req.body.vscrResTra = parseInt(req.body.vscrResTra);
    
    next();
  }
];

// Middleware para sanitizar datos de grupos sanguíneos
const sanitizeGrupSanData = [
  body('vqrsGruABO').optional().trim().toUpperCase(),
  body('vqrsTipoRH').optional().trim().toUpperCase(),
  (req, res, next) => {
    // Convertir campos numéricos
    if (req.body.vqrsCodGrs !== undefined) req.body.vqrsCodGrs = parseInt(req.body.vqrsCodGrs);
    if (req.body.vprgCodPrg !== undefined) req.body.vprgCodPrg = parseInt(req.body.vprgCodPrg);
    if (req.body.vprgEstMin !== undefined) req.body.vprgEstMin = parseInt(req.body.vprgEstMin);
    if (req.body.vprgEstMax !== undefined) req.body.vprgEstMax = parseInt(req.body.vprgEstMax);
    
    next();
  }
];

// Middleware para sanitizar datos de tipos de donación
const sanitizeTipoDonData = [
  body('vtdnDescn').optional().trim(),
  (req, res, next) => {
    // Convertir campos numéricos
    if (req.body.vtdnCodTdn !== undefined) req.body.vtdnCodTdn = parseInt(req.body.vtdnCodTdn);
    
    next();
  }
];

module.exports = {
  validateGrupoSanguineoSearch,
  validateTipoDonacionSearch,
  validateScreeniSearch,
  sanitizeScreeniData,
  sanitizeGrupSanData,
  sanitizeTipoDonData
};