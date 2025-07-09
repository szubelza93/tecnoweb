# Diagnóstico de Problemas - Proyecto Angular

## Problemas Comunes y Soluciones

### 1. Dependencias no instaladas
```bash
# Navegar al directorio del proyecto
cd Fronted-Vampi-tecno

# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar dependencias
npm install
```

### 2. Versiones incompatibles
```bash
# Verificar versión de Node.js (debe ser 18+)
node --version

# Verificar versión de npm
npm --version

# Verificar versión de Angular CLI
ng version
```

### 3. Problemas de configuración
```bash
# Limpiar cache de Angular
ng cache clean

# Verificar configuración
ng config

# Reconstruir el proyecto
ng build --configuration development
```

### 4. Problemas de TypeScript
```bash
# Verificar errores de TypeScript
npx tsc --noEmit

# Verificar configuración de TypeScript
npx tsc --showConfig
```

### 5. Problemas de rutas
- Verificar que todas las rutas en `app.routes.ts` estén correctamente configuradas
- Verificar que los componentes estén importados correctamente

### 6. Problemas de módulos
- Verificar que todos los componentes standalone tengan sus imports
- Verificar que los servicios estén en `providedIn: 'root'`

## Comandos para ejecutar el proyecto

### Desarrollo
```bash
# Ejecutar en modo desarrollo
npm start

# O directamente con Angular CLI
ng serve

# Ejecutar en puerto específico
ng serve --port 4200

# Ejecutar con host específico
ng serve --host 0.0.0.0 --port 4200
```

### Producción
```bash
# Construir para producción
npm run build

# Servir archivos de producción
ng serve --configuration production
```

## Verificación de errores

### 1. Errores de compilación
```bash
# Ver errores detallados
ng build --verbose

# Ver warnings
ng build --configuration development
```

### 2. Errores de linting
```bash
# Verificar con ESLint (si está configurado)
npx eslint src/**/*.ts

# Verificar con TSLint (si está configurado)
npx tslint src/**/*.ts
```

### 3. Errores de dependencias
```bash
# Verificar dependencias obsoletas
npm outdated

# Verificar vulnerabilidades
npm audit

# Arreglar vulnerabilidades automáticamente
npm audit fix
```

## Solución de problemas específicos

### Error: "Cannot find module"
- Verificar que el módulo esté instalado
- Verificar la ruta de importación
- Limpiar cache y reinstalar

### Error: "Module not found"
- Verificar que el archivo existe
- Verificar la extensión del archivo
- Verificar la configuración de paths en tsconfig.json

### Error: "Component not found"
- Verificar que el componente esté declarado
- Verificar que esté importado en el módulo
- Verificar que el selector sea correcto

### Error: "Service not provided"
- Verificar que el servicio esté en `providedIn: 'root'`
- Verificar que esté importado en el componente
- Verificar que no haya conflictos de nombres

## Configuración recomendada

### package.json scripts
```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }
}
```

### angular.json configuración
```json
{
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "configurations": {
      "development": {
        "buildTarget": "ng-menu-dashboard:build:development"
      }
    },
    "defaultConfiguration": "development"
  }
}
```

## Contacto para soporte
Si los problemas persisten, revisar:
1. Logs del navegador (F12)
2. Logs de la consola de Angular
3. Logs del servidor de desarrollo 