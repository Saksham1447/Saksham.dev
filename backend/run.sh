#!/bin/bash

# Start Django Development Server (macOS/Linux)

echo ""
echo "========================================="
echo "Starting Django Backend Server"
echo "========================================="
echo ""

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Error: Virtual environment not found!"
    echo "Please run setup.sh first"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Start server
echo ""
echo "Starting server on http://localhost:8000"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

python manage.py runserver
