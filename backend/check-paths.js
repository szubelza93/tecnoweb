const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando rutas de importación...');

// Función para verificar un archivo
function checkFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes('require') && line.includes('config/database')) {
                console.log(`📁 ${filePath}:${i + 1} - ${line.trim()}`);
            }
        }
    } catch (error) {
        console.error(`❌ Error leyendo ${filePath}:`, error.message);
    }
}

// Función para procesar directorios recursivamente
function processDirectory(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (item.endsWith('.js')) {
                checkFile(fullPath);
            }
        }
    } catch (error) {
        console.error(`❌ Error procesando directorio ${dirPath}:`, error.message);
    }
}

// Verificar archivos específicos
const filesToCheck = [
    'src/data/models/gestionDonante/Donante.js',
    'src/data/models/gestionScreening/GrupSan.js',
    'src/shared/middlewares/extraccionMiddleware.js',
    'src/shared/database/init.js'
];

console.log('\n📋 Verificando archivos específicos:');
for (const file of filesToCheck) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        checkFile(fullPath);
    } else {
        console.log(`⚠️  Archivo no encontrado: ${file}`);
    }
}

console.log('\n✅ Verificación completada!'); 