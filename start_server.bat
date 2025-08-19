@echo off
echo.
echo ====================================
echo   Video Downloader Pro - All Servers
echo ====================================
echo.

cd /d "E:\YT downloader\v1 - Copy - Copy - Copy"

echo Checking Python environment...
if not exist ".venv\Scripts\python.exe" (
    echo Error: Virtual environment not found!
    echo Please run: python -m venv .venv
    echo Then: .venv\Scripts\pip install -r requirements.txt
    pause
    exit /b 1
)

echo Starting all servers...
echo.
".venv\Scripts\python.exe" start_servers.py

echo.
echo All servers stopped.
pause
