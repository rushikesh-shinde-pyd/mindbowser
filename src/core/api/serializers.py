# django imports
# django imports
from django.contrib.auth import get_user_model

# local imports
from accounts.api.serializers import UserSerializer
from core.models import Profile, Manager, Employee

# third-party imports
from rest_framework import serializers
from rest_framework.permissions import IsAdminUser


User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    """
    Profile serializer for Profile model.
    Nested serializer implementation with 'UserSerializer'.
    """

    user = UserSerializer(required=True)

    class Meta:
        model       = Profile
        fields      = ('user', 'address', 'mobile',)

    def create(self, data):
        user_data = data.pop('user')
        user = User.objects.create_user(**user_data)
        return Profile.objects.create(user=user, **data)


class ManagerSerializer(serializers.ModelSerializer):
    """
    Manager serializer for Manager Proxy model.
    Nested serializer implementation with 'UserSerializer'.
    Access to 'Manager' model limited to 'Admin' user only.
    """

    user = UserSerializer(required=True)

    class Meta:
        model       = Manager
        exclude     = ('emp_id', 'city', 'company')

    def create(self, data):
        user_data = data.pop('user')
        user = User.objects.create_user(**user_data)
        return Manager.objects.create(user=user, **data)
        

class EmployeeSerializer(serializers.ModelSerializer):
    """
    Employee serializer for Employee Proxy model.
    Nested serializer implementation with 'UserSerializer'.
    Access to 'Employee' model limited to 'Manager' and 'Admin' user only.
    """
    
    user = UserSerializer(required=True)

    def create(self, data):
        user_data = data.pop('user')
        user = User.objects.create_user(**user_data)
        return Employee.objects.create(user=user, **data)
         
    class Meta:
        model       = Employee
        fields      = '__all__'


class LoginSerializer(serializers.ModelSerializer):
    """
    Logging Manager in with required credentials into the site.
    """

    class Meta:
        model       = User
        fields      = ('email', 'password')