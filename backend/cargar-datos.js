const pool = require('./src/shared/config/database');
const fs = require('fs');
const path = require('path');

const cargarDatos = async () => {
    const client = await pool.connect();
    try {
        console.log('🔄 Iniciando carga de datos de prueba...');
        await client.query('BEGIN');

        // Leer el archivo SQL
        const sqlPath = path.join(__dirname, 'inserts-donantes.sql');
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Dividir el contenido en comandos individuales
        const commands = sqlContent
            .split(';')
            .map(cmd => cmd.trim())
            .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

        console.log(`📝 Ejecutando ${commands.length} comandos SQL...`);

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            if (command.trim()) {
                try {
                    await client.query(command);
                    console.log(`✅ Comando ${i + 1} ejecutado correctamente`);
                } catch (error) {
                    if (error.code === '23505') { // Error de clave duplicada
                        console.log(`⚠️  Comando ${i + 1}: Datos ya existen (ignorando)`);
                    } else {
                        console.error(`❌ Error en comando ${i + 1}:`, error.message);
                        throw error;
                    }
                }
            }
        }

        await client.query('COMMIT');
        console.log('✅ Datos cargados correctamente');

        // Verificar los datos insertados
        console.log('\n📊 Verificando datos insertados...');
        
        const result = await client.query(`
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
            SELECT 'vamDonante', COUNT(*) FROM vamDonante
        `);

        console.log('\n📈 Resumen de datos:');
        result.rows.forEach(row => {
            console.log(`   ${row.tabla}: ${row.cantidad} registros`);
        });

        // Mostrar algunos donantes como ejemplo
        const donantes = await client.query(`
            SELECT 
                vdonCodDon as codigo,
                vdonPatern || ' ' || vdonMatern || ', ' || vdonNombre as nombre_completo,
                vdonEdadDo as edad,
                vdonSexoDn as sexo,
                vdonEstCiv as estado_civil
            FROM vamDonante 
            ORDER BY vdonCodDon 
            LIMIT 5
        `);

        console.log('\n👥 Primeros 5 donantes:');
        donantes.rows.forEach(donante => {
            console.log(`   ${donante.codigo}: ${donante.nombre_completo} (${donante.edad} años, ${donante.sexo})`);
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error durante la carga de datos:', error);
        throw error;
    } finally {
        client.release();
    }
};

// Ejecutar si se llama directamente
if (require.main === module) {
    cargarDatos()
        .then(() => {
            console.log('\n🎉 Proceso completado exitosamente');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Error en el proceso:', error);
            process.exit(1);
        });
}

module.exports = { cargarDatos }; 