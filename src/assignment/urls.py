# django imports
from django.contrib import admin
from django.urls import path, include

# local imports

# third-party imports
from rest_framework.authtoken import views
from rest_framework_swagger.views import get_swagger_view


# swagger ui implementation
schema_view = get_swagger_view(title="Employee API endpoints documentation")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('core/', include('core.urls', namespace='core')),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('login/', views.obtain_auth_token, name='login'),
    path('api-documentation/', schema_view),
]
