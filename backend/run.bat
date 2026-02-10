@echo off
REM Start Django Development Server

echo.
echo =========================================
echo Starting Django Backend Server
echo =========================================
echo.

REM Check if venv exists
if not exist venv (
    echo Error: Virtual environment not found!
    echo Please run setup.bat first
    pause
    exit /b 1
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Start server
echo.
echo Starting server on http://localhost:8000
echo.
echo Press CTRL+C to stop the server
echo.

python manage.py runserver

pause
