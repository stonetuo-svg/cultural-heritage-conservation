@echo off
chcp 65001 >nul
title MkDocs 开发服务器

cd /d "%~dp0"

echo.
echo ========================================
echo    正在启动 MkDocs 开发服务器...
echo ========================================
echo.
echo 预览地址：http://127.0.0.1:8000
echo 按 Ctrl+C 停止服务器
echo.

start http://127.0.0.1:8000

python start_server.py

pause
