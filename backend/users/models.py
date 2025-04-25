from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from common.models import IndexedTimeStampedModel

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    # UserType choices of consumer and supplier 
    class UserType(models.TextChoices):
        CONSUMER = "CONSUMER", _("Consumer")
        SUPPLIER = "SUPPLIER", _("Supplier")
        
    email = models.EmailField(max_length=255, unique=True)
<<<<<<< HEAD
=======
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
>>>>>>> main
    password = models.CharField(max_length=255)
    is_staff = models.BooleanField(
        default=False, help_text=_("Designates whether the user can log into this admin site.")
    )
    is_active = models.BooleanField(
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )
    # UserType choices
    user_type = models.CharField(
        max_length=20, choices=UserType.choices, default=UserType.CONSUMER
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email

# Optional: Proxy models to allow clearer admin interfaces or specialized logic
class Consumer(User):
    objects = models.Manager()

    class Meta:
        proxy = True


class Supplier(User):
    objects = models.Manager()

    class Meta:
        proxy = True


# Profiles to store additional fields
class ConsumerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="consumer_profile")
    delivery_address = models.CharField(max_length=255)

    def __str__(self):
        return f"ConsumerProfile({self.user.email})"


class SupplierProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="supplier_profile")
    location_address = models.CharField(max_length=255)

    def __str__(self):
        return f"SupplierProfile({self.user.email})"


# Signals to auto-create profile when user is created
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == User.UserType.CONSUMER:
            ConsumerProfile.objects.create(user=instance)
        elif instance.user_type == User.UserType.SUPPLIER:
            SupplierProfile.objects.create(user=instance)
