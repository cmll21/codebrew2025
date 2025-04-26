from rest_framework import serializers
from .models import Item, ProduceItem
from .models import Order, OrderItem, Cart, CartItem, OrderAddress
from produce.serializers import ProduceItemSerializer

class OrderAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        fields = ['street', 'city', 'state', 'country', 'postal_code']

class OrderItemSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'item', 'price']

    def get_price(self, obj):
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

class ItemSerializer(serializers.ModelSerializer):
    produce_item = ProduceItemSerializer()

    class Meta:
        model = Item
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'item']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True, source='cart_items')

    class Meta:
        model = Cart
        fields = ['id', 'customer', 'items']
