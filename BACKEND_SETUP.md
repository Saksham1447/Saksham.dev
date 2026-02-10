# Django Backend Setup Guide

## Overview

This guide will help you set up the Django backend for the portfolio website.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

## Setup Instructions

### 1. Create Virtual Environment

```bash
# Navigate to portfolio directory
cd portfolio

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Django and Dependencies

```bash
pip install django djangorestframework django-cors-headers pillow python-decouple
```

### 3. Create Django Project

```bash
# Create backend directory if it doesn't exist
mkdir backend
cd backend

# Create Django project
django-admin startproject config .

# Create Django apps
python manage.py startapp portfolio
python manage.py startapp blog
python manage.py startapp contact
python manage.py startapp testimonials
python manage.py startapp services
```

### 4. Configure Settings

Edit `backend/config/settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    
    # Local apps
    'portfolio',
    'blog',
    'contact',
    'testimonials',
    'services',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Add this
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

# REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

# Media Files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Static Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

### 5. Create Models

#### Portfolio App (`backend/portfolio/models.py`):

```python
from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web_design', 'Web Design'),
        ('ui_ux', 'UI/UX'),
        ('development', 'Development'),
        ('branding', 'Branding'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    technologies = models.JSONField(default=list)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
```

#### Blog App (`backend/blog/models.py`):

```python
from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    excerpt = models.TextField()
    content = models.TextField()
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='blog/', blank=True, null=True)
    read_time = models.IntegerField(help_text="Read time in minutes")
    published_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
```

#### Contact App (`backend/contact/models.py`):

```python
from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
```

#### Testimonials App (`backend/testimonials/models.py`):

```python
from django.db import models

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    text = models.TextField()
    rating = models.IntegerField(default=5)
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.company}"
```

### 6. Create Serializers

Create `serializers.py` in each app:

```python
# portfolio/serializers.py
from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

# Similar for other apps...
```

### 7. Create Views

```python
# portfolio/views.py
from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
```

### 8. Configure URLs

```python
# backend/config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from portfolio.views import ProjectViewSet
# Import other viewsets...

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
# Register other viewsets...

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 9. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 10. Create Superuser

```bash
python manage.py createsuperuser
```

### 11. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}/` - Get project details
- `GET /api/blog/` - List all blog posts
- `POST /api/contact/` - Submit contact form
- `GET /api/testimonials/` - List testimonials
- `GET /api/services/` - List services

## Admin Panel

Access the admin panel at `http://localhost:8000/admin/` using the superuser credentials.

## Frontend Integration

Update the frontend to use the API:

```javascript
// src/api/client.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch projects
export const getProjects = () => api.get('/projects/');

// Submit contact form
export const submitContact = (data) => api.post('/contact/', data);
```

## Deployment

### Backend Deployment (Render/Heroku)

1. Create `requirements.txt`:
```bash
pip freeze > requirements.txt
```

2. Create `Procfile`:
```
web: gunicorn config.wsgi
```

3. Install gunicorn:
```bash
pip install gunicorn
```

4. Configure production settings
5. Deploy to your platform of choice

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to Vercel or Netlify

## Environment Variables

Create `.env` file in backend directory:

```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=your-database-url
```

## Next Steps

1. Implement authentication (JWT)
2. Add image optimization
3. Implement caching
4. Add rate limiting
5. Set up CI/CD pipeline
6. Configure production database
7. Add email notifications for contact form

---

For questions or issues, please refer to the main README.md
