# django imports
from django.db import models
# from django.conf import settings

# local imports
from accounts.models import User
from .choices import ROLES
from .managers import ProfileManager, ManagerManager, EmployeeManager


class Profile(models.Model):
    """
    Profile model include all fields related to manager and employee roles.
    """ 

    emp_id      = models.CharField('EID', max_length=20, null=True, blank=True)
    user        = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    address     = models.CharField(max_length=50, null=True, blank=True)
    company     = models.CharField(max_length=50, null=True, blank=True)
    city        = models.CharField(max_length=50, null=True, blank=True)
    mobile      = models.CharField(max_length=10, null=True, unique=True, blank=True)
    dob         = models.DateField('Date of Birth', null=True, blank=True)
    role        = models.CharField(max_length=20, choices=ROLES, default='employee')

    objects     = ProfileManager()

    @property
    def is_manager(self):
        return True if self.role == 'manager' else False

    @property
    def is_employee(self):
        return True if self.role == 'employee' else False

    def __str__(self):
        return '%s %s' % (self.user.first_name, self.user.last_name)


    class Meta:
        ordering = ('user__first_name', 'user__last_name',)


class Manager(Profile):
    """
    Proxy model Manager for Profile model to manage managers tasks.
    """
    objects     = ManagerManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = 'manager'
        return super().save(*args, **kwargs)

    class Meta:
        proxy = True
    

class Employee(Profile):
    """
    Proxy model for Employee for Profile model to manage employees tasks.
    """

    objects     = EmployeeManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = 'employee'
        return super().save(*args, **kwargs)
    
    class Meta:
        proxy = True

