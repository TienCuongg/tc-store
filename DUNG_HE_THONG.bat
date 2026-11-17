@echo off
title TC SPORT - Dung He Thong
color 0C

echo =================================================================
echo         TC SPORT - DUNG TOAN BO TIEN TRINH WEB VA SERVER
echo =================================================================
echo.

echo [*] Dang giai phong Port 8080 (Frontend Vite)...
powershell -Command "Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo [*] Dang giai phong Port 8081 (Backend Spring Boot)...
powershell -Command "Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo.
echo =================================================================
echo  DA TAT SACH CA FRONTEND VA BACKEND AN TOAN!
echo =================================================================
ping -n 3 127.0.0.1 >nul
