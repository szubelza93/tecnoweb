-- =====================================================
-- SCRIPT DE PRUEBA PARA GENERACIÓN AUTOMÁTICA DE CÓDIGOS
-- =====================================================

-- Verificar códigos existentes
SELECT 'Códigos existentes:' as info;
SELECT vdonCodDon as codigo, 
       vdonPatern || ' ' || vdonMatern || ', ' || vdonNombre as nombre_completo
FROM vamDonante 
ORDER BY vdonCodDon;

-- Verificar el máximo código actual
SELECT 'Máximo código actual:' as info;
SELECT COALESCE(MAX(vdonCodDon), 0) as max_codigo FROM vamDonante;

-- Verificar el siguiente código que se generaría
SELECT 'Siguiente código a generar:' as info;
SELECT COALESCE(MAX(vdonCodDon), 0) + 1 as siguiente_codigo FROM vamDonante;

-- Crear un donante de prueba con código automático (simular lo que haría el backend)
INSERT INTO vamDonante (
    vdonCodDon, vdonPatern, vdonMatern, vdonNombre, vzonCodZon, 
    vdonDirecc, vdonDesDir, vtidCodTid, vdonDocide, vdonFecNac, 
    vdonEdadDo, vdonEstCiv, vdonSexoDn, vdonTelDom, vdonTelOff, 
    vdonTelCel, vdonEmail, vdonTrabaj, vdonDirTra, vdonCarneT, 
    vocuCodOcu, vgraCodGra, vlugCodLug, vcluCodClu, vresCodRes, vdonSwCita
) VALUES
((SELECT COALESCE(MAX(vdonCodDon), 0) + 1 FROM vamDonante), 'López', 'Martínez', 'Ana María', 3, 
 'Av. Brasil 789', 'Zona sur, cerca del centro comercial', 1, '98765432', '1993-08-20', 
 30, 'S', 'F', '33445588', '33445589', 
 '70098765', 'ana.lopez@email.com', 'Empresa XYZ', 'Av. Principal 123', '0', 
 1, 4, 3, 3, 103, '1')
ON CONFLICT (vdonCodDon) DO NOTHING;

-- Verificar el donante creado
SELECT 'Donante creado con código automático:' as info;
SELECT 
    vdonCodDon as codigo,
    vdonPatern || ' ' || vdonMatern || ', ' || vdonNombre as nombre_completo,
    vdonEdadDo as edad,
    vdonEstCiv as estado_civil,
    vdonEmail as email
FROM vamDonante 
WHERE vdonCodDon = (SELECT MAX(vdonCodDon) FROM vamDonante);

-- Verificar todos los códigos después de la inserción
SELECT 'Todos los códigos después de la inserción:' as info;
SELECT vdonCodDon as codigo, 
       vdonPatern || ' ' || vdonMatern || ', ' || vdonNombre as nombre_completo
FROM vamDonante 
ORDER BY vdonCodDon;

-- Verificar el siguiente código disponible
SELECT 'Próximo código disponible:' as info;
SELECT COALESCE(MAX(vdonCodDon), 0) + 1 as siguiente_codigo FROM vamDonante; 