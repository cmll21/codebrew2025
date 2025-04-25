from django.core.validators import MinValueValidator
from django.db import models
from produce.models import ProduceItem

class CartItem(models.Model):
    produce_item = models.ForeignKey(ProduceItem, on_delete=models.CASCADE)
    cart_weight = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])


class Cart(models.Model):
    ...
