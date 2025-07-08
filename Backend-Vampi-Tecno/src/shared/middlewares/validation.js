const { body, param, query, validationResult } = require('express-validator');
const ResponseHelper = require('./responseHelper');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper.badRequest(res, 'Errores de validación detectados.', errors.array());
  }
  next();
};

// Validaciones de Donante
const validateDonante = [
  body('vdonCodDon').isInt({ min: 1 }).withMessage('El código del donante debe ser un entero positivo.'),
  body('vdonPatern').optional().trim().isLength({ max: 50 }).withMessage('El apellido paterno no puede exceder 50 caracteres.'),
  body('vdonMatern').optional().trim().isLength({ max: 50 }).withMessage('El apellido materno no puede exceder 50 caracteres.'),
  body('vdonNombre').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('El nombre es requerido y debe tener entre 2 y 50 caracteres.'),
  body('vzonCodZon').optional().isInt({ min: 1 }).withMessage('El código de zona debe ser un entero positivo.'),
  body('vdonDirecc').optional().trim().isLength({ max: 150 }).withMessage('La dirección no puede exceder 150 caracteres.'),
  body('vdonDesDir').optional().trim().isLength({ max: 350 }).withMessage('La descripción de dirección no puede exceder 350 caracteres.'),
  body('vtidCodTid').optional().isInt({ min: 1 }).withMessage('El código de tipo de documento debe ser un entero positivo.'),
  body('vdonDocide').optional().trim().isLength({ max: 15 }).withMessage('El documento de identidad no puede exceder 15 caracteres.'),
  body('vdonFecNac').optional().isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida.'),
  body('vdonEdadDo').optional().isInt({ min: 18, max: 100 }).withMessage('La edad debe estar entre 18 y 100 años.'),
  body('vdonEstCiv').optional().isIn(['S', 'C', 'D', 'V']).withMessage('Estado civil debe ser S, C, D o V.'),
  body('vdonSexoDn').optional().isIn(['M', 'F']).withMessage('Sexo debe ser M o F.'),
  body('vdonTelDom').optional().matches(/^[0-9]{8}$/).withMessage('El teléfono de domicilio debe tener exactamente 8 dígitos.'),
  body('vdonTelOff').optional().matches(/^[0-9]{8}$/).withMessage('El teléfono de oficina debe tener exactamente 8 dígitos.'),
  body('vdonTelCel').optional().matches(/^[0-9]{8}$/).withMessage('El teléfono celular debe tener exactamente 8 dígitos.'),
  body('vdonEmail').optional().isEmail().withMessage('El email debe ser un email válido.'),
  body('vdonTrabaj').optional().trim().isLength({ max: 150 }).withMessage('El trabajo no puede exceder 150 caracteres.'),
  body('vdonDirTra').optional().trim().isLength({ max: 150 }).withMessage('La dirección de trabajo no puede exceder 150 caracteres.'),
  body('vdonCarneT').optional().isBoolean().withMessage('El campo carnet debe ser un valor booleano.'),
  body('vocuCodOcu').optional().isInt({ min: 1 }).withMessage('El código de ocupación debe ser un entero positivo.'),
  body('vgraCodGra').optional().isInt({ min: 1 }).withMessage('El código de grado debe ser un entero positivo.'),
  body('vlugCodLug').optional().isInt({ min: 1 }).withMessage('El código de lugar debe ser un entero positivo.'),
  body('vcluCodClu').optional().isInt({ min: 1 }).withMessage('El código de club debe ser un entero positivo.'),
  body('vresCodRes').optional().isInt({ min: 1 }).withMessage('El código de responsable debe ser un entero positivo.'),
  body('vdonSwCita').optional().isBoolean().withMessage('El campo cita debe ser un valor booleano.'),
  handleValidationErrors
];

