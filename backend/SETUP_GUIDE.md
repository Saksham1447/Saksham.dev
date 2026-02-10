# Django Backend Setup Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### Step 2: Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Create Django Project

```bash
django-admin startproject config .
```

### Step 5: Create Contact App

```bash
python manage.py startapp contact
```

### Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and add your Gmail credentials:
   - `EMAIL_HOST_USER`: Your Gmail address
   - `EMAIL_HOST_PASSWORD`: Your Gmail App Password (see below)
   - `OWNER_EMAIL`: Email where you want to receive contact form submissions

### Step 7: Get Gmail App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Gmail account
3. Click "Select app" → Choose "Mail"
4. Click "Select device" → Choose "Other (Custom name)"
5. Enter "Portfolio Website" and click "Generate"
6. Copy the 16-character password
7. Paste it in `.env` as `EMAIL_HOST_PASSWORD`

### Step 8: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 9: Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### Step 10: Run Development Server

```bash
python manage.py runserver
```

Your backend will be running at: `http://localhost:8000`

## 📧 Email Configuration

The system uses Gmail's SMTP server (FREE):
- Host: smtp.gmail.com
- Port: 587
- TLS: Enabled

## 🔒 Security Features

✅ CORS protection
✅ Email validation
✅ Input sanitization
✅ Rate limiting ready
✅ Environment variables for secrets

## 🧪 Testing the API

### Test Contact Form Endpoint

```bash
curl -X POST http://localhost:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## 📁 Project Structure

```
backend/
├── config/              # Django project settings
│   ├── settings.py     # Main settings (will be created)
│   ├── urls.py         # URL routing (will be created)
│   └── wsgi.py         # WSGI config (will be created)
├── contact/            # Contact app
│   ├── models.py       # Database models
│   ├── serializers.py  # DRF serializers
│   ├── views.py        # API views
│   └── urls.py         # App URLs
├── venv/               # Virtual environment
├── .env                # Environment variables (create from .env.example)
├── .env.example        # Environment template
├── requirements.txt    # Python dependencies
└── manage.py           # Django management script (will be created)
```

## 🔧 Troubleshooting

### Email Not Sending?

1. **Check Gmail App Password**: Make sure you're using an App Password, not your regular Gmail password
2. **Enable 2-Factor Authentication**: Required for App Passwords
3. **Check .env file**: Ensure EMAIL_HOST_USER and EMAIL_HOST_PASSWORD are correct
4. **Check spam folder**: Auto-reply might go to spam initially

### CORS Errors?

1. Check `CORS_ALLOWED_ORIGINS` in `.env`
2. Make sure frontend URL is included
3. Restart Django server after changing `.env`

### Port Already in Use?

```bash
# Run on different port
python manage.py runserver 8001
```

## 🚀 Next Steps

After setup:
1. ✅ Test the contact form from your React frontend
2. ✅ Check that you receive emails
3. ✅ Verify auto-reply is sent to clients
4. ✅ Deploy to production (Render, Railway, or PythonAnywhere)

## 📞 Support

If you encounter issues:
1. Check Django logs in terminal
2. Verify .env configuration
3. Test email settings with Django shell
4. Check firewall/antivirus settings

---

**Ready to start?** Run the setup commands above! 🎉
