from django.contrib import admin
from .models import (
    OrderAddress,
    Item,
    CartItem,
    OrderItem,
    Cart,
    Order,
)

admin.site.register(OrderAddress)
admin.site.register(Item)
admin.site.register(CartItem)
admin.site.register(OrderItem)
admin.site.register(Cart)
admin.site.register(Order)
