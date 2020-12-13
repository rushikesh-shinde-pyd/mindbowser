# django imports
from django.urls import path, include

# local imports
from .views import UserViewSet

# third-party imports
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'users', UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
]