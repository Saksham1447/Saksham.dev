# 📧 Django Backend with Email Automation - Complete Guide

## 🎉 What's Been Created

A complete Django REST API backend with FREE email automation for your portfolio contact form!

### ✅ Features Implemented

1. **Contact Form API** (`/api/contact/`)
   - Accepts: name, email, subject, message
   - Validates all inputs
   - Prevents spam
   - Stores messages in database

2. **Dual Email System**
   - ✉️ **Email to You**: Get notified when someone contacts you
   - ✉️ **Auto-Reply to Client**: Professional confirmation email

3. **Security Features**
   - Email validation
   - Input sanitization
   - Spam detection
   - CORS protection
   - Environment variables for secrets

4. **Error Handling**
   - Graceful error messages
   - Proper HTTP status codes
   - Detailed logging

## 📁 Backend Structure

```
backend/
├── config/                      # Django project settings
│   ├── __init__.py             ✅ Created
│   ├── settings.py             ✅ Created (Email configured)
│   ├── urls.py                 ✅ Created
│   └── wsgi.py                 ✅ Created
├── contact/                     # Contact app
│   ├── __init__.py             ✅ Created
│   ├── admin.py                ✅ Created (Admin panel)
│   ├── apps.py                 ✅ Created
│   ├── models.py               ✅ Created (Database model)
│   ├── serializers.py          ✅ Created (Validation)
│   ├── urls.py                 ✅ Created (API routes)
│   └── views.py                ✅ Created (Email logic)
├── .env.example                ✅ Created (Template)
├── .gitignore                  ✅ Created
├── manage.py                   ✅ Created
├── requirements.txt            ✅ Created
└── SETUP_GUIDE.md              ✅ Created
```

## 🚀 Quick Start (10 Minutes)

### Step 1: Navigate to Backend

```bash
cd backend
```

### Step 2: Create Virtual Environment

```bash
python -m venv venv
```

### Step 3: Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Create .env File

```bash
copy .env.example .env
```

### Step 6: Configure Gmail App Password

1. **Go to Google Account Settings**:
   - Visit: https://myaccount.google.com/apppasswords
   - Sign in with your Gmail

2. **Enable 2-Factor Authentication** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

3. **Generate App Password**:
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter: "Portfolio Website"
   - Click "Generate"
   - **Copy the 16-character password**

4. **Update .env file**:
   ```env
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=xxxx xxxx xxxx xxxx  # Paste the app password here
   OWNER_EMAIL=sakshamwayadande01@gmail.com
   ```

### Step 7: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 8: Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### Step 9: Start Django Server

```bash
python manage.py runserver
```

**Backend is now running at**: `http://localhost:8000`

## 📧 Email Configuration Details

### Gmail SMTP Settings (Already Configured)

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@gmail.com'  # From .env
EMAIL_HOST_PASSWORD = 'your-app-password'  # From .env
```

### Email Flow

1. **Client submits form** → Frontend sends to `/api/contact/`
2. **Backend validates** → Checks all fields
3. **Saves to database** → Stores message
4. **Sends email to you** → Notification with client details
5. **Sends auto-reply** → Confirmation to client
6. **Returns success** → Frontend shows message

## 🧪 Testing the Backend

### Test 1: Health Check

```bash
curl http://localhost:8000/api/health/
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Portfolio API is running",
  "email_configured": true
}
```

### Test 2: Contact Form Submission

```bash
curl -X POST http://localhost:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message from the API"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message sent successfully. I'll contact you within 24 hours.",
  "data": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "created_at": "2026-02-10T19:55:00Z"
  }
}
```

### Test 3: Check Your Email

After testing, you should receive:
1. **In your inbox** (OWNER_EMAIL): Notification about the contact
2. **In test@example.com**: Auto-reply confirmation

## 🎨 Frontend Integration

### Already Updated!

Your React Contact component (`frontend/src/components/Contact.jsx`) has been updated to:

✅ Call Django API at `http://localhost:8000/api/contact/`
✅ Show success message: "Message sent successfully. I'll contact you within 24 hours."
✅ Show error message if something fails
✅ Reset form after successful submission
✅ Display loading state while submitting

### API Endpoint

