from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver

from common.models import Address, IndexedTimeStampedModel
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel, Address):
    class UserType(models.TextChoices):
        CONSUMER = "CONSUMER", _("Consumer")
        SUPPLIER = "SUPPLIER", _("Supplier")

    email      = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name  = models.CharField(max_length=255, blank=True, null=True)
    is_staff   = models.BooleanField(default=False)
    is_active  = models.BooleanField(default=True)
    user_type  = models.CharField(
        max_length=20, choices=UserType.choices, default=UserType.CONSUMER
    )

    objects = UserManager()
    USERNAME_FIELD = "email"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def get_short_name(self):
        return self.first_name or self.email

    def __str__(self):
        return self.email


class CustomerProfile(models.Model):
    user     = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer_profile")
    nickname = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.user.email} (Customer)"


class SupplierProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="supplier_profile")

    def __str__(self):
        return f"{self.user.email} (Supplier)"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if not created:
        return
    if instance.user_type == User.UserType.CONSUMER:
        CustomerProfile.objects.create(user=instance)
    else:
        SupplierProfile.objects.create(user=instance)
