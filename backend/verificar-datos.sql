-- =====================================================
-- VERIFICACIÓN DE DATOS EXISTENTES EN LA BASE DE DATOS
-- =====================================================

-- Verificar cuántos registros hay en cada tabla
SELECT 'vamOcupaci' as tabla, COUNT(*) as cantidad FROM vamOcupaci
UNION ALL
SELECT 'vamGradIns', COUNT(*) FROM vamGradIns
UNION ALL
SELECT 'vamLugNaci', COUNT(*) FROM vamLugNaci
UNION ALL
SELECT 'vamClubDon', COUNT(*) FROM vamClubDon
UNION ALL
SELECT 'vamTipoDid', COUNT(*) FROM vamTipoDid
UNION ALL
SELECT 'vamZonaDir', COUNT(*) FROM vamZonaDir
UNION ALL
SELECT 'vamDonante', COUNT(*) FROM vamDonante;

-- Mostrar todos los donantes existentes
SELECT 
    vdonCodDon as codigo,
    vdonPatern || ' ' || vdonMatern || ', ' || vdonNombre as nombre_completo,
    vdonEdadDo as edad,
    vdonSexoDn as sexo,
    vdonEstCiv as estado_civil,
    vdonEmail as email
FROM vamDonante 
ORDER BY vdonCodDon;

-- Verificar si hay datos en las tablas dependientes
SELECT 'Ocupaciones:' as info;
SELECT vocucodocu, vocudescri FROM vamOcupaci ORDER BY vocucodocu;

SELECT 'Grados de instrucción:' as info;
SELECT vgraCodGra, vgraDescrn FROM vamGradIns ORDER BY vgraCodGra;

SELECT 'Lugares de nacimiento:' as info;
SELECT vlugCodLug, vlugPaisna, vlugCiudad FROM vamLugNaci ORDER BY vlugCodLug;

SELECT 'Clubes de donantes:' as info;
SELECT vcluCodClu, vcluDescri FROM vamClubDon ORDER BY vcluCodClu;

SELECT 'Tipos de documento:' as info;
SELECT vtidCodTid, vtidDescr FROM vamTipoDid ORDER BY vtidCodTid;

SELECT 'Zonas de dirección:' as info;
SELECT vzonCodZon, vzonDescr FROM vamZonaDir ORDER BY vzonCodZon; 