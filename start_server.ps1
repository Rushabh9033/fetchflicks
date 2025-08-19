# PowerShell script to start all Video Downloader Pro servers
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "   Video Downloader Pro - All Servers" -ForegroundColor Cyan  
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "E:\YT downloader\v1 - Copy - Copy - Copy"

Write-Host "Checking Python environment..." -ForegroundColor Yellow
if (-not (Test-Path ".venv\Scripts\python.exe")) {
    Write-Host "Error: Virtual environment not found!" -ForegroundColor Red
    Write-Host "Please run: python -m venv .venv" -ForegroundColor Yellow
    Write-Host "Then: .venv\Scripts\pip install -r requirements.txt" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting all servers..." -ForegroundColor Green
Write-Host ""

try {
    & ".venv\Scripts\python.exe" start_servers.py
}
catch {
    Write-Host "Error starting servers: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "All servers stopped." -ForegroundColor Yellow
Read-Host "Press Enter to exit"
