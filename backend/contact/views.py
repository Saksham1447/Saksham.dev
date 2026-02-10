"""
Contact app views - Handle contact form submissions and email automation
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .models import ContactMessage
from .serializers import ContactSerializer
import logging

# Setup logger
logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def contact_view(request):
    """
    Handle contact form submissions with email automation
    
    POST /api/contact/
    
    Request Body:
    {
        "name": "Client Name",
        "email": "client@example.com",
        "subject": "Project Inquiry",
        "message": "Message content..."
    }
    
    Returns:
    - 201: Message sent successfully
    - 400: Validation error
    - 500: Server error (email failed)
    """
    
    # Validate incoming data
    serializer = ContactSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors,
            'message': 'Please check your input and try again.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Save to database
        contact_message = serializer.save()
        
        # Extract data
        client_name = contact_message.name
        client_email = contact_message.email
        subject = contact_message.subject
        message = contact_message.message
        
        # ========================================
        # 1️⃣ Send Email to Website Owner
        # ========================================
        owner_subject = f"New Contact Form Submission: {subject}"
        owner_message = f"""
New contact form submission from your portfolio website!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: {client_name}
📧 Email: {client_email}
📋 Subject: {subject}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 Reply to: {client_email}
📅 Received: {contact_message.created_at.strftime('%B %d, %Y at %I:%M %p')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from Portfolio Contact Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        """
        
        # We removed the try-except here so errors trigger the main exception handler
        send_mail(
            subject=owner_subject,
            message=owner_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.OWNER_EMAIL],
            fail_silently=False,
        )
        logger.info(f"Owner notification sent for message from {client_email}")
        
        # ========================================
        # 2️⃣ Send Auto-Reply to Client
        # ========================================
        client_subject = "Thank you for your inquiry"
        client_message = f"""
Hello {client_name},

Thank you for reaching out. Your message has been received successfully.

I will review your inquiry and respond within 24 hours.

I look forward to discussing your project further.

Kind regards,
Saksham
Full Stack Web Developer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Your Message Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subject: {subject}
Message: {message[:100]}{'...' if len(message) > 100 else ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Portfolio: https://sakshamwayadande.in
📧 Email: sakshamwayadande01@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated response. Please do not reply to this email.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        """
        
        send_mail(
            subject=client_subject,
            message=client_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[client_email],
            fail_silently=False,
        )
        logger.info(f"Auto-reply sent to {client_email}")
        
        # ========================================
        # 3️⃣ Return Success Response
        # ========================================
        return Response({
            'success': True,
            'message': "Message sent successfully. I'll contact you within 24 hours.",
            'data': {
                'id': contact_message.id,
                'name': client_name,
                'email': client_email,
                'created_at': contact_message.created_at
            }
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        # Log the error
        error_msg = str(e)
        logger.error(f"Contact form error: {error_msg}")
        
        # Return error response
        return Response({
            'success': False,
            'message': 'An error occurred while sending your message. Please verify your email settings in .env.',
            'debug_error': error_msg if settings.DEBUG else None
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check endpoint to verify API is running
    
    GET /api/health/
    """
    return Response({
        'status': 'ok',
        'message': 'Portfolio API is running',
        'email_configured': bool(settings.EMAIL_HOST_USER and settings.EMAIL_HOST_PASSWORD)
    }, status=status.HTTP_200_OK)
