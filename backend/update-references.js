const fs = require('fs');
const path = require('path');

// Función para actualizar referencias en archivos
function updateReferences(filePath, oldReferences, newReferences) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        oldReferences.forEach((oldRef, index) => {
            const newRef = newReferences[index];
            if (content.includes(oldRef)) {
                content = content.replace(new RegExp(oldRef, 'g'), newRef);
                updated = true;
                console.log(`✅ Updated ${oldRef} -> ${newRef} in ${filePath}`);
            }
        });
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
        }
    } catch (error) {
        console.log(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Función para procesar directorios recursivamente
function processDirectory(dirPath, oldReferences, newReferences) {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath, oldReferences, newReferences);
        } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.json'))) {
            updateReferences(fullPath, oldReferences, newReferences);
        }
    });
}

// Referencias a actualizar
const oldReferences = [
    "require('../../data/",
    "require('../../business/",
    "require('../../shared/middlewares/",
    "require('../../shared/config/",
    "require('../../database/",
    "require('../../../models/",
    "require('../../../controllers/",
    "require('../../../middlewares/",
    "require('../../../shared/config/",
    "require('../../../database/",
    "require('../../../../models/",
    "require('../../../../controllers/",
    "require('../../../../middlewares/",
    "require('../../../../shared/config/",
    "require('../../../../database/"
];

const newReferences = [
    "require('../../data/",
    "require('../../business//",
    "require('../../shared/middlewares/",
    "require('../../shared/config/",
    "require('../../shared/database/",
    "require('../../../../data/",
    "require('../../../business//",
    "require('../../../../shared/middlewares/",
    "require('../../../../shared/config/",
    "require('../../../../shared/database/",
    "require('../../../../../data/",
    "require('../../../../business//",
    "require('../../../../../shared/middlewares/",
    "require('../../../../../shared/config/",
    "require('../../../../../shared/database/"
];

console.log('🔄 Starting reference updates...');
console.log('📁 Processing directory: src/');

// Procesar el directorio src
processDirectory('./src', oldReferences, newReferences);

console.log('✅ Reference updates completed!');
console.log('\n📋 Summary of changes:');
console.log('- Models moved to: data/models/');
console.log('- Controllers moved to: business/controllers/');
console.log('- Middlewares moved to: shared/middlewares/');
console.log('- Config moved to: shared/config/');
console.log('- Database moved to: shared/database/');
console.log('- Routes moved to: presentation/routes/'); 