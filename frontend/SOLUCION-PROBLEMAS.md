# Solución de Problemas - Proyecto Angular Banco de Sangre

## 🚨 Problemas Comunes y Soluciones

### 1. **Error: "Cannot find module"**
**Síntomas:** Error al importar módulos o componentes

**Solución:**
```bash
# 1. Limpiar cache
npm cache clean --force

# 2. Eliminar node_modules
rm -rf node_modules package-lock.json

# 3. Reinstalar dependencias
npm install

# 4. Verificar que Angular CLI esté instalado globalmente
npm install -g @angular/cli
```

### 2. **Error: "Module not found"**
**Síntomas:** No encuentra archivos o rutas

**Solución:**
```bash
# 1. Verificar que todos los archivos existan
ls src/app/pages/vamGrupSan/

# 2. Verificar rutas en app.routes.ts
# 3. Verificar imports en componentes

# 4. Limpiar cache de Angular
ng cache clean
```

### 3. **Error: "Component not found"**
**Síntomas:** Error al cargar componentes

**Solución:**
```bash
# 1. Verificar que el componente esté exportado correctamente
# 2. Verificar que esté importado en las rutas
# 3. Verificar que sea standalone o esté en un módulo

# 4. Reconstruir el proyecto
ng build --configuration development
```

### 4. **Error: "Service not provided"**
**Síntomas:** Error con servicios HTTP

**Solución:**
```bash
# 1. Verificar que HttpClient esté en app.config.ts
# 2. Verificar que el servicio tenga providedIn: 'root'
# 3. Verificar imports en componentes
```

### 5. **Error: "Port already in use"**
**Síntomas:** Puerto 4200 ocupado

**Solución:**
```bash
# Usar puerto diferente
ng serve --port 4201

# O matar proceso en puerto 4200
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

## 🔧 Pasos para Ejecutar el Proyecto

### Paso 1: Verificar Dependencias
```bash
cd Fronted-Vampi-tecno

# Verificar Node.js (debe ser 18+)
node --version

# Verificar npm
npm --version

# Verificar Angular CLI
ng version
```

### Paso 2: Instalar Dependencias
```bash
# Instalar dependencias
npm install

# Si hay errores, limpiar e instalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Paso 3: Verificar Configuración
```bash
# Verificar configuración de Angular
ng config

# Verificar errores de TypeScript
npx tsc --noEmit

# Limpiar cache
ng cache clean
```

### Paso 4: Construir Proyecto
```bash
# Construir en modo desarrollo
ng build --configuration development

# Si hay errores, verificar logs
ng build --verbose
```

### Paso 5: Ejecutar Proyecto
```bash
# Ejecutar servidor de desarrollo
npm start

# O directamente
ng serve

# Con opciones específicas
ng serve --host 0.0.0.0 --port 4200 --open
```

## 🐛 Debugging

### Verificar Errores en Consola
```bash
# Ver errores de compilación
ng build --verbose

# Ver errores de TypeScript
npx tsc --noEmit --listFiles

# Ver configuración completa
ng config --json
```

### Verificar Logs del Navegador
1. Abrir DevTools (F12)
2. Ir a la pestaña Console
3. Buscar errores en rojo
4. Verificar Network para errores HTTP

### Verificar Logs del Servidor
```bash
# Ver logs en tiempo real
ng serve --verbose

# Ver logs de build
ng build --verbose
```

## 📁 Estructura de Archivos Verificada

```
Fronted-Vampi-tecno/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── vamGrupSan/
│   │   │       ├── vamGrupSan.component.ts ✅
│   │   │       ├── vamGrupSan.component.html ✅
│   │   │       ├── vamGrupSan.component.css ✅
│   │   │       ├── vamGrupSan-form.component.ts ✅
│   │   │       ├── vamGrupSan-form.component.html ✅
│   │   │       └── vamGrupSan-form.component.css ✅
│   │   ├── services/
│   │   │   └── vamGrupSan.service.ts ✅
│   │   ├── models/
│   │   │   └── vamGrupSan.interface.ts ✅
│   │   ├── config/
│   │   │   └── api.config.ts ✅
│   │   └── app.routes.ts ✅
│   ├── main.ts ✅
│   └── app.config.ts ✅
├── package.json ✅
├── angular.json ✅
└── tsconfig.json ✅
```

## 🚀 Comandos de Ejecución Rápida

### Para Desarrollo
```bash
# Ejecutar proyecto
npm start

# Ejecutar con recarga automática
ng serve --watch

# Ejecutar en modo debug
ng serve --verbose
```

### Para Producción
```bash
# Construir para producción
npm run build

# Servir archivos de producción
ng serve --configuration production
```

### Para Testing
```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
ng test --watch
```

## 📞 Soporte Adicional

Si los problemas persisten:

1. **Verificar logs completos:**
   ```bash
   ng serve --verbose > logs.txt 2>&1
   ```

2. **Verificar versión de Angular:**
   ```bash
   ng version
   ```

3. **Verificar configuración del sistema:**
   ```bash
   node --version
   npm --version
   ```

4. **Reinstalar Angular CLI globalmente:**
   ```bash
   npm uninstall -g @angular/cli
   npm install -g @angular/cli@latest
   ```

## 🎯 Solución Rápida

Si todo falla, ejecuta este comando:
```bash
cd Fronted-Vampi-tecno && npm cache clean --force && rm -rf node_modules package-lock.json && npm install && ng cache clean && ng build --configuration development && npm start
``` 