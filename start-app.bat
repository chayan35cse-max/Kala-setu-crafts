@echo off
title KalaSetu - Indian Traditional Crafts Platform
echo ======================================================================
echo           Starting KalaSetu Cultural Archive & Marketplace
echo ======================================================================
echo.

echo [1/3] Starting Backend API Server (Port 5000)...
start "KalaSetu Backend" cmd /k "cd /d %~dp0server && node server.js"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Frontend Web Client (Port 5173)...
start "KalaSetu Frontend" cmd /k "cd /d %~dp0client && npm.cmd run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Opening application in your default web browser...
start http://localhost:5173

echo.
echo ======================================================================
echo    KalaSetu is running!
echo    - Frontend: http://localhost:5173
echo    - Backend:  http://localhost:5000
echo.
echo    Keep the opened terminal windows running while using the app.
echo ======================================================================
pause
