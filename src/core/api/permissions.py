# django imports

# local imports

# third-party imports
from rest_framework import permissions


class IsManager(permissions.BasePermission):
    """
    Custom user permission.
    Overridden has_permission method.
    Allowing only manager to take specific actions on employees.
    """

    def has_permission(self, request, view):
        return request.user.is_staff or bool(request.user.is_authenticated and request.user.profile.is_manager)