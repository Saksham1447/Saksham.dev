"""
URL configuration for portfolio backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('api/health/')),
    path('admin/', admin.site.urls),
    path('api/', include('contact.urls')),
]
