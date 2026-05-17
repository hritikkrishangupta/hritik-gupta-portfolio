@echo off
cd /d "%~dp0"
echo Starting portfolio website at http://127.0.0.1:5500
echo Keep this window open while you edit and view the website.
echo Press Ctrl+C to stop the server.
start "" /b cmd /c "timeout /t 1 >nul && start http://127.0.0.1:5500"
py -m http.server 5500 --bind 127.0.0.1
