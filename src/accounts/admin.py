from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import UserCreationForm, UserChangeForm
from .models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    add_form        = UserCreationForm
    form            = UserChangeForm
    model           = User
    list_display    = ('email', 'first_name', 'last_name', 'is_staff', 'is_active',)
    list_filter     = ('email', 'first_name', 'last_name', 'is_staff', 'is_active',)
    fieldsets       = (
                        (None, {'fields': ('email','first_name', 'last_name', 'password')}),
                        ('Permissions', {'fields': ('is_staff', 'is_active')}),
                    )
    add_fieldsets   = (
                        (None, {
                            'classes': ('wide',),
                            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')
                            }
                        ),
                    )
    search_fields   = ('email',)
    ordering        = ('email',)
