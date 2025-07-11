-- =====================================================
-- INSERTS PARA CARGAR DATOS DE PRUEBA EN EL SISTEMA
-- =====================================================

-- 1. INSERTAR OCUPACIONES
INSERT INTO vamOcupaci (vocucodocu, vocudescri) VALUES
(1, 'Médico'),
(2, 'Enfermero/a'),
(3, 'Ingeniero'),
(4, 'Abogado'),
(5, 'Profesor'),
(6, 'Comerciante'),
(7, 'Estudiante'),
(8, 'Administrativo'),
(9, 'Técnico'),
(10, 'Ama de casa');

-- 2. INSERTAR GRADOS DE INSTRUCCIÓN
INSERT INTO vamGradIns (vgraCodGra, vgraDescrn) VALUES
(1, 'Primaria'),
(2, 'Secundaria'),
(3, 'Técnico'),
(4, 'Universitario'),
(5, 'Postgrado'),
(6, 'Maestría'),
(7, 'Doctorado');

-- 3. INSERTAR LUGARES DE NACIMIENTO
INSERT INTO vamLugNaci (vlugCodLug, vlugPaisna, vlugCiudad, vlugProvin) VALUES
(1, 'Bolivia', 'Santa Cruz', 'Santa Cruz'),
(2, 'Bolivia', 'La Paz', 'La Paz'),
(3, 'Bolivia', 'Cochabamba', 'Cochabamba'),
(4, 'Bolivia', 'Oruro', 'Oruro'),
(5, 'Bolivia', 'Potosí', 'Potosí'),
(6, 'Bolivia', 'Tarija', 'Tarija'),
(7, 'Bolivia', 'Chuquisaca', 'Chuquisaca'),
(8, 'Bolivia', 'Beni', 'Beni'),
(9, 'Bolivia', 'Pando', 'Pando');

-- 4. INSERTAR CLUBES DE DONANTES
INSERT INTO vamClubDon (vcluCodClu, vcluDescri, vcluDirecc, vcluTelefo, vcluRepRes) VALUES
(1, 'Club de Donantes Voluntarios', 'Av. Principal 123', '33445566', 'Dr. Juan Pérez'),
(2, 'Asociación de Donantes Regulares', 'Calle Comercial 456', '33445567', 'Lic. María López'),
(3, 'Grupo de Donantes Universitarios', 'Campus Universitario', '33445568', 'Prof. Carlos Ruiz'),
(4, 'Club de Donantes Empresariales', 'Zona Industrial', '33445569', 'Ing. Ana Silva'),
(5, 'Asociación de Donantes Comunitarios', 'Barrio Central', '33445570', 'Sr. Roberto Torres');

-- 5. INSERTAR TIPOS DE DOCUMENTO
INSERT INTO vamTipoDid (vtidCodTid, vtidDescr) VALUES
(1, 'Cédula de Identidad'),
(2, 'Pasaporte'),
(3, 'Carnet de Extranjería'),
(4, 'Carnet Militar'),
(5, 'Licencia de Conducir');

-- 6. INSERTAR ZONAS DE DIRECCIÓN
INSERT INTO vamZonaDir (vzonCodZon, vlugCodLug, vzonDescr) VALUES
(1, 1, 'Centro'),
(2, 1, 'Norte'),
(3, 1, 'Sur'),
(4, 1, 'Este'),
(5, 1, 'Oeste'),
(6, 2, 'Zona Sur'),
(7, 2, 'Zona Norte'),
(8, 3, 'Centro Histórico'),
(9, 3, 'Zona Universitaria'),
(10, 4, 'Zona Minera');

-- 7. INSERTAR DONANTES (10 registros)
INSERT INTO vamDonante (
    vdonCodDon, vdonPatern, vdonMatern, vdonNombre, vzonCodZon, 
    vdonDirecc, vdonDesDir, vtidCodTid, vdonDocide, vdonFecNac, 
    vdonEdadDo, vdonEstCiv, vdonSexoDn, vdonTelDom, vdonTelOff, 
    vdonTelCel, vdonEmail, vdonTrabaj, vdonDirTra, vdonCarneT, 
    vocuCodOcu, vgraCodGra, vlugCodLug, vcluCodClu, vresCodRes, vdonSwCita
) VALUES
-- Donante 1: María González López
(1001, 'González', 'López', 'María Elena', 1, 
 'Av. Libertador 123', 'Entre 2do y 3er anillo, cerca del parque', 1, '12345678', '1990-05-15', 
 33, 'S', 'F', '33445566', '33445567', 
 '70012345', 'maria.gonzalez@email.com', 'Hospital San Juan', 'Av. San Martín 456', 0, 
 2, 4, 1, 1, 101, 1),

