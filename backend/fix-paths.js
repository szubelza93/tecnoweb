const fs = require('fs');
const path = require('path');

// Función para corregir las rutas en un archivo
function fixDatabasePath(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Reemplazar las rutas incorrectas
        content = content.replace(
            /require\(['"]\.\.\/\.\.\/config\/database['"]\)/g,
            "require('../../shared/config/database')"
        );
        
        content = content.replace(
            /require\(['"]\.\.\/config\/database['"]\)/g,
            "require('../../shared/config/database')"
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Corregido: ${filePath}`);
    } catch (error) {
        console.error(`❌ Error en ${filePath}:`, error.message);
    }
}

// Función para procesar directorios recursivamente
function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (item.endsWith('.js')) {
            fixDatabasePath(fullPath);
        }
    }
}

// Procesar la carpeta data
const dataPath = path.join(__dirname, 'src', 'data');
if (fs.existsSync(dataPath)) {
    console.log('🔧 Corrigiendo rutas en modelos...');
    processDirectory(dataPath);
}

// Corregir archivos específicos en shared
const sharedFiles = [
    'src/shared/middlewares/extraccionMiddleware.js',
    'src/shared/database/init.js'
];

console.log('🔧 Corrigiendo rutas en archivos shared...');
for (const file of sharedFiles) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        fixDatabasePath(fullPath);
    }
}

console.log('✅ Proceso completado!'); 