```javascript
const response = await fetch('http://localhost:8000/api/contact/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

## 🔒 Security Features

### Input Validation

✅ **Name**: 2+ characters, letters only
✅ **Email**: Valid email format
✅ **Subject**: 3-200 characters
✅ **Message**: 10+ characters

### Spam Protection

✅ Basic keyword filtering
✅ Email format validation
✅ Input sanitization
✅ Ready for rate limiting

### Environment Variables

✅ Secret key in .env
✅ Email credentials in .env
✅ Never committed to Git

## 📊 Admin Panel

Access the admin panel to view all contact messages:

1. **Create superuser** (if not done):
   ```bash
   python manage.py createsuperuser
   ```

2. **Visit**: `http://localhost:8000/admin/`

3. **Login** with your credentials

4. **View Contact Messages**:
   - See all submissions
   - Mark as read/replied
   - Search and filter
   - View full details

## 🐛 Troubleshooting

### Email Not Sending?

**Problem**: Emails not being sent

**Solutions**:
1. ✅ Check Gmail App Password is correct in `.env`
2. ✅ Ensure 2-Factor Authentication is enabled on Gmail
3. ✅ Check spam folder
4. ✅ Verify EMAIL_HOST_USER in `.env` matches your Gmail
5. ✅ Restart Django server after changing `.env`

### CORS Errors?

**Problem**: Frontend can't connect to backend

**Solutions**:
1. ✅ Check Django server is running on port 8000
2. ✅ Verify CORS_ALLOWED_ORIGINS in `.env` includes `http://localhost:3000`
3. ✅ Restart Django server

### Port Already in Use?

**Problem**: Port 8000 is already in use

**Solution**:
```bash
python manage.py runserver 8001
```

Then update frontend API URL to `http://localhost:8001/api/contact/`

### Database Errors?

**Problem**: Database migrations fail

**Solutions**:
1. Delete `db.sqlite3` file
2. Delete `contact/migrations/` folder (except `__init__.py`)
3. Run migrations again:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

## 📧 Email Templates

### Email to You (Owner)

```
New contact form submission from your portfolio website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: [Client Name]
📧 Email: [Client Email]
📋 Subject: [Subject]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Client Message]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 Reply to: [Client Email]
📅 Received: [Date and Time]
```

### Auto-Reply to Client

```
Hi [Client Name],

Thank you for reaching out. I've received your message regarding your project.

I will review your details and get back to you within 24 hours.

Best regards,
Saksham Wayadande
Full Stack Web Developer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Your Message Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subject: [Subject]
Message: [First 100 chars...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Portfolio: https://sakshamwayadande.in
📧 Email: sakshamwayadande01@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/saksham-wayadande-21a192316/
🐙 GitHub: https://github.com/Saksham1447
```

## 🚀 Deployment (Production)

### Option 1: Render (Recommended - FREE)

1. Push code to GitHub
2. Create account on Render.com
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

### Option 2: Railway

1. Push code to GitHub
2. Create account on Railway.app
3. Create new project
4. Connect GitHub repo
5. Set environment variables
6. Deploy!

### Option 3: PythonAnywhere (FREE)

1. Create account on PythonAnywhere.com
2. Upload code
3. Configure WSGI
4. Set environment variables
5. Deploy!

## 📝 Environment Variables for Production

```env
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
OWNER_EMAIL=sakshamwayadande01@gmail.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## ✅ Testing Checklist

Before deploying:

- [ ] Django server runs without errors
- [ ] Can submit form from frontend
- [ ] Receive email notification
- [ ] Client receives auto-reply
- [ ] Messages saved in database
- [ ] Admin panel accessible
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] .env not in Git

## 🎯 Next Steps

1. **Test Locally**:
   - Start Django: `python manage.py runserver`
   - Start React: `npm run dev`
   - Submit test form
   - Check emails

2. **Customize Emails**:
   - Edit `contact/views.py`
   - Modify email templates
   - Add HTML email templates (optional)

3. **Deploy**:
   - Choose hosting platform
   - Set environment variables
   - Deploy backend
   - Update frontend API URL

## 📞 Support

If you encounter issues:

1. Check Django logs in terminal
2. Verify .env configuration
3. Test email with Django shell:
   ```python
   python manage.py shell
   from django.core.mail import send_mail
   send_mail('Test', 'Test message', 'from@example.com', ['to@example.com'])
   ```
4. Check firewall/antivirus settings

---

## 🎉 You're All Set!

Your portfolio now has a fully functional backend with:
✅ Contact form API
✅ Email notifications
✅ Auto-reply system
✅ Database storage
✅ Admin panel
✅ Security features

**Start both servers and test it out!** 🚀

---

**Made with ❤️ for Saksham's Portfolio**
