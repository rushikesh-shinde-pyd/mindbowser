from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.conf import settings

from .models import User
from core.models import Profile

from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance, created, **kwargs):
    if created:
        Token.objects.create(user=instance)


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()