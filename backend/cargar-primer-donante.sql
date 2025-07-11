-- =====================================================
-- CARGA DE DATOS PARA EL PRIMER DONANTE
-- =====================================================

-- 1. INSERTAR OCUPACIONES (solo las necesarias)
INSERT INTO vamOcupaci (vocucodocu, vocudescri) VALUES
(1, 'Médico'),
(2, 'Enfermero/a'),
(3, 'Ingeniero'),
(4, 'Abogado'),
(5, 'Profesor')
ON CONFLICT (vocucodocu) DO NOTHING;

-- 2. INSERTAR GRADOS DE INSTRUCCIÓN
INSERT INTO vamGradIns (vgraCodGra, vgraDescrn) VALUES
(1, 'Primaria'),
(2, 'Secundaria'),
(3, 'Técnico'),
(4, 'Universitario'),
(5, 'Postgrado')
ON CONFLICT (vgraCodGra) DO NOTHING;

-- 3. INSERTAR LUGARES DE NACIMIENTO
INSERT INTO vamLugNaci (vlugCodLug, vlugPaisna, vlugCiudad, vlugProvin) VALUES
(1, 'Bolivia', 'Santa Cruz', 'Santa Cruz'),
(2, 'Bolivia', 'La Paz', 'La Paz'),
(3, 'Bolivia', 'Cochabamba', 'Cochabamba'),
(4, 'Bolivia', 'Oruro', 'Oruro'),
(5, 'Bolivia', 'Potosí', 'Potosí')
ON CONFLICT (vlugCodLug) DO NOTHING;

-- 4. INSERTAR CLUBES DE DONANTES
INSERT INTO vamClubDon (vcluCodClu, vcluDescri, vcluDirecc, vcluTelefo, vcluRepRes) VALUES
(1, 'Club de Donantes Voluntarios', 'Av. Principal 123', '33445566', 'Dr. Juan Pérez'),
(2, 'Asociación de Donantes Regulares', 'Calle Comercial 456', '33445567', 'Lic. María López'),
(3, 'Grupo de Donantes Universitarios', 'Campus Universitario', '33445568', 'Prof. Carlos Ruiz'),
(4, 'Club de Donantes Empresariales', 'Zona Industrial', '33445569', 'Ing. Ana Silva'),
(5, 'Asociación de Donantes Comunitarios', 'Barrio Central', '33445570', 'Sr. Roberto Torres')
ON CONFLICT (vcluCodClu) DO NOTHING;

-- 5. INSERTAR TIPOS DE DOCUMENTO
INSERT INTO vamTipoDid (vtidCodTid, vtidDescr) VALUES
(1, 'Cédula de Identidad'),
(2, 'Pasaporte'),
(3, 'Carnet de Extranjería'),
(4, 'Carnet Militar'),
(5, 'Licencia de Conducir')
ON CONFLICT (vtidCodTid) DO NOTHING;

-- 6. INSERTAR ZONAS DE DIRECCIÓN
INSERT INTO vamZonaDir (vzonCodZon, vlugCodLug, vzonDescr) VALUES
(1, 1, 'Centro'),
(2, 1, 'Norte'),
(3, 1, 'Sur'),
(4, 1, 'Este'),
(5, 1, 'Oeste')
ON CONFLICT (vzonCodZon) DO NOTHING;

-- 7. INSERTAR EL PRIMER DONANTE (María González López)
INSERT INTO vamDonante (
    vdonCodDon, vdonPatern, vdonMatern, vdonNombre, vzonCodZon, 
    vdonDirecc, vdonDesDir, vtidCodTid, vdonDocide, vdonFecNac, 
    vdonEdadDo, vdonEstCiv, vdonSexoDn, vdonTelDom, vdonTelOff, 
    vdonTelCel, vdonEmail, vdonTrabaj, vdonDirTra, vdonCarneT, 
    vocuCodOcu, vgraCodGra, vlugCodLug, vcluCodClu, vresCodRes, vdonSwCita
) VALUES
(1001, 'González', 'López', 'María Elena', 1, 
 'Av. Libertador 123', 'Entre 2do y 3er anillo, cerca del parque', 1, '12345678', '1990-05-15', 
 33, 'S', 'F', '33445566', '33445567', 
 '70012345', 'maria.gonzalez@email.com', 'Hospital San Juan', 'Av. San Martín 456', 0, 
 2, 4, 1, 1, 101, 1)
ON CONFLICT (vdonCodDon) DO NOTHING;

-- =====================================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- =====================================================

-- Verificar que se insertaron correctamente
SELECT 'Ocupaciones insertadas:' as mensaje, COUNT(*) as cantidad FROM vamOcupaci
UNION ALL
SELECT 'Grados de instrucción insertados:', COUNT(*) FROM vamGradIns
UNION ALL
SELECT 'Lugares de nacimiento insertados:', COUNT(*) FROM vamLugNaci
UNION ALL
SELECT 'Clubes de donantes insertados:', COUNT(*) FROM vamClubDon
UNION ALL
SELECT 'Tipos de documento insertados:', COUNT(*) FROM vamTipoDid
UNION ALL
SELECT 'Zonas de dirección insertadas:', COUNT(*) FROM vamZonaDir
UNION ALL
SELECT 'Donantes insertados:', COUNT(*) FROM vamDonante;

-- Mostrar el donante completo con sus relaciones
SELECT 
    d.vdonCodDon as codigo,
    d.vdonPatern || ' ' || d.vdonMatern || ', ' || d.vdonNombre as nombre_completo,
    d.vdonEdadDo as edad,
    d.vdonEstCiv as estado_civil,
    d.vdonSexoDn as sexo,
    d.vdonEmail as email,
    td.vtidDescr as tipo_documento,
    o.vocudescri as ocupacion,
    gi.vgraDescrn as grado_instruccion,
    ln.vlugCiudad as lugar_nacimiento,
    cd.vcluDescri as club_donantes,
    zd.vzonDescr as zona_direccion
FROM vamDonante d
LEFT JOIN vamTipoDid td ON d.vtidCodTid = td.vtidCodTid
LEFT JOIN vamOcupaci o ON d.vocuCodOcu = o.vocuCodOcu
LEFT JOIN vamGradIns gi ON d.vgraCodGra = gi.vgraCodGra
LEFT JOIN vamLugNaci ln ON d.vlugCodLug = ln.vlugCodLug
LEFT JOIN vamClubDon cd ON d.vcluCodClu = cd.vcluCodClu
LEFT JOIN vamZonaDir zd ON d.vzonCodZon = zd.vzonCodZon
WHERE d.vdonCodDon = 1001; 