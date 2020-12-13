# django imports

# local imports
from .serializers import UserSerializer
from accounts.models import User

# third-party imports
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet


class UserViewSet(ModelViewSet):
    """
    UserViewSet view is responsible for handling all possible requests 
    like get, post, put, delete for Custom User model.
    Allowing only 'Admin' user to access this view.
    """
    queryset            = User.objects.all()
    serializer_class    = UserSerializer
    permission_classes  = (IsAdminUser, )

    def update(self, request, *args, **kwargs):
        partial = True
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)