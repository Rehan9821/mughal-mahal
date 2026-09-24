@echo off
title Mughal Mahal Restaurant - Luxury Web Experience
echo ===================================================
echo   Mughal Mahal Restaurant - Final React 19 App
echo ===================================================
echo.
echo Installing dependencies (if needed)...
call npm.cmd install --legacy-peer-deps
echo.
echo Starting development server...
echo URL: http://localhost:5173/
echo.
call npm.cmd run dev
pause
