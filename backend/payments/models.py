from django.db import models
from users.models import CustomerProfile

# class Payment(models.Model):
#     customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
#     stripe_payment_intent_id = models.CharField(max_length=255, unique=True)
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     status = models.CharField(max_length=50, choices=[
#         ('pending', 'Pending'),
#         ('completed', 'Completed'),
#         ('failed', 'Failed')
#     ])
#     created_at = models.DateTimeField(auto_now_add=True)
