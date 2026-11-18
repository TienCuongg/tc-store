@echo off
title TC SPORT - Khoi Dong Toan Bo He Thong
color 0E
echo ========================================================
echo       KHOI DONG TOAN BO HE THONG TC SPORT (AI READY)
echo ========================================================
echo.
echo 1. Dang mo Backend Spring Boot (Port 8081)...
start "TC SPORT - Backend 8081" cmd /k "cd /d %~dp0..\backend && mvnw.bat spring-boot:run"

echo 2. Cho Backend san sang trong 5 giay...
timeout /t 5 >nul

echo 3. Dang mo Frontend Vite (Port 8080)...
start "TC SPORT - Frontend 8080" cmd /k "cd /d %~dp0.. && npm run dev"

echo.
echo ========================================================
echo  HOAN TAT! Hay mo trinh duyet va truy cap:
echo  - Trang khach hang: http://localhost:8080/
echo  - Trang quan tri:   http://localhost:8080/admin
echo  - Backend API:      http://localhost:8081/
echo ========================================================
pause
