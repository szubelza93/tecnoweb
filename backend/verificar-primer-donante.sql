-- =====================================================
-- VERIFICACIÓN DEL PRIMER DONANTE Y SUS DATOS RELACIONADOS
-- =====================================================

-- Verificar el donante con ID 1001
SELECT 
    'DONANTE PRINCIPAL' as seccion,
    vdonCodDon as codigo,
    vdonPatern as apellido_paterno,
    vdonMatern as apellido_materno,
    vdonNombre as nombre,
    vdonEdadDo as edad,
    vdonEstCiv as estado_civil,
    vdonSexoDn as sexo,
    vdonDocide as documento,
    vdonEmail as email,
    vdonTelCel as telefono_celular,
    vdonFecNac as fecha_nacimiento
FROM vamDonante 
WHERE vdonCodDon = 1001;

-- Verificar datos relacionados del donante 1001
SELECT 
    'DATOS RELACIONADOS' as seccion,
    d.vdonCodDon,
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

-- Verificar si existen las tablas relacionadas con datos
SELECT 'TABLAS RELACIONADAS' as seccion;
SELECT 'vamTipoDid' as tabla, COUNT(*) as cantidad FROM vamTipoDid
UNION ALL
SELECT 'vamOcupaci', COUNT(*) FROM vamOcupaci
UNION ALL
SELECT 'vamGradIns', COUNT(*) FROM vamGradIns
UNION ALL
SELECT 'vamLugNaci', COUNT(*) FROM vamLugNaci
UNION ALL
SELECT 'vamClubDon', COUNT(*) FROM vamClubDon
UNION ALL
SELECT 'vamZonaDir', COUNT(*) FROM vamZonaDir;

-- Mostrar algunos datos de las tablas relacionadas
SELECT 'TIPOS DE DOCUMENTO:' as info;
SELECT vtidCodTid, vtidDescr FROM vamTipoDid ORDER BY vtidCodTid;

SELECT 'OCUPACIONES:' as info;
SELECT vocucodocu, vocudescri FROM vamOcupaci ORDER BY vocucodocu;

SELECT 'GRADOS DE INSTRUCCIÓN:' as info;
SELECT vgraCodGra, vgraDescrn FROM vamGradIns ORDER BY vgraCodGra;

SELECT 'LUGARES DE NACIMIENTO:' as info;
SELECT vlugCodLug, vlugPaisna, vlugCiudad FROM vamLugNaci ORDER BY vlugCodLug;

SELECT 'CLUBES DE DONANTES:' as info;
SELECT vcluCodClu, vcluDescri FROM vamClubDon ORDER BY vcluCodClu;

SELECT 'ZONAS DE DIRECCIÓN:' as info;
SELECT vzonCodZon, vzonDescr FROM vamZonaDir ORDER BY vzonCodZon; 