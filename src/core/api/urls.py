# django imports
from django.urls import path, include

# local imports
from .views import ProfileViewSet, EmployeeViewSet, ManagerViewSet, LoginView

# third-party imports
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)
router.register(r'managers', ManagerViewSet)
router.register(r'employees', EmployeeViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('manager/login/', LoginView.as_view(), name='manager-login'),
]