-- Donante 2: Carlos Rodríguez Martínez
(1002, 'Rodríguez', 'Martínez', 'Carlos Alberto', 2, 
 'Calle Sucre 789', 'Zona norte, barrio residencial', 1, '23456789', '1985-08-22', 
 38, 'C', 'M', '33445568', '33445569', 
 '70023456', 'carlos.rodriguez@email.com', 'Universidad Mayor', 'Campus Universitario', 0, 
 5, 4, 1, 3, 102, 1),

-- Donante 3: Ana Silva Fernández
(1003, 'Silva', 'Fernández', 'Ana Patricia', 3, 
 'Av. Brasil 456', 'Zona sur, cerca del centro comercial', 1, '34567890', '1992-03-10', 
 31, 'S', 'F', '33445570', '33445571', 
 '70034567', 'ana.silva@email.com', 'Clínica Privada', 'Av. Monseñor Rivero 789', 0, 
 1, 4, 1, 2, 103, 0),

-- Donante 4: Luis Torres Vargas
(1004, 'Torres', 'Vargas', 'Luis Miguel', 4, 
 'Calle Ayacucho 321', 'Zona este, barrio popular', 1, '45678901', '1988-11-30', 
 35, 'C', 'M', '33445572', '33445573', 
 '70045678', 'luis.torres@email.com', 'Empresa Constructora', 'Zona Industrial', 0, 
 3, 3, 1, 4, 104, 1),

-- Donante 5: Carmen Ruiz Jiménez
(1005, 'Ruiz', 'Jiménez', 'Carmen Rosa', 5, 
 'Av. Cañoto 654', 'Zona oeste, cerca del río', 1, '56789012', '1995-07-18', 
 28, 'S', 'F', '33445574', '33445575', 
 '70056789', 'carmen.ruiz@email.com', 'Banco Regional', 'Centro Financiero', 0, 
 8, 4, 1, 1, 105, 1),

-- Donante 6: Roberto Pérez Mendoza
(1006, 'Pérez', 'Mendoza', 'Roberto José', 6, 
 'Calle Ballivián 987', 'Zona sur, barrio tranquilo', 1, '67890123', '1983-12-05', 
 40, 'D', 'M', '33445576', '33445577', 
 '70067890', 'roberto.perez@email.com', 'Consultorio Dental', 'Av. San Martín 123', 0, 
 1, 4, 2, 5, 106, 0),

-- Donante 7: Laura Morales Castro
(1007, 'Morales', 'Castro', 'Laura Beatriz', 7, 
 'Av. Busch 147', 'Zona norte, residencial', 1, '78901234', '1991-09-25', 
 32, 'S', 'F', '33445578', '33445579', 
 '70078901', 'laura.morales@email.com', 'Escuela Primaria', 'Calle Sucre 456', 0, 
 5, 4, 2, 3, 107, 1),

-- Donante 8: Diego Herrera Rojas
(1008, 'Herrera', 'Rojas', 'Diego Alejandro', 8, 
 'Calle Potosí 258', 'Centro histórico', 1, '89012345', '1987-04-12', 
 36, 'C', 'M', '33445580', '33445581', 
 '70089012', 'diego.herrera@email.com', 'Oficina de Abogados', 'Centro Comercial', 0, 
 4, 4, 3, 2, 108, 1),

-- Donante 9: Patricia Flores Salazar
(1009, 'Flores', 'Salazar', 'Patricia Isabel', 9, 
 'Av. Heroínas 369', 'Zona universitaria', 1, '90123456', '1993-01-20', 
 30, 'S', 'F', '33445582', '33445583', 
 '70090123', 'patricia.flores@email.com', 'Laboratorio Clínico', 'Campus Universitario', 0, 
 2, 4, 3, 1, 109, 0),

-- Donante 10: Fernando Castro Miranda
(1010, 'Castro', 'Miranda', 'Fernando Antonio', 10, 
 'Calle Oruro 741', 'Zona minera', 1, '01234567', '1986-06-08', 
 37, 'C', 'M', '33445584', '33445585', 
 '70001234', 'fernando.castro@email.com', 'Empresa Minera', 'Zona Industrial Norte', 0, 
 3, 3, 4, 4, 110, 1);

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

-- Mostrar algunos donantes como ejemplo
SELECT 
    vdonCodDon as codigo,
    vdonPatern || ' ' || vdonMatern || ', ' || vdonNombre as nombre_completo,
    vdonEdadDo as edad,
    vdonSexoDn as sexo,
    vdonEstCiv as estado_civil,
    vdonEmail as email
FROM vamDonante 
ORDER BY vdonCodDon 
LIMIT 5; 