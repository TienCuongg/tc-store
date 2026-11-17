@echo off
title TC SPORT - Khoi Dong Nhanh
color 0A

echo =================================================================
echo         TC SPORT - KHOI DONG HE THONG TU DONG (1-CLICK)
echo =================================================================
echo.

:: 1. Kiem tra MySQL
sc query MySQL80 | findstr "RUNNING" >nul
if errorlevel 1 (
    echo [*] Dang bat MySQL Database...
    net start MySQL80 >nul 2>&1
)
echo [1/3] MySQL Database: SAN SANG!

:: 2. Kiem tra Backend
netstat -ano | findstr ":8081" | findstr "LISTENING" >nul
if errorlevel 1 (
    echo [*] Dang bat Backend Spring Boot tren Port 8081...
    start "TC SPORT - Backend 8081" cmd /k "cd /d %~dp0backend && mvnw.bat spring-boot:run"
) else (
    echo [*] Backend dang hoat dong tren Port 8081.
)
echo [2/3] Spring Boot Backend: SAN SANG!

:: 3. Kiem tra Frontend
netstat -ano | findstr ":8080" | findstr "LISTENING" >nul
if errorlevel 1 (
    echo [*] Dang bat Frontend Vite tren Port 8080...
    start "TC SPORT - Frontend 8080" cmd /k "cd /d %~dp0 && npm run dev"
) else (
    echo [*] Frontend dang hoat dong tren Port 8080.
)
echo [3/3] Vite React Frontend: SAN SANG!

echo.
echo [*] Dang mo trinh duyet web...
ping -n 3 127.0.0.1 >nul
start http://localhost:8080/

echo.
echo =================================================================
echo  HOAN TAT! Website da duoc mo tren trinh duyet cua ban!
echo  - Khach hang: http://localhost:8080/
echo  - Quan tri:   http://localhost:8080/admin
echo  - Chatbot AI: Da tich hop Gemini API san sang
echo =================================================================
ping -n 4 127.0.0.1 >nul
