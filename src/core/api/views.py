# django imports 
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, Http404

# local imports
from .serializers import ProfileSerializer, ManagerSerializer, EmployeeSerializer, LoginSerializer
from core.models import Profile, Employee, Manager
from .permissions import IsManager
from accounts.api.serializers import UserSerializer
# from .utility import is_manager

# third-party imports
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAdminUser
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework import serializers
from rest_framework import status

User = get_user_model()

class ProfileViewSet(ModelViewSet):
    """Handles incoming all request types for Profile model."""

    queryset            = Profile.objects.all()
    serializer_class    = ProfileSerializer


class ManagerViewSet(ModelViewSet):
    """Handles incoming all request types for Manager proxy model."""

    queryset            = Manager.objects.all()
    serializer_class    = ManagerSerializer

    def get_permissions(self):
        if self.action and self.action == 'update' or self.action == 'destroy':
            return [IsAdminUser(), ]
        return super().get_permissions()

    def update(self, request, *args, **kwargs):
    # try:
        partial = True
        instance = self.get_object()

        user_data = request.data.pop('user')
        user_obj = get_object_or_404(User, id=user_data.get('id'))

        user_serializer = UserSerializer(user_obj, data=user_data, context={'request': request}, partial=partial)
        user_serializer.is_valid(raise_exception=True)
        self.perform_update(user_serializer)

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    # except :



class EmployeeViewSet(ModelViewSet):
    """
    Handles incoming all request types for Employee proxy model.
    Allows only Admin and Manager user to access this view.
    """

    queryset            = Employee.objects.all()
    serializer_class    = EmployeeSerializer
    permission_classes  = [IsManager]
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            print(instance)
            user_obj = get_object_or_404(User, id=instance.user.id)
            print(user_obj)
            user_obj.delete()
            print('deelte success')
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Http404:
            print('deelte failed')
            return Response(status=status.HTTP_404_NOT_FOUND)


    def update(self, request, *args, **kwargs):
        try:
            # Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(request.data)
            partial = True
            instance = self.get_object()

            user_data = request.data.pop('user')
            user_obj = User.objects.get(id=user_data.get('id'))
        
            user_serializer = UserSerializer(user_obj, data=user_data, context={'request': request}, partial=partial)
            user_serializer.is_valid(raise_exception=False)

            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=False)

            if serializer.errors or user_serializer.errors:
                return Response({**serializer.errors, **user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                self.perform_update(user_serializer)
                self.perform_update(serializer)
                return Response(serializer.data)
        except Http404:
            return Response(status=status.HTTP_404_NOT_FOUND)


class LoginView(ObtainAuthToken):
    """
    LoginView inherited from rest_framework's ObtainAuthToken class.
    Overridden post method for allowing only manager role user to login in.
    """
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.profile.is_manager:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        raise PermissionDenied