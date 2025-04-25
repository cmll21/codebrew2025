from django.core.validators import MinValueValidator
from django.db import models
from produce.models import ProduceItem

class Item(models.Model):
    produce_item = models.ForeignKey(ProduceItem, on_delete=models.CASCADE)
    cart_item_weight = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])
    cart_item_price = models.FloatField(default=self.calculate_price, validators=[MinValueValidator(0.0)])
    is_ordered = models.BooleanField(default=False)

    def validate_item_weight(self):
        if self.cart_weight > self.produce_item.weight:
            raise ValueError("Cart weight cannot exceed the available produce item weight.")
        return True

    def calculate_price(self):
        return self.cart_weight * self.produce_item.price

class CartItem(models.Model):
    item = models.OneToOneField(Item, on_delete=models.CASCADE)
    cart = models.ForeignKey('Cart', on_delete=models.CASCADE, related_name='cart_items')

class OrderItem(models.Model):
    item = models.OnetoOneField(Item, on_delete=models.CASCADE)
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name='order_items')

class Cart(models.Model):
    ...
