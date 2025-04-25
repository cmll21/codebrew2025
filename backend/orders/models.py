from django.core.validators import MinValueValidator
from django.db import models
from common.models import Address
from users.models import CustomerProfile
from produce.models import ProduceItem

class OrderStatus(models.TextChoices):
    CONFIRMED = 'confirmed'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'


class Item(models.Model):
    produce_item = models.ForeignKey(ProduceItem, on_delete=models.CASCADE)
    cart_item_weight = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])
    # Cannot use self in field definition
    cart_item_price = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])
    is_ordered = models.BooleanField(default=False)

    def validate_item_weight(self):
        if self.cart_item_weight > self.produce_item.weight:
            raise ValueError("Cart weight cannot exceed the available produce item weight.")
        return True

    def calculate_price(self):
        return self.cart_item_weight * self.produce_item.price

    def save(self, *args, **kwargs):
        self.cart_item_price = self.calculate_price()
        super().save(*args, **kwargs)

class CartItem(models.Model):
    item = models.OneToOneField(Item, on_delete=models.CASCADE)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE, related_name='cart_items')

class OrderItem(models.Model):
    item = models.OneToOneField(Item, on_delete=models.CASCADE)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_items')

class Cart(models.Model):
    ...

class Order(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    delivery_address = models.ForeignKey(Address, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])
    status = models.CharField(max_length=20, choices=OrderStatus.choices)
