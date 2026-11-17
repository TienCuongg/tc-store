@echo off
title TC SPORT - Spring Boot Backend (Port 8081)
color 0A
echo ========================================================
echo       DANG KHOI DONG TC SPORT BACKEND (PORT 8081)
echo ========================================================
cd /d "%~dp0backend"
call mvnw.bat spring-boot:run
pause
