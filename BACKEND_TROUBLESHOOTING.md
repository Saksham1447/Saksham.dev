# 🔧 Troubleshooting Guide - Solve Issues Fast!

## 🆘 Quick Diagnosis

**Server won't start?** → Go to: [Server Won't Start](#server-wont-start)
**Email not sending?** → Go to: [Email Not Sending](#email-not-sending)
**CORS errors?** → Go to: [CORS Errors](#cors-errors)
**Database errors?** → Go to: [Database Errors](#database-errors)
**Port already in use?** → Go to: [Port Already in Use](#port-already-in-use)
**Import errors?** → Go to: [Import Errors](#import-errors)

---

## ❌ Server Won't Start

### Problem 1: "ModuleNotFoundError: No module named 'django'"

**Cause:** Django not installed

**Solution:**

```bash
cd backend
venv\Scripts\activate          # Windows
# source venv/bin/activate    # macOS/Linux

pip install -r requirements.txt
python manage.py runserver
```

**Check:**
- ✅ Virtual environment activated (should see `(venv)` in terminal)
- ✅ All dependencies installed

---

### Problem 2: "Python not found" or "python: command not found"

**Cause:** Python not in PATH

**Solution (Windows):**
1. Go to: https://www.python.org/downloads/
2. Download Python 3.9+
3. **IMPORTANT:** Check "Add Python to PATH" during installation
4. Restart terminal
5. Run `python --version`

**Solution (macOS):**
```bash
brew install python3
python3 --version
```

**Solution (Linux):**
```bash
sudo apt-get install python3 python3-pip python3-venv
python3 --version
```

---

### Problem 3: "SyntaxError in settings.py"

**Cause:** Configuration error in settings file

**Check:**
1. Open: `backend/config/settings.py`
2. Look for typos or missing quotes
3. Make sure file is properly formatted
4. Restart server

**Or restore from backup:**
```bash
# Delete the file and recreate
```

---

## 📧 Email Not Sending

### Problem 1: "SMTPAuthenticationError" or "Email not sent"

**Cause:** Incorrect Gmail credentials

**Checklist:**

1. **Verify Gmail credentials exist:**
   ```bash
   # Open backend/.env file
   # Check these lines:
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=xxxx xxxx xxxx xxxx
   ```

2. **Verify 2-Factor Authentication is ENABLED:**
   - Go to: https://myaccount.google.com/security
   - Look for "2-Step Verification"
   - Should say "Enabled"
   - If not, enable it!

3. **Verify App Password is CORRECT:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select: "Mail" + "Windows Computer"
   - Click "Generate"
   - **Copy the NEW 16-character password**
   - Paste into `.env` replacing old one
   - **Important:** Includes spaces! Don't remove them

4. **Restart Django server:**
   ```bash
   # Stop server (Ctrl+C)
   # Close terminal
   # Reopen terminal
   python manage.py runserver
   ```

---

### Problem 2: "Email sent but not received"

**Cause:** Email in spam folder or wrong recipient

**Check:**

1. **Check spam/promotions folder:**
   - Gmail → Spam → Look for email
   - If found, mark as "Not Spam"

2. **Check `OWNER_EMAIL` is correct:**
   ```bash
   # In backend/.env
   OWNER_EMAIL=sakshamwayadande01@gmail.com  # ← Is this YOUR email?
   ```

3. **Check Gmail allows "Less secure apps":**
   - Go to: https://myaccount.google.com/apppasswords
   - Make sure you're in "App passwords" (not "2-step verification")
   - If "App passwords" doesn't appear = 2FA not enabled!

4. **Test manually:**
   ```bash
   cd backend
   venv\Scripts\activate
   python manage.py shell
   
   # In Python shell:
   from django.core.mail import send_mail
   send_mail('Test', 'Test message', 'your-email@gmail.com', ['your-email@gmail.com'])
   
   # Should return: 1 (success)
   exit()
   ```

---

### Problem 3: "TimeoutError" or "Connection refused"

**Cause:** Gmail server unreachable

**Solutions:**

1. **Check internet connection:**
   - Ping Google: `ping google.com`
   - Or visit: https://gmail.com

2. **Check firewall/antivirus:**
   - Some antivirus blocks SMTP
   - Temporarily disable firewall
   - Or whitelist Python.exe

3. **Try different SMTP settings:**
   - In `config/settings.py`:
   ```python
   EMAIL_PORT = 587      # ← Try this first
   # Or try:
   EMAIL_PORT = 465
   EMAIL_USE_TLS = False
   EMAIL_USE_SSL = True
   ```

4. **Check VPN:**
   - Some VPNs block SMTP
   - Disconnect VPN and try again

---

## 🚫 CORS Errors

### Problem: "Access to XMLHttpRequest blocked by CORS policy"

**Cause:** Frontend can't connect to backend

**Solution:**

1. **Check Django is running:**
   ```bash
   # In browser:
   http://localhost:8000/api/health/
   # Should see JSON response
   ```

2. **Check CORS configuration in `.env`:**
   ```bash
   # backend/.env should have:
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:5174
   ```

3. **Identify your frontend port:**
   - Visit your frontend
   - Look at URL bar
   - Examples:
     - `http://localhost:3000` → Add `3000`
     - `http://localhost:5173` → Add `5173`

4. **Update `.env` if needed:**
   ```bash
   CORS_ALLOWED_ORIGINS=http://localhost:YOUR_PORT
   ```

5. **Restart Django:**
   ```bash
   # Stop (Ctrl+C)
   python manage.py runserver
   ```

6. **Test connection:**
   ```bash
   curl -i http://localhost:8000/api/health/
   # Should see: 200 OK
   ```

---

## 💾 Database Errors

### Problem 1: "django.core.exceptions.ImproperlyConfigured"

**Cause:** Database migrations not applied

**Solution:**

```bash
cd backend
venv\Scripts\activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

### Problem 2: "no such table: contact_contactmessage"

**Cause:** Database corrupted or migrations not run

**Solution:**

```bash
# Option 1: Quick fix (delete database)
del db.sqlite3

# Option 2: Quick fix (delete migrations)
rmdir /s contact\migrations
# Keep the __init__.py file!

# Then recreate:
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

### Problem 3: "SQLite database is locked"

**Cause:** Database file is in use

**Solution:**

```bash
# Stop Django server (Ctrl+C)
# Wait 5 seconds
# Restart:
python manage.py runserver
```

---

## 🔌 Port Already in Use

### Problem: "Address already in use" on port 8000

**Cause:** Something else is using port 8000

**Quick Fix:**
```bash
python manage.py runserver 8001
```

**Then update frontend** in `Contact.jsx`:
```javascript
const response = await fetch('http://localhost:8001/api/contact/', {
```

**To find and kill process using port 8000 (Advanced):**

**Windows:**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :8000
kill -9 <PID>
```

---

## 📥 Import Errors

### Problem 1: "No module named 'contact'"

**Cause:** contact app not installed in Django

**Check:** `backend/config/settings.py`
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    'rest_framework',
    'corsheaders',
    
    'contact',  # ← Should be here!
]
```

**If missing, add it:**
```python
INSTALLED_APPS = [
    # ... existing apps ...
    'contact',
]
```

Then restart server.

---

### Problem 2: "No module named 'decouple'"

**Cause:** python-decouple not installed

**Solution:**
```bash
pip install python-decouple
python manage.py runserver
```

---

## 🔑 Environment Variable Issues

### Problem 1: ".env file not being read"

**Cause:** File in wrong location

**Check:**
```bash
# backend/.env should exist:
cd backend
ls -la .env          # macOS/Linux
dir .env             # Windows (PowerShell: ls .env)
```

If not found:
```bash
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux
```

---

### Problem 2: Django still using old credentials after updating .env

**Cause:** Server still running with old env variables

**Solution:**
```bash
# Stop server (Ctrl+C)
# Close terminal completely
# Open NEW terminal
cd backend
venv\Scripts\activate
python manage.py runserver
```

---

## 🧪 Testing & Debugging

### Test 1: Is Django running?

```bash
curl http://localhost:8000/api/health/
```

**Should return:**
```json
{"status":"ok","message":"Portfolio API is running","email_configured":true}
```

---

### Test 2: Can frontend reach backend?

**In Browser Console (F12):**
```javascript
fetch('http://localhost:8000/api/health/').then(r => r.json()).then(console.log)
```

**Should print JSON response**

---

### Test 3: Can Django send email?

```bash
cd backend
venv\Scripts\activate
python manage.py shell
```

```python
from django.core.mail import send_mail
result = send_mail('Test', 'Test', 'your-email@gmail.com', ['recipient@example.com'])
print(f"Sent: {result}")  # Should be: Sent: 1
exit()
```

---

### Test 4: Check email configuration

```bash
python manage.py shell
```

```python
from django.conf import settings
print(f"HOST: {settings.EMAIL_HOST}")
print(f"PORT: {settings.EMAIL_PORT}")
print(f"USER: {settings.EMAIL_HOST_USER}")
print(f"PASSWORD: {settings.EMAIL_HOST_PASSWORD[:3]}***")  # Hide password
print(f"TLS: {settings.EMAIL_USE_TLS}")
exit()
```

---

## 🐛 Debug Mode

### Enable detailed error messages:

**Windows PowerShell:**
```bash
$env:PYTHONUNBUFFERED = "1"
python manage.py runserver
```

This shows full error tracebacks.

---

### Check Django logs:

Look for lines like:
```
[INFO] Owner notification sent for message from client@example.com
[ERROR] Failed to send auto-reply: ...
```

This tells you exactly what failed.

---

## 🆘 Still Not Working?

### Provide this info:

1. **What is the exact error message?**
   - Copy the full error text

2. **What OS are you using?**
   - Windows? macOS? Linux?

3. **What have you already tried?**
   - List the solutions you tried

4. **Which step are you on?**
   - Setup? Running? Testing?

### Check these files for issues:

```bash
# Show Python version:
python --version

# Show installed packages:
pip list | grep -E "Django|djangorestframework|decouple"

# Show if .env exists:
dir backend\.env

# Show if venv exists:
dir backend\venv

# Show Django version:
python -c "import django; print(django.get_version())"
```

---

## 📞 Getting Help

**Check files in this order:**

1. **Quick issues?** → `QUICK_SETUP.md`
2. **Setup help?** → `BACKEND_COMPLETE_GUIDE.md`
3. **Understanding code?** → `BACKEND_FILE_REFERENCE.md`
4. **Detailed docs?** → `README.md` (in backend folder)
5. **Email specific?** → Check email section in `BACKEND_COMPLETE_GUIDE.md`

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] Python 3.9+ installed (`python --version`)
- [ ] Virtual environment activated (`(venv)` in terminal)
- [ ] Dependencies installed (`pip list` shows Django, DRF)
- [ ] `.env` file exists (`dir .env` or `ls .env`)
- [ ] `.env` has Gmail credentials filled in
- [ ] Gmail 2FA enabled (https://myaccount.google.com/security)
- [ ] App password generated (https://myaccount.google.com/apppasswords)
- [ ] Database migrated (`db.sqlite3` exists)
- [ ] Django server starts (`python manage.py runserver`)
- [ ] Health check works (`curl http://localhost:8000/api/health/`)
- [ ] Frontend can reach backend (no CORS errors)

If all ✅, it should work!

---

Made with ❤️ to help you troubleshoot!
