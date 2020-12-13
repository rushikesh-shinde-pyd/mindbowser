# django imports
from django.conf import settings 
from django.contrib.auth import get_user_model

# local imports
from accounts.models import User

# third-party imports
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# using current user class set up in settings as
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer for 'User' model."""

    password = serializers.CharField(
        min_length=8, 
        max_length=128, 
        write_only=True,
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        min_length=8, 
        max_length=128, 
        write_only=True,
        style={'input_type': 'password'}
    )


    class Meta:
        model = User   
        fields = (
            'id',
            'first_name', 
            'last_name',
            'email',
            'password',
            'confirm_password',
            'is_active',
            'is_staff'
        )
        extra_kwargs = {
            'is_staff': {
                'read_only': True
            },
            'is_active': {
                'read_only': True
            },
        }


    def validate(self, data):
        """
        Matches password and confirm password field.
        """
        password = data.get('password')
        confirm_password = data.pop('confirm_password', None)
        method = self.context.get('request').method
        if method == 'POST':
            if not (password and confirm_password and password == confirm_password):
                raise serializers.ValidationError('Password mismatch.')        
        return data

    def create(self, data):
        return User.objects.create_user(**data)

    def update(self, instance, validated_data):
        print('account update')
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance

