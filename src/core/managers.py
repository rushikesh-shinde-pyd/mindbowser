from django.db import models


class ProfileManager(models.Manager):
    """
    Profile manager for Profile model to define all utility methods 
    that are useful in interacting with Profile table in db.
    """
    def get_queryset(self):
        return super().get_queryset()


class ManagerManager(models.Manager):
    """
    Manager manager for Profile model to define all utility methods 
    that are useful to do tasks based on user role in this case 'Manager' is
    the role.
    """
    def get_queryset(self):
        return super().get_queryset().filter(role='manager')


class EmployeeManager(models.Manager):
    """
    Employee manager for Profile model to define all utility methods 
    that are useful to do tasks based on user role in this case 'Empoyee' is
    the role.
    """
    def get_queryset(self):
        return super().get_queryset().filter(role='employee')