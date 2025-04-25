from django.core.validators import MinValueValidator
from django.db import models
from common.models import Address
from users.models import CustomerProfile
from produce.models import ProduceItem

class OrderStatus(models.TextChoices):
    CONFIRMED = 'confirmed'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'

class OrderAddress(Address):
    order = models.OneToOneField('Order', on_delete=models.CASCADE, related_name='address')

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
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)

    def get_total_price(self):
        return sum(item.item.cart_item_price for item in self.cart_items.all())

    def checkout(self, delivery_address: Address):
        # Create the order first
        order = Order.objects.create(
            customer=self.customer,
            order_date=timezone.now(),
            total_price=self.get_total_price(),
            status=OrderStatus.CONFIRMED
        )

        # Create the OrderAddress by copying fields from CustomerAddress
        OrderAddress.objects.create(
            order=order,
            street=delivery_address.street,
            city=delivery_address.city,
            state=delivery_address.state,
            country=delivery_address.country,
            postal_code=delivery_address.postal_code
        )

        # Move items from cart to order
        for cart_item in self.cart_items.all():
            # Create order item
            OrderItem.objects.create(
                item=cart_item.item,
                order=order
            )
            # Mark item as ordered
            cart_item.item.is_ordered = True
            cart_item.item.save()
            # Delete cart item
            cart_item.delete()

        return order

class Order(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField(default=0.0, validators=[MinValueValidator(0.0)])
    status = models.CharField(max_length=20, choices=OrderStatus.choices)

