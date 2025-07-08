const fs = require('fs');
const path = require('path');

// Función para corregir las rutas de controladores en un archivo
function fixControllerPaths(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Reemplazar las rutas incorrectas de controladores
        content = content.replace(
            /require\(['"]\.\.\/\.\.\/controllers\/([^'"]+)['"]\)/g,
            "require('../../business//$1')"
        );
        
        content = content.replace(
            /require\(['"]\.\.\/\.\.\/\.\.\/controllers\/([^'"]+)['"]\)/g,
            "require('../../../business//$1')"
        );
        
        content = content.replace(
            /require\(['"]\.\.\/\.\.\/\.\.\/\.\.\/controllers\/([^'"]+)['"]\)/g,
            "require('../../../../business//$1')"
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
            fixControllerPaths(fullPath);
        }
    }
}

// Procesar la carpeta presentation
const presentationPath = path.join(__dirname, 'src', 'presentation');
if (fs.existsSync(presentationPath)) {
    console.log('🔧 Corrigiendo rutas de controladores en rutas...');
    processDirectory(presentationPath);
}

console.log('✅ Proceso completado!'); 