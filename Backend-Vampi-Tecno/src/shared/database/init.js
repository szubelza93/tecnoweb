const pool = require('../config/database');

const seedInitialData = async (client) => {
  console.log('✅ Sistema simplificado - no se requieren datos iniciales.');
};

const createTables = async () => {
  const client = await pool.connect();
  try {
    console.log('🔄 Iniciando transacción para crear la base de datos...');
    await client.query('BEGIN');
    console.log('🔄 Creando funciones y tablas...');

    // Función para actualizar timestamps
    await client.query(`
      CREATE OR REPLACE FUNCTION update_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    // TABLAS DE GESTIÓN DE DONANTES (crear primero las dependencias)
    await client.query(`CREATE TABLE IF NOT EXISTS vamOcupaci (
      vocucodocu SMALLINT PRIMARY KEY,
      vocudescri VARCHAR(50) NOT NULL
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS vamGradIns (
      vgraCodGra SMALLINT PRIMARY KEY,
      vgraDescrn VARCHAR(50) NOT NULL
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS vamLugNaci (
      vlugCodLug SMALLINT PRIMARY KEY,
      vlugPaisna VARCHAR(20) NOT NULL,
      vlugCiudad VARCHAR(20) NOT NULL,
      vlugProvin VARCHAR(20) NOT NULL
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS vamClubDon (
      vcluCodClu SMALLINT PRIMARY KEY,
      vcluDescri VARCHAR(50) NOT NULL,
      vcluDirecc VARCHAR(50),
      vcluTelefo CHAR(8),
      vcluRepRes VARCHAR(50)
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS vamTipoDid (
      vtidCodTid SMALLINT PRIMARY KEY,
      vtidDescr VARCHAR(50) NOT NULL
    )`);

    await client.query(`CREATE TABLE IF NOT EXISTS vamZonaDir (
      vzonCodZon SMALLINT PRIMARY KEY,
      vlugCodLug SMALLINT,
      vzonDescr VARCHAR(50) NOT NULL
    )`);

    // GESTIÓN DE DONANTES (crear después de las dependencias)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamDonante (
          vdonCodDon INT PRIMARY KEY,
          vdonPatern VARCHAR(50),
          vdonMatern VARCHAR(50),
          vdonNombre VARCHAR(50),
          vzonCodZon SMALLINT,
          vdonDirecc VARCHAR(150),
          vdonDesDir VARCHAR(350),
          vtidCodTid SMALLINT,
          vdonDocide VARCHAR(15),
          vdonFecNac DATE,
          vdonEdadDo SMALLINT,
          vdonEstCiv CHAR(1),
          vdonSexoDn CHAR(1),
          vdonTelDom CHAR(8),
          vdonTelOff CHAR(8),
          vdonTelCel CHAR(8),
          vdonEmail VARCHAR(150),
          vdonTrabaj VARCHAR(150),
          vdonDirTra VARCHAR(150),
          vdonCarneT BIT,
          vocuCodOcu SMALLINT,
          vgraCodGra SMALLINT,
          vlugCodLug SMALLINT,
          vcluCodClu SMALLINT,
          vresCodRes SMALLINT,
          vdonSwCita BIT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_don_tipo_doc FOREIGN KEY (vtidCodTid) REFERENCES vamTipoDid(vtidCodTid),
          CONSTRAINT fk_don_ocupacion FOREIGN KEY (vocuCodOcu) REFERENCES vamOcupaci(vocuCodOcu),
          CONSTRAINT fk_don_grado_inst FOREIGN KEY (vgraCodGra) REFERENCES vamGradIns(vgraCodGra),
          CONSTRAINT fk_don_lug_nac FOREIGN KEY (vlugCodLug) REFERENCES vamLugNaci(vlugCodLug),
          CONSTRAINT fk_don_club FOREIGN KEY (vcluCodClu) REFERENCES vamClubDon(vcluCodClu),
          CONSTRAINT fk_don_zona FOREIGN KEY (vzonCodZon) REFERENCES vamZonaDir(vzonCodZon),
          CONSTRAINT chk_don_estado_civil CHECK (vdonEstCiv IN ('S', 'C', 'D', 'V')),
          CONSTRAINT chk_don_sexo CHECK (vdonSexoDn IN ('M', 'F')),
          CONSTRAINT chk_don_edad CHECK (vdonEdadDo >= 18 AND vdonEdadDo <= 100),
          CONSTRAINT chk_don_email CHECK (vdonEmail ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$' OR vdonEmail IS NULL),
          CONSTRAINT chk_don_telefono_domicilio CHECK (vdonTelDom ~ '^[0-9]{8}$' OR vdonTelDom IS NULL),
          CONSTRAINT chk_don_telefono_oficina CHECK (vdonTelOff ~ '^[0-9]{8}$' OR vdonTelOff IS NULL),
          CONSTRAINT chk_don_celular CHECK (vdonTelCel ~ '^[0-9]{8}$' OR vdonTelCel IS NULL)
      )
    `);

    // TABLA DE FOTOS DE DONANTES
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamDonFoto (
          vdonCodDon INT UNIQUE REFERENCES vamDonante(vdonCodDon) ON DELETE CASCADE,
          vdonFotogr BYTEA,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // TABLA DE TIPOS DE BOLSA (GESTIÓN DE EXTRACCIÓN)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamTipoBoi (
          vtblCodTbl SMALLINT PRIMARY KEY,
          vtblDescri VARCHAR(30) NOT NULL,
          vtblCaract VARCHAR(50),
          vtblNivelb CHAR(1),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // TABLA DE BOLSAS HEMATOLÓGICAS (GESTIÓN DE EXTRACCIÓN)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamBolsaHe (
          vbolCodBol SMALLINT PRIMARY KEY,
          vbolCodTbl SMALLINT,
          vbolDescri VARCHAR(50) NOT NULL,
          vbolMarcab VARCHAR(30),
          vbolRendm VARCHAR(250),
          vbolIngres SMALLINT,
          vbolSalida SMALLINT,
          vbolCantid SMALLINT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_bolsa_tipo FOREIGN KEY (vbolCodTbl) REFERENCES vamTipoBoi(vtblCodTbl)
      )
    `);

    // TABLA DE REACCIONES (GESTIÓN DE EXTRACCIÓN)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamReaccio (
          vracCodRac SMALLINT PRIMARY KEY,
          vracDescri VARCHAR(30) NOT NULL,
          vracCaract VARCHAR(50)
      )
    `);

    // TABLA DE GRUPOS SANGUÍNEOS (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamGrupSan (
          vqrsCodGrs SMALLINT PRIMARY KEY,
          vqrsGruABO VARCHAR(15) NOT NULL,
          vqrsTipoRH CHAR(1) NOT NULL,
          vprgCodPrg SMALLINT NOT NULL,
          vprgEstMin SMALLINT NOT NULL,
          vprgEstMax SMALLINT NOT NULL
      )
    `);

    // TABLA DE TIPOS DE DONACIÓN (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamTipoDon (
          vtdnCodTdn SMALLINT PRIMARY KEY,
          vtdnDescn VARCHAR(50) NOT NULL
      )
    `);

    // TABLA DE SCREENING (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamScreeni (
          vscrNroScr INT,
          vcenCodCen SMALLINT,
          vdonCodDon INT,
          vtdnCodTdn SMALLINT,
          vscrDonAnt BOOLEAN,
          vscrDonBsr BOOLEAN,
          vscrFecAnt TIMESTAMP,
          vscrPesodo VARCHAR(3),
          vscrTemped VARCHAR(2),
          vscrPulsod VARCHAR(2),
          vscrPreMax VARCHAR(3),
          vscrPreMin VARCHAR(3),
          vscrFechas TIMESTAMP,
          vscrGhemog VARCHAR(3),
          vscrHemato VARCHAR(3),
          vscrSulcob BOOLEAN,
          vgrsCodGrs SMALLINT,
          vscrResDud BOOLEAN,
          vscrGrsCon SMALLINT,
          vscrComent VARCHAR(250),
          vscrAparie BOOLEAN,
          vscrInsBra BOOLEAN,
          vscrActivg BOOLEAN,
          vscrPreSer SMALLINT,
          vscrNroEti VARCHAR(16),
          vscrLabMed CHAR(3),
          vscrResMed SMALLINT,
          vscrResScr SMALLINT,
          vscrResTra SMALLINT,
          vscrFecMed TIMESTAMP,
          vscrFecLab TIMESTAMP,
          PRIMARY KEY (vscrNroScr, vcenCodCen),
          CONSTRAINT fk_scr_grupo_san FOREIGN KEY (vgrsCodGrs) REFERENCES vamGrupSan (vqrsCodGrs),
          CONSTRAINT fk_scr_tipo_don FOREIGN KEY (vtdnCodTdn) REFERENCES vamTipoDon (vtdnCodTdn),
          CONSTRAINT fk_scr_donante FOREIGN KEY (vdonCodDon) REFERENCES vamDonante (vdonCodDon)
      )
    `);

    // TABLA DE EXTRACCIÓN DE DONANTES (GESTIÓN DE EXTRACCIÓN)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamExtDona (
          vexdNroExd INT PRIMARY KEY,
          vscrNroScr INT NOT NULL,
          vcenCodCen INT NOT NULL,
          vexdFecIni TIMESTAMP,
          vexdFecFin TIMESTAMP,
          vexdBrazoe BIT,
          vexdReacci BIT,
          vracCodRac SMALLINT,
          vexdResult CHAR(1),
          vexdObsequ BIT,
          vexdRefrig BIT,
          vexdCantmi INT,
          vbolCodBol SMALLINT NOT NULL,
          vexdTubula VARCHAR(10),
          vgrsCodGrs SMALLINT,
          vexdHpraci BIT,
          vexdHprant BIT,
          vexdScrivi BIT,
          vexdEsiExd CHAR(1),
          vexdResExd SMALLINT,
          vexdResTra SMALLINT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_extdona_screening FOREIGN KEY (vscrNroScr, vcenCodCen) 
              REFERENCES vamScreeni(vscrNroScr, vcenCodCen),
          CONSTRAINT fk_extdona_bolsa FOREIGN KEY (vbolCodBol) 
              REFERENCES vamBolsaHe(vbolCodBol),
          CONSTRAINT fk_extdona_reaccion FOREIGN KEY (vracCodRac) 
              REFERENCES vamReaccio(vracCodRac),
          CONSTRAINT fk_extdona_grupo_sanguineo FOREIGN KEY (vgrsCodGrs) 
              REFERENCES vamGrupSan(vqrsCodGrs)
      )
    `);

    // TABLA DE SERVICIOS DE CRIOVINIFICACIÓN (GESTIÓN DE EXTRACCIÓN)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamSerCrvi (
          vcviNroPru INT PRIMARY KEY,
          vexdNroExd INT NOT NULL,
          vcviFecIni TIMESTAMP,
          vcviFecLib TIMESTAMP,
          vcviCodCrv SMALLINT,
          vcviNroFra SMALLINT,
          vresCodRes INT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_sercrvi_extdona FOREIGN KEY (vexdNroExd) 
              REFERENCES vamExtDona(vexdNroExd),
          CONSTRAINT chk_sercrvi_fecha_logica CHECK (vcviFecLib >= vcviFecIni OR vcviFecLib IS NULL),
          CONSTRAINT chk_sercrvi_numero_fraccion CHECK (vcviNroFra > 0 OR vcviNroFra IS NULL)
      )
    `);

    // TABLA DE NÚMEROS DE CUESTIONARIO (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamCuesNro (
          vcueNroCue SMALLINT PRIMARY KEY,
          vcueDescri VARCHAR(50)
      )
    `);

    // TABLA DE CUESTIONARIOS (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamCuestio (
          vcueNroCue SMALLINT,
          vcueNroPre SMALLINT,
          vcuePregun VARCHAR(250),
          vcueOpcio1 VARCHAR(10),
          vcueOpcio2 VARCHAR(10),
          vcueRespue CHAR(1),
          PRIMARY KEY (vcueNroCue, vcueNroPre),
          CONSTRAINT fk_cues_numero FOREIGN KEY (vcueNroCue) REFERENCES vamCuesNro (vcueNroCue)
      )
    `);

    // TABLA DE RESPUESTAS DE PREGUNTAS (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamResPreg (
          vscrNroScr INT,
          vcenCodCen SMALLINT,
          vcueNroCue SMALLINT,
          vcueNroPre SMALLINT,
          vrepResPre CHAR(1),
          PRIMARY KEY (vscrNroScr, vcenCodCen, vcueNroCue, vcueNroPre),
          CONSTRAINT fk_resp_screening FOREIGN KEY (vscrNroScr, vcenCodCen) REFERENCES vamScreeni (vscrNroScr, vcenCodCen),
          CONSTRAINT fk_resp_cuestion FOREIGN KEY (vcueNroCue, vcueNroPre) REFERENCES vamCuestio (vcueNroCue, vcueNroPre)
      )
    `);

    // TABLA DE CITAS (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamCitaci (
          vcitNroCit SMALLINT PRIMARY KEY,
          vuntCodUnt SMALLINT,
          vcitNroSol VARCHAR(10),
          vcitFecCli TIMESTAMP,
          vcitHrsCli VARCHAR(10),
          vcitNomPac VARCHAR(50),
          vgrsCodGrs SMALLINT,
          vantCantDo SMALLINT,
          vresCodRes SMALLINT,
          CONSTRAINT fk_cita_grupo_sanguineo FOREIGN KEY (vgrsCodGrs) REFERENCES vamGrupSan (vqrsCodGrs)
      )
    `);

    // TABLA DE CITAS DE DONANTES (GESTIÓN DE SCREENING)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamCitaDon (
          vcitNroCit SMALLINT,
          vdonCodDon INT,
          vscrNroScr INT,
          vcenCodCen SMALLINT,
          vcidCanDon SMALLINT,
          vcidResult VARCHAR(50),
          vcidSwCita BOOLEAN,
          PRIMARY KEY (vcitNroCit, vdonCodDon, vscrNroScr, vcenCodCen),
          CONSTRAINT fk_citadon_cita FOREIGN KEY (vcitNroCit) REFERENCES vamCitaci (vcitNroCit),
          CONSTRAINT fk_citadon_donante FOREIGN KEY (vdonCodDon) REFERENCES vamDonante (vdonCodDon),
          CONSTRAINT fk_citadon_screening FOREIGN KEY (vscrNroScr, vcenCodCen) REFERENCES vamScreeni (vscrNroScr, vcenCodCen)
      )
    `);

    // TABLA DE PRUEBAS (GESTIÓN DE LABORATORIO)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamPruebas (
          vpruCodPru SMALLINT PRIMARY KEY,
          vpruDescri VARCHAR(30) NOT NULL,
          vpruCaract VARCHAR(250),
          vpruCodNiv CHAR(2),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // TABLA DE SEROLOGÍAS (GESTIÓN DE LABORATORIO)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamSerolog (
          vserNroPru INT PRIMARY KEY,
          vexdNroExd INT NOT NULL,
          vpruCodPru SMALLINT NOT NULL,
          vpatCodPat SMALLINT,
          vreaCodRea SMALLINT,
          vserResult CHAR(1),
          vserEnvCne CHAR(1),
          vserResCne CHAR(1),
          vresCodRes SMALLINT,
          vserCanPru SMALLINT,
          vserFecSer TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_serolog_extraccion FOREIGN KEY (vexdNroExd) 
              REFERENCES vamExtDona(vexdNroExd),
          CONSTRAINT fk_serolog_prueba FOREIGN KEY (vpruCodPru) 
              REFERENCES vamPruebas(vpruCodPru)
      )
    `);

    // TABLA DE EQUIPOS DE ALMACÉN (GESTIÓN DE PRODUCCIÓN)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamEquAlm (
          vequCodEqu SMALLINT PRIMARY KEY,
          vequDescn VARCHAR(100) NOT NULL,
          vequCaract VARCHAR(200),
          vequTipEqu VARCHAR(50),
          vequTotF SMALLINT NOT NULL,
          vequTotCol SMALLINT NOT NULL,
          vequTemper DECIMAL(4,1),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // TABLA DE ALMACÉN (GESTIÓN DE PRODUCCIÓN)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vamAlmacen (
          valmCodAlm SMALLINT PRIMARY KEY,
          vequCodEqu SMALLINT NOT NULL,
          "valmNroF#" SMALLINT NOT NULL,
          valmNroCol SMALLINT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_almacen_equipo FOREIGN KEY (vequCodEqu) REFERENCES vamEquAlm(vequCodEqu),
          CONSTRAINT uk_almacen_posicion UNIQUE (vequCodEqu, "valmNroF#", valmNroCol)
      )
    `);

    console.log('✅ Tablas creadas correctamente.');

    // ÍNDICES
    console.log('🔄 Creando índices...');
    await client.query(`CREATE INDEX IF NOT EXISTS idx_ocupacion_descripcion ON vamOcupaci(vocudescri)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_grado_descripcion ON vamGradIns(vgraDescrn)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_lugar_ciudad ON vamLugNaci(vlugCiudad)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_club_descripcion ON vamClubDon(vcluDescri)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_zona_descripcion ON vamZonaDir(vzonDescr)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tipo_documento_descripcion ON vamTipoDid(vtidDescr)`);
    // Índices para la nueva tabla de donantes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_codigo ON vamDonante(vdonCodDon)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_nombre ON vamDonante(vdonNombre)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_apellido_paterno ON vamDonante(vdonPatern)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_apellido_materno ON vamDonante(vdonMatern)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_documento ON vamDonante(vdonDocide)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_email ON vamDonante(vdonEmail)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_fecha_nacimiento ON vamDonante(vdonFecNac)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_estado_civil ON vamDonante(vdonEstCiv)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_sexo ON vamDonante(vdonSexoDn)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_telefono ON vamDonante(vdonTelCel)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_zona ON vamDonante(vzonCodZon)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_ocupacion ON vamDonante(vocuCodOcu)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_grado ON vamDonante(vgraCodGra)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_lugar_nacimiento ON vamDonante(vlugCodLug)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_club ON vamDonante(vcluCodClu)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_donante_tipo_documento ON vamDonante(vtidCodTid)`);
    // Índices para la tabla de tipos de bolsa
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tipo_bolsa_codigo ON vamTipoBoi(vtblCodTbl)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tipo_bolsa_descripcion ON vamTipoBoi(vtblDescri)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tipo_bolsa_caracteristica ON vamTipoBoi(vtblCaract)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tipo_bolsa_nivel ON vamTipoBoi(vtblNivelb)`);

    // Índices para la tabla de bolsas hematológicas
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bolsa_hematologica_codigo ON vamBolsaHe(vbolCodBol)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bolsa_hematologica_tipo ON vamBolsaHe(vbolCodTbl)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bolsa_hematologica_descripcion ON vamBolsaHe(vbolDescri)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bolsa_hematologica_marca ON vamBolsaHe(vbolMarcab)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_bolsa_hematologica_cantidad ON vamBolsaHe(vbolCantid)`);

    // Índices para la tabla de reacciones
    await client.query(`CREATE INDEX IF NOT EXISTS idx_reaccion_codigo ON vamReaccio(vracCodRac)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_reaccion_descripcion ON vamReaccio(vracDescri)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_reaccion_caracteristica ON vamReaccio(vracCaract)`);

    // Índices para la tabla de extracción de donantes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_numero ON vamExtDona(vexdNroExd)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_screening ON vamExtDona(vscrNroScr, vcenCodCen)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_fecha_inicio ON vamExtDona(vexdFecIni)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_fecha_fin ON vamExtDona(vexdFecFin)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_bolsa ON vamExtDona(vbolCodBol)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_reaccion ON vamExtDona(vracCodRac)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_grupo_sanguineo ON vamExtDona(vgrsCodGrs)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_resultado ON vamExtDona(vexdResult)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_extraccion_estado ON vamExtDona(vexdEsiExd)`);

    // Índices para la tabla de servicios de criovinificación
    await client.query(`CREATE INDEX IF NOT EXISTS idx_servicio_criovinificacion_numero ON vamSerCrvi(vcviNroPru)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_servicio_criovinificacion_extraccion ON vamSerCrvi(vexdNroExd)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_servicio_criovinificacion_fecha_inicio ON vamSerCrvi(vcviFecIni)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_servicio_criovinificacion_fecha_lib ON vamSerCrvi(vcviFecLib)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_servicio_criovinificacion_codigo ON vamSerCrvi(vcviCodCrv)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_servicio_criovinificacion_fraccion ON vamSerCrvi(vcviNroFra)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_servicio_criovinificacion_responsable ON vamSerCrvi(vresCodRes)`);

    // Índices para la tabla de grupos sanguíneos
    await client.query(`CREATE INDEX IF NOT EXISTS idx_grupo_sanguineo_codigo ON vamGrupSan(vqrsCodGrs)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_grupo_sanguineo_abo ON vamGrupSan(vqrsGruABO)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_grupo_sanguineo_rh ON vamGrupSan(vqrsTipoRH)`);

    // Índices para la tabla de tipos de donación
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tipo_donacion_codigo ON vamTipoDon(vtdnCodTdn)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_tipo_donacion_descripcion ON vamTipoDon(vtdnDescn)`);

    // Índices para la tabla de screening
    await client.query(`CREATE INDEX IF NOT EXISTS idx_screening_numero ON vamScreeni(vscrNroScr)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_screening_centro ON vamScreeni(vcenCodCen)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_screening_donante ON vamScreeni(vdonCodDon)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_screening_tipo_donacion ON vamScreeni(vtdnCodTdn)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_screening_grupo_sanguineo ON vamScreeni(vgrsCodGrs)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_screening_fecha ON vamScreeni(vscrFechas)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_screening_etiqueta ON vamScreeni(vscrNroEti)`);
    
    // Índices para la tabla de números de cuestionario
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cuestionario_numero_codigo ON vamCuesNro(vcueNroCue)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cuestionario_numero_descripcion ON vamCuesNro(vcueDescri)`);
    
    // Índices para la tabla de cuestionarios
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cuestionario_numero ON vamCuestio(vcueNroCue)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cuestionario_pregunta ON vamCuestio(vcueNroPre)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cuestionario_pregunta_texto ON vamCuestio(vcuePregun)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cuestionario_respuesta ON vamCuestio(vcueRespue)`);
    
    // Índices para la tabla de respuestas de preguntas
    await client.query(`CREATE INDEX IF NOT EXISTS idx_respuesta_screening ON vamResPreg(vscrNroScr, vcenCodCen)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_respuesta_cuestionario ON vamResPreg(vcueNroCue, vcueNroPre)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_respuesta_valor ON vamResPreg(vrepResPre)`);
    
    // Índices para la tabla de citas
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_numero ON vamCitaci(vcitNroCit)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_unidad ON vamCitaci(vuntCodUnt)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_solicitud ON vamCitaci(vcitNroSol)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_fecha ON vamCitaci(vcitFecCli)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_paciente ON vamCitaci(vcitNomPac)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_grupo_sanguineo ON vamCitaci(vgrsCodGrs)`);
    
    // Índices para la tabla de citas de donantes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_donante_cita ON vamCitaDon(vcitNroCit)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_donante_donante ON vamCitaDon(vdonCodDon)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_donante_screening ON vamCitaDon(vscrNroScr, vcenCodCen)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_donante_resultado ON vamCitaDon(vcidResult)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_cita_donante_estado ON vamCitaDon(vcidSwCita)`);
    
    // Índices para la tabla de equipos de almacén
    await client.query(`CREATE INDEX IF NOT EXISTS idx_equipo_almacen_codigo ON vamEquAlm(vequCodEqu)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_equipo_almacen_descripcion ON vamEquAlm(vequDescn)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_equipo_almacen_tipo ON vamEquAlm(vequTipEqu)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_equipo_almacen_temperatura ON vamEquAlm(vequTemper)`);
    
    // Índices para la tabla de almacén
    await client.query(`CREATE INDEX IF NOT EXISTS idx_almacen_codigo ON vamAlmacen(valmCodAlm)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_almacen_equipo ON vamAlmacen(vequCodEqu)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_almacen_fila ON vamAlmacen("valmNroF#")`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_almacen_columna ON vamAlmacen(valmNroCol)`);
    
    // Índices para la tabla de pruebas
    await client.query(`CREATE INDEX IF NOT EXISTS idx_prueba_codigo ON vamPruebas(vpruCodPru)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_prueba_descripcion ON vamPruebas(vpruDescri)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_prueba_caracteristica ON vamPruebas(vpruCaract)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_prueba_codigo_nivel ON vamPruebas(vpruCodNiv)`);
    
    // Índices para la tabla de serologías
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_numero ON vamSerolog(vserNroPru)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_extraccion ON vamSerolog(vexdNroExd)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_prueba ON vamSerolog(vpruCodPru)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_patologia ON vamSerolog(vpatCodPat)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_reaccion ON vamSerolog(vreaCodRea)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_resultado ON vamSerolog(vserResult)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_envio_cne ON vamSerolog(vserEnvCne)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_respuesta_cne ON vamSerolog(vserResCne)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_responsable ON vamSerolog(vresCodRes)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_cantidad_prueba ON vamSerolog(vserCanPru)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_serolog_fecha_serologia ON vamSerolog(vserFecSer)`);
    
    console.log('✅ Índices creados.');

    // TRIGGERS
    console.log('🔄 Creando triggers...');

    // Trigger para vamDonante (sin comillas)
    await client.query(`DROP TRIGGER IF EXISTS tr_vamdonante_updated_at ON vamDonante`);
    await client.query(`
      CREATE TRIGGER tr_vamdonante_updated_at 
      BEFORE UPDATE ON vamDonante 
      FOR EACH ROW EXECUTE PROCEDURE update_timestamp()
    `);

    // Trigger para vamTipoBoi (sin comillas)
    await client.query(`DROP TRIGGER IF EXISTS tr_vamTipoBoi_updated_at ON vamTipoBoi`);
    await client.query(`
      CREATE TRIGGER tr_vamTipoBoi_updated_at 
      BEFORE UPDATE ON vamTipoBoi 
      FOR EACH ROW EXECUTE PROCEDURE update_timestamp()
    `);

    // Trigger para vamBolsaHe (sin comillas)
    await client.query(`DROP TRIGGER IF EXISTS tr_vamBolsaHe_updated_at ON vamBolsaHe`);
    await client.query(`
      CREATE TRIGGER tr_vamBolsaHe_updated_at 
      BEFORE UPDATE ON vamBolsaHe 
      FOR EACH ROW EXECUTE PROCEDURE update_timestamp()
    `);

    // Trigger para vamEquAlm (sin comillas)
    await client.query(`DROP TRIGGER IF EXISTS tr_vamEquAlm_updated_at ON vamEquAlm`);
    await client.query(`
      CREATE TRIGGER tr_vamEquAlm_updated_at 
      BEFORE UPDATE ON vamEquAlm 
      FOR EACH ROW EXECUTE PROCEDURE update_timestamp()
    `);

    // Trigger para vamAlmacen (sin comillas)
    await client.query(`DROP TRIGGER IF EXISTS tr_vamAlmacen_updated_at ON vamAlmacen`);
    await client.query(`
      CREATE TRIGGER tr_vamAlmacen_updated_at 
      BEFORE UPDATE ON vamAlmacen 
      FOR EACH ROW EXECUTE PROCEDURE update_timestamp()
    `);

    // Trigger para vamPruebas (sin comillas)
    await client.query(`DROP TRIGGER IF EXISTS tr_vamPruebas_updated_at ON vamPruebas`);
    await client.query(`
      CREATE TRIGGER tr_vamPruebas_updated_at 
      BEFORE UPDATE ON vamPruebas 
      FOR EACH ROW EXECUTE PROCEDURE update_timestamp()
    `);

    // Trigger para vamSerolog (sin comillas)
    await client.query(`DROP TRIGGER IF EXISTS tr_vamSerolog_updated_at ON vamSerolog`);
    await client.query(`
      CREATE TRIGGER tr_vamSerolog_updated_at 
      BEFORE UPDATE ON vamSerolog 
      FOR EACH ROW EXECUTE PROCEDURE update_timestamp()
    `);

    console.log('✅ Triggers creados.');

    console.log('✅ Sistema listo para usar.');

    await seedInitialData(client);
    await client.query('COMMIT');
    console.log('🎉🎉🎉 BASE DE DATOS CREADA Y SEMBRADA 🎉🎉🎉');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error durante la inicialización de la base de datos.');
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};

if (require.main === module) {
  createTables()
    .then(() => {
      console.log('🚀 Proceso de inicialización completado.');
      process.exit(0);
    })
    .catch(() => {
      console.error('💥 Falló el proceso de inicialización base de datos.');
      process.exit(1);
    });
}

module.exports = { createTables };
