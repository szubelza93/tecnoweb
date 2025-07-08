Write-Host "========================================" -ForegroundColor Green
Write-Host "VERIFICACION DEL PROYECTO ANGULAR" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "1. Verificando versiones..." -ForegroundColor Yellow
Write-Host "Node.js:"
node --version
Write-Host ""
Write-Host "npm:"
npm --version
Write-Host ""
Write-Host "Angular CLI:"
ng version
Write-Host ""

Write-Host "2. Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "node_modules encontrado." -ForegroundColor Green
} else {
    Write-Host "node_modules no encontrado. Instalando dependencias..." -ForegroundColor Red
    npm install
}

Write-Host ""
Write-Host "3. Verificando errores de TypeScript..." -ForegroundColor Yellow
npx tsc --noEmit
Write-Host ""

Write-Host "4. Limpiando cache..." -ForegroundColor Yellow
ng cache clean
Write-Host ""

Write-Host "5. Verificando configuración..." -ForegroundColor Yellow
ng config
Write-Host ""

Write-Host "6. Intentando construir el proyecto..." -ForegroundColor Yellow
ng build --configuration development
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "VERIFICACION COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Si no hay errores, puedes ejecutar:" -ForegroundColor Cyan
Write-Host "npm start" -ForegroundColor White
Write-Host ""

Read-Host "Presiona Enter para continuar" 