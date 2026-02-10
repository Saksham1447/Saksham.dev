"""
Contact app serializers - Validate and serialize contact form data
"""
from rest_framework import serializers
from .models import ContactMessage
import re


class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for contact form submissions with validation
    """
    
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def validate_name(self, value):
        """
        Validate name field - no special characters, min 2 chars
        """
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        # Allow only letters, spaces, and common name characters
        if not re.match(r'^[a-zA-Z\s\'-]+$', value):
            raise serializers.ValidationError("Name can only contain letters, spaces, hyphens, and apostrophes.")
        
        return value.strip()
    
    def validate_email(self, value):
        """
        Validate email format
        """
        email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError("Please enter a valid email address.")
        
        return value.lower().strip()
    
    def validate_subject(self, value):
        """
        Validate subject field - min 3 chars, max 200 chars
        """
        if len(value.strip()) < 3:
            raise serializers.ValidationError("Subject must be at least 3 characters long.")
        
        if len(value.strip()) > 200:
            raise serializers.ValidationError("Subject must not exceed 200 characters.")
        
        return value.strip()
    
    def validate_message(self, value):
        """
        Validate message field - min 10 chars
        """
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Message must be at least 2 characters long.")
        
        # Check for spam patterns (basic)
        spam_keywords = ['viagra', 'casino', 'lottery', 'prize', 'winner']
        if any(keyword in value.lower() for keyword in spam_keywords):
            raise serializers.ValidationError("Your message contains prohibited content.")
        
        return value.strip()
