# ⚡ QUICK START - 2 Minutes Setup

## 🔑 Gmail Credentials (Get These First!)

1. Go to: https://myaccount.google.com/apppasswords
2. Select: **Mail** + **Windows Computer**
3. Click **Generate**
4. **Copy the 16-character password** (save it!)

---

## 🐍 Windows Setup

```bash
cd backend
setup.bat
```

**This will:**
- ✅ Create virtual environment
- ✅ Install Django + dependencies
- ✅ Create `.env` file
- ✅ Setup database

---

## 🔧 Configure Email (1 minute)

Edit `backend/.env`:

```env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=xxxx xxxx xxxx xxxx
OWNER_EMAIL=sakshamwayadande01@gmail.com
```

---

## ▶️ Start Servers

### Terminal 1 - Django Backend:
```bash
cd backend
run.bat
```

### Terminal 2 - React Frontend:
```bash
cd frontend
npm run dev
```

---

## ✅ Test It!

1. Visit: `http://localhost:5173` (or your Vite port)
2. Go to **Contact** section
3. Fill form and click **Send**
4. Check your Gmail for 2 emails:
   - ✉️ Notification (sent to you)
   - ✉️ Auto-reply (sent to whoever filled the form)

---

## 🎉 Done!

Your contact form with email automation is working!

---

## ❌ Errors?

**"Module not found"?**
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

**"Port 8000 in use"?**
```bash
python manage.py runserver 8001
```

**"Email not sending"?**
- ✅ Check `.env` has correct credentials
- ✅ Check spam folder
- ✅ Verify Gmail 2FA is enabled
- ✅ Restart server

---

**Full guide:** `BACKEND_COMPLETE_GUIDE.md`