// Validaciones de Ocupación
const validateOcupacion = [
  body('vocucodocu').isInt({ min: 1 }).withMessage('El código de ocupación debe ser un entero positivo.'),
  body('vocudescri').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Grado de Instrucción
const validateGradoInstruccion = [
  body('vgraCodGra').isInt({ min: 1 }).withMessage('El código de grado debe ser un entero positivo.'),
  body('vgraDescrn').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Lugar de Nacimiento
const validateLugarNacimiento = [
  body('vlugCodLug').isInt({ min: 1 }).withMessage('El código de lugar debe ser un entero positivo.'),
  body('vlugPaisna').trim().notEmpty().isLength({ min: 2, max: 20 }).withMessage('El país debe tener entre 2 y 20 caracteres.'),
  body('vlugCiudad').trim().notEmpty().isLength({ min: 2, max: 20 }).withMessage('La ciudad debe tener entre 2 y 20 caracteres.'),
  body('vlugProvin').trim().notEmpty().isLength({ min: 2, max: 20 }).withMessage('La provincia debe tener entre 2 y 20 caracteres.'),
  handleValidationErrors
];

// Validaciones de Club de Donantes
const validateClubDonantes = [
  body('vcluCodClu').isInt({ min: 1 }).withMessage('El código de club debe ser un entero positivo.'),
  body('vcluDescri').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  body('vcluDirecc').optional().trim().isLength({ max: 50 }).withMessage('La dirección no puede exceder 50 caracteres.'),
  body('vcluTelefo').optional().matches(/^[0-9]{8}$/).withMessage('El teléfono debe tener exactamente 8 dígitos.'),
  body('vcluRepRes').optional().trim().isLength({ max: 50 }).withMessage('El representante no puede exceder 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Zona de Dirección
const validateZonaDireccion = [
  body('vzonCodZon').isInt({ min: 1 }).withMessage('El código de zona debe ser un entero positivo.'),
  body('vlugCodLug').optional().isInt({ min: 1 }).withMessage('El código de lugar debe ser un entero positivo.'),
  body('vzonDescr').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Tipo de Documento
const validateTipoDocumento = [
  body('vtidCodTid').isInt({ min: 1 }).withMessage('El código de tipo de documento debe ser un entero positivo.'),
  body('vtidDescr').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Tipo de Bolsa
const validateTipoBol = [
  body('vtblCodTbl').isInt({ min: 1 }).withMessage('El código de tipo de bolsa debe ser un entero positivo.'),
  body('vtblDescri').trim().notEmpty().isLength({ min: 2, max: 30 }).withMessage('La descripción debe tener entre 2 y 30 caracteres.'),
  body('vtblCaract').optional().trim().isLength({ max: 50 }).withMessage('La característica no puede exceder 50 caracteres.'),
  body('vtblNivelb').optional().isLength({ min: 1, max: 1 }).withMessage('El nivel debe ser un solo carácter.'),
  handleValidationErrors
];

// Validaciones de Bolsa Hematológica
const validateBolsaHe = [
  body('vbolCodBol').isInt({ min: 1 }).withMessage('El código de bolsa debe ser un entero positivo.'),
  body('vbolCodTbl').optional().isInt({ min: 1 }).withMessage('El código de tipo de bolsa debe ser un entero positivo.'),
  body('vbolDescri').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  body('vbolMarcab').optional().trim().isLength({ max: 30 }).withMessage('La marca no puede exceder 30 caracteres.'),
  body('vbolRendm').optional().trim().isLength({ max: 250 }).withMessage('El rendimiento no puede exceder 250 caracteres.'),
  body('vbolIngres').optional().isInt({ min: 0 }).withMessage('El ingreso debe ser un entero no negativo.'),
  body('vbolSalida').optional().isInt({ min: 0 }).withMessage('La salida debe ser un entero no negativo.'),
  body('vbolCantid').optional().isInt({ min: 0 }).withMessage('La cantidad debe ser un entero no negativo.'),
  handleValidationErrors
];

// Validaciones de Reacción
const validateReaccio = [
  body('vracCodRac').isInt({ min: 1 }).withMessage('El código de reacción debe ser un entero positivo.'),
  body('vracDescri').trim().notEmpty().isLength({ min: 2, max: 30 }).withMessage('La descripción debe tener entre 2 y 30 caracteres.'),
  body('vracCaract').optional().trim().isLength({ max: 50 }).withMessage('La característica no puede exceder 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Grupo Sanguíneo
const validateGrupSan = [
  body('vqrsCodGrs').isInt({ min: 1 }).withMessage('El código de grupo sanguíneo debe ser un entero positivo.'),
  body('vqrsGruABO').trim().notEmpty().isLength({ min: 1, max: 15 }).withMessage('El grupo ABO debe tener entre 1 y 15 caracteres.'),
  body('vqrsTipoRH').trim().notEmpty().isLength({ min: 1, max: 1 }).withMessage('El tipo RH debe ser un solo carácter.'),
  body('vprgCodPrg').isInt({ min: 1 }).withMessage('El código de programa debe ser un entero positivo.'),
  body('vprgEstMin').isInt({ min: 1 }).withMessage('La estatura mínima debe ser un entero positivo.'),
  body('vprgEstMax').isInt({ min: 1 }).withMessage('La estatura máxima debe ser un entero positivo.'),
  handleValidationErrors
];

// Validaciones de Tipo de Donación
const validateTipoDon = [
  body('vtdnCodTdn').isInt({ min: 1 }).withMessage('El código de tipo de donación debe ser un entero positivo.'),
  body('vtdnDescn').trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage('La descripción debe tener entre 2 y 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Screening
const validateScreeni = [
  body('vscrNroScr').isInt({ min: 1 }).withMessage('El número de screening debe ser un entero positivo.'),
  body('vcenCodCen').isInt({ min: 1 }).withMessage('El código de centro debe ser un entero positivo.'),
  body('vdonCodDon').optional().isInt({ min: 1 }).withMessage('El código de donante debe ser un entero positivo.'),
  body('vtdnCodTdn').optional().isInt({ min: 1 }).withMessage('El código de tipo de donación debe ser un entero positivo.'),
  body('vscrDonAnt').optional().isBoolean().withMessage('El campo donación anterior debe ser un valor booleano.'),
  body('vscrDonBsr').optional().isBoolean().withMessage('El campo donación búsqueda debe ser un valor booleano.'),
  body('vscrFecAnt').optional().isISO8601().withMessage('La fecha anterior debe ser una fecha válida.'),
  body('vscrPesodo').optional().trim().isLength({ max: 3 }).withMessage('El peso no puede exceder 3 caracteres.'),
  body('vscrTemped').optional().trim().isLength({ max: 2 }).withMessage('La temperatura no puede exceder 2 caracteres.'),
  body('vscrPulsod').optional().trim().isLength({ max: 2 }).withMessage('El pulso no puede exceder 2 caracteres.'),
  body('vscrPreMax').optional().trim().isLength({ max: 3 }).withMessage('La presión máxima no puede exceder 3 caracteres.'),
  body('vscrPreMin').optional().trim().isLength({ max: 3 }).withMessage('La presión mínima no puede exceder 3 caracteres.'),
  body('vscrFechas').optional().isISO8601().withMessage('La fecha de screening debe ser una fecha válida.'),
  body('vscrGhemog').optional().trim().isLength({ max: 3 }).withMessage('La hemoglobina no puede exceder 3 caracteres.'),
  body('vscrHemato').optional().trim().isLength({ max: 3 }).withMessage('El hematocrito no puede exceder 3 caracteres.'),
  body('vscrSulcob').optional().isBoolean().withMessage('El campo sulcob debe ser un valor booleano.'),
  body('vgrsCodGrs').optional().isInt({ min: 1 }).withMessage('El código de grupo sanguíneo debe ser un entero positivo.'),
  body('vscrResDud').optional().isBoolean().withMessage('El campo resultado dudoso debe ser un valor booleano.'),
  body('vscrGrsCon').optional().isInt({ min: 1 }).withMessage('El grupo confirmado debe ser un entero positivo.'),
  body('vscrComent').optional().trim().isLength({ max: 250 }).withMessage('El comentario no puede exceder 250 caracteres.'),
  body('vscrAparie').optional().isBoolean().withMessage('El campo apariencia debe ser un valor booleano.'),
  body('vscrInsBra').optional().isBoolean().withMessage('El campo insuficiencia braquial debe ser un valor booleano.'),
  body('vscrActivg').optional().isBoolean().withMessage('El campo actividad debe ser un valor booleano.'),
  body('vscrPreSer').optional().isInt({ min: 1 }).withMessage('El preser debe ser un entero positivo.'),
  body('vscrNroEti').optional().trim().isLength({ max: 16 }).withMessage('El número de etiqueta no puede exceder 16 caracteres.'),
  body('vscrLabMed').optional().trim().isLength({ max: 3 }).withMessage('El laboratorio médico no puede exceder 3 caracteres.'),
  body('vscrResMed').optional().isInt({ min: 1 }).withMessage('El resultado médico debe ser un entero positivo.'),
  body('vscrResScr').optional().isInt({ min: 1 }).withMessage('El resultado screening debe ser un entero positivo.'),
  body('vscrResTra').optional().isInt({ min: 1 }).withMessage('El resultado transfusión debe ser un entero positivo.'),
  body('vscrFecMed').optional().isISO8601().withMessage('La fecha médica debe ser una fecha válida.'),
  body('vscrFecLab').optional().isISO8601().withMessage('La fecha laboratorio debe ser una fecha válida.'),
  handleValidationErrors
];

// Validaciones de Equipo de Almacén
const validateEquipoAlmacen = [
  body('vequCodEqu').isInt({ min: 1 }).withMessage('El código de equipo debe ser un entero positivo.'),
  body('vequDescn').trim().notEmpty().isLength({ min: 2, max: 100 }).withMessage('La descripción debe tener entre 2 y 100 caracteres.'),
  body('vequCaract').optional().trim().isLength({ max: 200 }).withMessage('La característica no puede exceder 200 caracteres.'),
  body('vequTipEqu').optional().trim().isLength({ max: 50 }).withMessage('El tipo de equipo no puede exceder 50 caracteres.'),
  body('vequTotF').isInt({ min: 1 }).withMessage('El total de filas debe ser un entero positivo.'),
  body('vequTotCol').isInt({ min: 1 }).withMessage('El total de columnas debe ser un entero positivo.'),
  body('vequTemper').optional().isFloat({ min: -50, max: 100 }).withMessage('La temperatura debe estar entre -50 y 100 grados.'),
  handleValidationErrors
];

// Validaciones de Almacén
const validateAlmacen = [
  body('valmCodAlm').isInt({ min: 1 }).withMessage('El código de almacén debe ser un entero positivo.'),
  body('vequCodEqu').isInt({ min: 1 }).withMessage('El código de equipo debe ser un entero positivo.'),
  body('valmNroF').isInt({ min: 1 }).withMessage('El número de fila debe ser un entero positivo.'),
  body('valmNroCol').isInt({ min: 1 }).withMessage('El número de columna debe ser un entero positivo.'),
  handleValidationErrors
];

// Validaciones de Número de Cuestionario
const validateCuesNro = [
  body('vcueNroCue').isInt({ min: 1 }).withMessage('El número de cuestionario debe ser un entero positivo.'),
  body('vcueDescri').optional().trim().isLength({ max: 50 }).withMessage('La descripción no puede exceder 50 caracteres.'),
  handleValidationErrors
];

// Validaciones de Cuestionario
const validateCuestio = [
  body('vcueNroCue').isInt({ min: 1 }).withMessage('El número de cuestionario debe ser un entero positivo.'),
  body('vcueNroPre').isInt({ min: 1 }).withMessage('El número de pregunta debe ser un entero positivo.'),
  body('vcuePregun').trim().notEmpty().isLength({ min: 2, max: 250 }).withMessage('La pregunta debe tener entre 2 y 250 caracteres.'),
  body('vcueOpcio1').optional().trim().isLength({ max: 10 }).withMessage('La opción 1 no puede exceder 10 caracteres.'),
  body('vcueOpcio2').optional().trim().isLength({ max: 10 }).withMessage('La opción 2 no puede exceder 10 caracteres.'),
  body('vcueRespue').optional().isLength({ min: 1, max: 1 }).withMessage('La respuesta debe ser un solo carácter.'),
  handleValidationErrors
];

// Validaciones de Respuesta de Pregunta
const validateResPreg = [
  body('vscrNroScr').isInt({ min: 1 }).withMessage('El número de screening debe ser un entero positivo.'),
  body('vcenCodCen').isInt({ min: 1 }).withMessage('El código de centro debe ser un entero positivo.'),
  body('vcueNroCue').isInt({ min: 1 }).withMessage('El número de cuestionario debe ser un entero positivo.'),
  body('vcueNroPre').isInt({ min: 1 }).withMessage('El número de pregunta debe ser un entero positivo.'),
  body('vrepResPre').isLength({ min: 1, max: 1 }).withMessage('La respuesta debe ser un solo carácter.'),
  handleValidationErrors
];

// Validaciones de Cita
const validateCitaci = [
  body('vcitNroCit').isInt({ min: 1 }).withMessage('El número de cita debe ser un entero positivo.'),
  body('vuntCodUnt').optional().isInt({ min: 1 }).withMessage('El código de unidad debe ser un entero positivo.'),
  body('vcitNroSol').optional().trim().isLength({ max: 10 }).withMessage('El número de solicitud no puede exceder 10 caracteres.'),
  body('vcitFecCli').optional().isISO8601().withMessage('La fecha de cliente debe ser una fecha válida.'),
  body('vcitHrsCli').optional().trim().isLength({ max: 10 }).withMessage('La hora de cliente no puede exceder 10 caracteres.'),
  body('vcitNomPac').optional().trim().isLength({ max: 50 }).withMessage('El nombre del paciente no puede exceder 50 caracteres.'),
  body('vgrsCodGrs').optional().isInt({ min: 1 }).withMessage('El código de grupo sanguíneo debe ser un entero positivo.'),
  body('vantCantDo').optional().isInt({ min: 1 }).withMessage('La cantidad de donantes debe ser un entero positivo.'),
  body('vresCodRes').optional().isInt({ min: 1 }).withMessage('El código de responsable debe ser un entero positivo.'),
  handleValidationErrors
];

// Validaciones de Cita de Donante
const validateCitaDon = [
  body('vcitNroCit').isInt({ min: 1 }).withMessage('El número de cita debe ser un entero positivo.'),
  body('vdonCodDon').isInt({ min: 1 }).withMessage('El código de donante debe ser un entero positivo.'),
  body('vscrNroScr').isInt({ min: 1 }).withMessage('El número de screening debe ser un entero positivo.'),
  body('vcenCodCen').isInt({ min: 1 }).withMessage('El código de centro debe ser un entero positivo.'),
  body('vcidCanDon').optional().isInt({ min: 1 }).withMessage('La cantidad de donación debe ser un entero positivo.'),
  body('vcidResult').optional().trim().isLength({ max: 50 }).withMessage('El resultado no puede exceder 50 caracteres.'),
  body('vcidSwCita').optional().isBoolean().withMessage('El campo cita debe ser un valor booleano.'),
  handleValidationErrors
];

// Validaciones Generales
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID en la URL debe ser un número entero positivo.'),
  handleValidationErrors
];

const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El parámetro "page" debe ser un número entero positivo.'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('El parámetro "limit" debe ser un número entre 1 y 100.'),
  handleValidationErrors
];

module.exports = {
  validateDonante,
  validateOcupacion,
  validateGradoInstruccion,
  validateLugarNacimiento,
  validateClubDonantes,
  validateZonaDireccion,
  validateTipoDocumento,
  validateTipoBol,
  validateBolsaHe,
  validateReaccio,
  validateGrupSan,
  validateTipoDon,
  validateScreeni,
  validateEquipoAlmacen,
  validateAlmacen,
  validateCuesNro,
  validateCuestio,
  validateResPreg,
  validateCitaci,
  validateCitaDon,
  validateId,
  validatePagination,
  handleValidationErrors
};
