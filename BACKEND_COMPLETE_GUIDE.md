# 🚀 Complete Setup Guide - Django Backend with Email Automation

## 📋 Prerequisites

- Python 3.9 or higher
- Gmail account with 2-Factor Authentication enabled
- VS Code or any code editor
- Terminal/Command Prompt access

## 📧 Step 1: Generate Gmail App Password (5 minutes)

**Why?** Gmail doesn't allow normal passwords for third-party apps. You need an "App Password" for security.

### Instructions:

1. Go to: https://myaccount.google.com/security
2. Look for **"2-Step Verification"** and enable it if not already enabled
3. Once 2FA is on, refresh and look for **"App passwords"** (it appears after 2FA)
4. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
5. Click **Generate**
6. **Copy the 16-character password** (it will look like: `xxxx xxxx xxxx xxxx`)
7. Save it somewhere safe - you'll use it in Step 3

## 💻 Step 2: Automated Setup (Windows, macOS, or Linux)

### Windows Users:
```bash
cd backend
setup.bat
```

### macOS/Linux Users:
```bash
cd backend
chmod +x setup.sh
./setup.sh
```

**What does the setup script do?**
- ✅ Creates Python virtual environment
- ✅ Installs Django and all dependencies
- ✅ Sets up environment variables template
- ✅ Initializes database
- ✅ (Optional) Creates admin superuser

## 🔧 Step 3: Configure Email Credentials

After setup completes, edit the `.env` file:

**Windows:** Open in VS Code
```
backend/.env
```

**Add your Gmail details:**
```env
SECRET_KEY=django-insecure-change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Email Configuration
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=xxxx xxxx xxxx xxxx
OWNER_EMAIL=sakshamwayadande01@gmail.com

# CORS (Allow frontend)
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174

# Database
DATABASE_URL=sqlite:///db.sqlite3
```

**⚠️ Important:**
- Replace `your-email@gmail.com` with your actual Gmail
- Replace `xxxx xxxx xxxx xxxx` with the App Password from Step 1
- **Never commit .env to Git** (it's in .gitignore)

## ▶️ Step 4: Start the Django Server

### Windows:
```bash
cd backend
run.bat
```

### macOS/Linux:
```bash
cd backend
chmod +x run.sh
./run.sh
```

**Expected output:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

## ✅ Step 5: Test the Backend

### Test 1: Health Check
Open your browser and visit:
```
http://localhost:8000/api/health/
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "Portfolio API is running",
  "email_configured": true
}
```

### Test 2: Test Contact Form via Frontend

1. Start your React frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Navigate to the **Contact** section
3. Fill in the form:
   - **Name:** Test User
   - **Email:** your-email@gmail.com
   - **Subject:** Test Contact Form
   - **Message:** This is a test message from the contact form.

4. Click **Send Message**

5. **Check your email** for:
   - ✉️ Notification email (to your Gmail)
   - ✉️ Auto-reply confirmation (to the test email)

### Test 3: Manual API Test (Advanced)

Open terminal and run:
```bash
curl -X POST http://localhost:8000/api/contact/ ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"subject\":\"Test\",\"message\":\"This is a test message from curl\"}"
```

**Expected response:**
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

## 🛠️ Troubleshooting

### ❌ Problem: "Module not found" or "Django not installed"

**Solution:**
```bash
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### ❌ Problem: "Port 8000 already in use"

**Solution:**
```bash
python manage.py runserver 8001
```

Then update frontend API URL to `http://localhost:8001/api/contact/` in Contact.jsx

### ❌ Problem: "Email not sending"

**Checklist:**
- [ ] Gmail 2-Factor Authentication is **enabled**
- [ ] App Password is generated (NOT your normal Gmail password)
- [ ] `.env` file has correct EMAIL_HOST_USER and EMAIL_HOST_PASSWORD
- [ ] Check spam/promotions folder in Gmail
- [ ] Check Django terminal for error messages
- [ ] Restart Django server after changing .env

### ❌ Problem: "CORS error" or "localhost:3000 blocked"

**Solution:**
Make sure `CORS_ALLOWED_ORIGINS` in `.env` includes your frontend port:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Then restart Django server.

### ❌ Problem: Database errors

**Solution:**
```bash
# Delete old database and migrations
del db.sqlite3
rmdir /s contact\migrations  # Keep __init__.py!

# Recreate
python manage.py makemigrations
python manage.py migrate
```

## 📊 Admin Panel

View all contact submissions in Django admin:

1. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```

2. Visit: `http://localhost:8000/admin/`

3. Login with superuser credentials

4. View **Contact Messages** app

**Features:**
- ✅ View all message details
- ✅ Search by name/email/subject
- ✅ Filter by read/replied status
- ✅ Mark as read/replied
- ✅ Bulk actions

## 📱 Frontend Integration (Already Done!)

Your React Contact component is already configured to:
- ✅ Send POST request to `http://localhost:8000/api/contact/`
- ✅ Show success message after submission
- ✅ Show error message on failure
- ✅ Reset form after successful submission
- ✅ Display loading state while sending

No additional frontend changes needed! 🎉

## 🌍 Deploying to Production

When you're ready to deploy:

1. **Choose hosting** (Render, Railway, PythonAnywhere, etc.)
2. **Push code to GitHub**
3. **Set environment variables** on hosting platform
4. **Update frontend API URL** from `localhost:8000` to your live domain
5. **Deploy!**

### Production .env Example:
```env
SECRET_KEY=your-production-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
OWNER_EMAIL=sakshamwayadande01@gmail.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 📧 Email Templates

### Email Sent to Your Gmail (Owner)
```
New contact form submission from your portfolio website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: [Client Name]
📧 Email: [Client Email]
📋 Subject: [Subject]

💬 MESSAGE
[Client Message]

🔗 Reply to: [Client Email]
📅 Received: [Date/Time]
```

### Auto-Reply Sent to Client
```
Hi [Client Name],

Thank you for reaching out. I've received your message regarding your project.

I will review your details and get back to you within 24 hours.

Best regards,
Saksham Wayadande
Full Stack Web Developer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Your Message Details:
Subject: [Subject]

🌐 Portfolio: https://sakshamwayadande.in
📧 Email: sakshamwayadande01@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/saksham-wayadande-21a192316/
🐙 GitHub: https://github.com/Saksham1447
```

## ✅ Final Checklist

Before considering setup complete:

- [ ] **Python installed** and version >= 3.9
- [ ] Virtual environment created
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with Gmail credentials
- [ ] Database migrations run (`python manage.py migrate`)
- [ ] Django server starts without errors
- [ ] Health check works (`/api/health/`)
- [ ] Contact form submission works
- [ ] Email received in your Gmail
- [ ] Auto-reply received in test email
- [ ] Messages visible in admin panel
- [ ] Frontend shows success message

## 🎉 You're All Set!

Your portfolio now has:
✅ **Contact Form API** - Accepts submissions
✅ **Email Notifications** - Get notified of inquiries
✅ **Auto-Replies** - Professional confirmations
✅ **Database** - All messages stored
✅ **Admin Panel** - View and manage submissions
✅ **Security** - Input validation, spam protection
✅ **Error Handling** - Graceful failures

## 📞 Quick Command Reference

```bash
# Activate virtual environment
venv\Scripts\activate          # Windows
source venv/bin/activate       # macOS/Linux

# Start server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Access admin
http://localhost:8000/admin/

# Health check
http://localhost:8000/api/health/

# Submit contact form
http://localhost:3000/ (use React app)
```

---

**Need help?** Check the README.md for more details!

Made with ❤️ for your portfolio
