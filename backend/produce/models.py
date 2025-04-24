from django.core.validators import MinValueValidator
from django.db import models
from users.models import SupplierProfile

class ProduceType(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='produce/types/', null=True, blank=True)
    def __str__(self):
        return self.name

class ProduceItem(models.Model):
    produce_type = models.ForeignKey(ProduceType, on_delete=models.CASCADE)
    supplier_profile = models.ForeignKey(SupplierProfile, on_delete=models.CASCADE)
    weight = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])

    created_time = models.DateTimeField(auto_now_add=True)
    expiry_time = models.DateTimeField(null=True, blank=True)

    quality = models.CharField(max_length=50, choices=[
        ('value', 'Value'),
        ('select', 'Select'),
        ('premium', 'Premium')
    ])

    def __str__(self):
        return f"{self.produce_type} from {self.supplier_profile} - {self.quantity} units"

    class Meta:
        ordering = ['-created_time']
