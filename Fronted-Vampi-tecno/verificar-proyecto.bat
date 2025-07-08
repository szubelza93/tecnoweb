@echo off
echo ========================================
echo VERIFICACION DEL PROYECTO ANGULAR
echo ========================================
echo.

echo 1. Verificando versiones...
echo Node.js:
node --version
echo.
echo npm:
npm --version
echo.
echo Angular CLI:
ng version
echo.

echo 2. Verificando dependencias...
if not exist "node_modules" (
    echo node_modules no encontrado. Instalando dependencias...
    npm install
) else (
    echo node_modules encontrado.
)

echo.
echo 3. Verificando errores de TypeScript...
npx tsc --noEmit
echo.

echo 4. Limpiando cache...
ng cache clean
echo.

echo 5. Verificando configuración...
ng config
echo.

echo 6. Intentando construir el proyecto...
ng build --configuration development
echo.

echo ========================================
echo VERIFICACION COMPLETADA
echo ========================================
echo.
echo Si no hay errores, puedes ejecutar:
echo npm start
echo.
pause 