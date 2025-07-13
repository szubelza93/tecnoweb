-- =====================================================
-- SCRIPT DE PRUEBA PARA CREAR UN DONANTE
-- =====================================================

-- Verificar que las tablas relacionadas tengan datos
SELECT 'Verificando datos de tablas relacionadas:' as info;

SELECT 'vamTipoDid:' as tabla, COUNT(*) as cantidad FROM vamTipoDid
UNION ALL
SELECT 'vamOcupaci:', COUNT(*) FROM vamOcupaci
UNION ALL
SELECT 'vamGradIns:', COUNT(*) FROM vamGradIns
UNION ALL
SELECT 'vamLugNaci:', COUNT(*) FROM vamLugNaci
UNION ALL
SELECT 'vamClubDon:', COUNT(*) FROM vamClubDon
UNION ALL
SELECT 'vamZonaDir:', COUNT(*) FROM vamZonaDir;

-- Mostrar algunos datos de ejemplo
SELECT 'Tipos de documento disponibles:' as info;
SELECT vtidCodTid, vtidDescr FROM vamTipoDid ORDER BY vtidCodTid LIMIT 3;

SELECT 'Ocupaciones disponibles:' as info;
SELECT vocucodocu, vocudescri FROM vamOcupaci ORDER BY vocucodocu LIMIT 3;

SELECT 'Grados de instrucción disponibles:' as info;
SELECT vgraCodGra, vgraDescrn FROM vamGradIns ORDER BY vgraCodGra LIMIT 3;

SELECT 'Lugares de nacimiento disponibles:' as info;
SELECT vlugCodLug, vlugCiudad FROM vamLugNaci ORDER BY vlugCodLug LIMIT 3;

SELECT 'Clubes de donantes disponibles:' as info;
SELECT vcluCodClu, vcluDescri FROM vamClubDon ORDER BY vcluCodClu LIMIT 3;

SELECT 'Zonas de dirección disponibles:' as info;
SELECT vzonCodZon, vzonDescr FROM vamZonaDir ORDER BY vzonCodZon LIMIT 3;

-- Crear un donante de prueba (si no existe)
INSERT INTO vamDonante (
    vdonCodDon, vdonPatern, vdonMatern, vdonNombre, vzonCodZon, 
    vdonDirecc, vdonDesDir, vtidCodTid, vdonDocide, vdonFecNac, 
    vdonEdadDo, vdonEstCiv, vdonSexoDn, vdonTelDom, vdonTelOff, 
    vdonTelCel, vdonEmail, vdonTrabaj, vdonDirTra, vdonCarneT, 
    vocuCodOcu, vgraCodGra, vlugCodLug, vcluCodClu, vresCodRes, vdonSwCita
) VALUES
(1002, 'Pérez', 'García', 'Juan Carlos', 2, 
 'Calle Sucre 456', 'Zona norte, cerca del parque central', 1, '87654321', '1988-12-10', 
 35, 'C', 'M', '33445577', '33445578', 
 '70087654', 'juan.perez@email.com', 'Empresa ABC', 'Av. Principal 789', '0', 
 3, 4, 2, 2, 102, '1')
ON CONFLICT (vdonCodDon) DO NOTHING;

-- Verificar el donante creado
SELECT 'Donante creado:' as info;
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
WHERE d.vdonCodDon = 1002;

-- Mostrar todos los donantes
SELECT 'Todos los donantes:' as info;
SELECT 
    vdonCodDon as codigo,
    vdonPatern || ' ' || vdonMatern || ', ' || vdonNombre as nombre_completo,
    vdonEdadDo as edad,
    vdonEstCiv as estado_civil,
    vdonSexoDn as sexo,
    vdonEmail as email
FROM vamDonante 
ORDER BY vdonCodDon; 