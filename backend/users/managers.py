from django.contrib.auth.models import BaseUserManager
from django.apps import apps

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, **kwargs):
        user = self.create_user(**kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
    
    def create_consumer(self, delivery_address=None, **kwargs):
        kwargs["user_type"] = self.model.UserType.CONSUMER
        user = self.create_user(**kwargs)

        if delivery_address:
            ConsumerProfile = apps.get_model("users", "ConsumerProfile")
            ConsumerProfile.objects.create(user=user, delivery_address=delivery_address)

        return user

    def create_supplier(self, location_address=None, **kwargs):
        kwargs["user_type"] = self.model.UserType.SUPPLIER
        user = self.create_user(**kwargs)

        if location_address:
            SupplierProfile = apps.get_model("users", "SupplierProfile")
            SupplierProfile.objects.create(user=user, location_address=location_address)

        return user
