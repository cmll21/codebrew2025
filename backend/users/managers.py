from django.contrib.auth.models import BaseUserManager


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
    
    def create_consumer(self, **kwargs):
        kwargs["user_type"] = User.UserType.CONSUMER
        return self.create_user(**kwargs)
    
    def create_supplier(self, **kwargs):
        kwargs["user_type"] = User.UserType.SUPPLIER
        return self.create_user(**kwargs)
