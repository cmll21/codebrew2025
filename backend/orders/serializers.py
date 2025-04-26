from drf_spectacular.utils import extend_schema_serializer, extend_schema_field
from rest_framework import serializers
from .models import Order, OrderItem, Cart, CartItem, OrderAddress

class OrderAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        fields = ['street', 'city', 'state', 'country', 'postal_code']

class OrderItemSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'item', 'price']

    @extend_schema_field(serializers.FloatField)
    def get_price(self, obj) -> float:
        return obj.item.cart_item_price

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    delivery_address = OrderAddressSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id',
                  'customer',
                  'delivery_address',
                  'order_date',
                  'total_price',
                  'status',
                  'order_items'
                  ]

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'item']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True, source='cart_items')

    class Meta:
        model = Cart
        fields = ['id', 'customer', 'items']
