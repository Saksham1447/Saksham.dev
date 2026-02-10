#!/bin/bash

# Django Backend Setup Script for macOS/Linux
# This script sets up the entire Django backend with email automation

echo ""
echo "========================================="
echo "Django Backend Setup"
echo "========================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    echo "Please install Python 3.9+ from https://www.python.org"
    exit 1
fi

echo "[1/6] Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created!"
else
    echo "Virtual environment already exists!"
fi

echo ""
echo "[2/6] Activating virtual environment..."
source venv/bin/activate

echo ""
echo "[3/6] Installing dependencies..."
pip install -q -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi
echo "Dependencies installed!"

echo ""
echo "[4/6] Creating .env file..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your Gmail credentials:"
    echo "   - EMAIL_HOST_USER=your-email@gmail.com"
    echo "   - EMAIL_HOST_PASSWORD=your-gmail-app-password"
    echo ""
    echo "Get your Gmail App Password from:"
    echo "https://myaccount.google.com/apppasswords"
    echo ""
else
    echo ".env file already exists!"
fi

echo ""
echo "[5/6] Running database migrations..."
python manage.py makemigrations
python manage.py migrate
if [ $? -ne 0 ]; then
    echo "Error: Migrations failed"
    exit 1
fi
echo "Database setup complete!"

echo ""
echo "[6/6] Creating superuser (optional)"
echo ""
read -p "Would you like to create a superuser for the admin panel? (y/n): " create_superuser

if [[ "$create_superuser" == "y" ]]; then
    python manage.py createsuperuser
else
    echo "Skipping superuser creation"
fi

echo ""
echo "========================================="
echo "Setup Complete! 🎉"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Edit .env file with your Gmail credentials"
echo "2. Run: python manage.py runserver"
echo "3. Visit: http://localhost:8000/api/health/"
echo "4. Test contact form from your React app"
echo ""
echo "For admin panel:"
echo "http://localhost:8000/admin/"
echo ""
