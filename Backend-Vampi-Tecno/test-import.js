console.log('🧪 Probando importaciones...');

try {
    console.log('📁 Probando importación de configuración de base de datos...');
    const dbConfig = require('./src/shared/config/database');
    console.log('✅ Configuración de base de datos importada correctamente');
    
    console.log('📁 Probando importación del modelo Donante...');
    const Donante = require('./src/data/models/gestionDonante/Donante');
    console.log('✅ Modelo Donante importado correctamente');
    
    console.log('📁 Probando importación del controlador Donante...');
    const DonanteController = require('./src/business/controllers/gestionDonante/DonanteController');
    console.log('✅ Controlador Donante importado correctamente');
    
    console.log('📁 Probando importación de rutas de donante...');
    const donanteRoutes = require('./src/presentation/routes/gestionDonante/donante.routes');
    console.log('✅ Rutas de donante importadas correctamente');
    
    console.log('🎉 ¡Todas las importaciones funcionan correctamente!');
    
} catch (error) {
    console.error('❌ Error en importación:', error.message);
    console.error('Stack:', error.stack);
} 