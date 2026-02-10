@echo off
REM Django Backend Setup Script for Windows
REM This script sets up the entire Django backend with email automation

echo.
echo =========================================
echo Django Backend Setup
echo =========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.9+ from https://www.python.org
    pause
    exit /b 1
)

echo [1/6] Creating virtual environment...
if not exist venv (
    python -m venv venv
    echo Virtual environment created!
) else (
    echo Virtual environment already exists!
)

echo.
echo [2/6] Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo [3/6] Installing dependencies...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed!

echo.
echo [4/6] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .
    echo ⚠️  IMPORTANT: Edit .env file with your Gmail credentials:
    echo    - EMAIL_HOST_USER=your-email@gmail.com
    echo    - EMAIL_HOST_PASSWORD=your-gmail-app-password
    echo.
    echo Get your Gmail App Password from:
    echo https://myaccount.google.com/apppasswords
    echo.
) else (
    echo .env file already exists!
)

echo.
echo [5/6] Running database migrations...
python manage.py makemigrations
python manage.py migrate
if errorlevel 1 (
    echo Error: Migrations failed
    pause
    exit /b 1
)
echo Database setup complete!

echo.
echo [6/6] Creating superuser (optional)...
echo.
echo Would you like to create a superuser for the admin panel?
set /p create_superuser="Enter 'y' for yes or 'n' for no: "

if /i "%create_superuser%"=="y" (
    python manage.py createsuperuser
) else (
    echo Skipping superuser creation
)

echo.
echo =========================================
echo Setup Complete! 🎉
echo =========================================
echo.
echo Next steps:
echo 1. Edit .env file with your Gmail credentials
echo 2. Run: python manage.py runserver
echo 3. Visit: http://localhost:8000/api/health/
echo 4. Test contact form from your React app
echo.
echo For admin panel:
echo http://localhost:8000/admin/
echo.
pause
