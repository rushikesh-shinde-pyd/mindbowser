from django.contrib import admin

from .models import Profile, Manager, Employee


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    model               = Profile
    list_display        = ('user', 'role', 'mobile', 'address', 'company', 'city')
    list_filter         = ('city', 'address', 'company',)
    search_fields       = ('city',)


@admin.register(Manager)
class ManagerAdmin(admin.ModelAdmin):
    model               = Manager
    list_display        = ('user', 'role', 'mobile', 'address', 'company', 'city')
    list_filter         = ('city', 'address', 'company',)
    search_fields       = ('city',)