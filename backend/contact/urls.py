"""
Contact app URL configuration
"""
from django.urls import path
from .views import contact_view, health_check

app_name = 'contact'

urlpatterns = [
    path('contact/', contact_view, name='contact'),
    path('health/', health_check, name='health'),
]
