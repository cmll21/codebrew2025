from django.shortcuts import render
from orders.serializers import CartItemSerializer, OrderSerializer, CartSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Order
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def checkout_view(request):
    try:
        # Get the user's cart
        cart = get_object_or_404(Cart, customer=request.user.customer_profile)
        
        # Get the delivery address from the request
        delivery_address = request.data.get('delivery_address')
        if not delivery_address:
            return Response(
                {"error": "Delivery address is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Process the checkout
        order = cart.checkout(delivery_address)
        
        return Response({
            "message": "Order created successfully",
            "order_id": order.id,
            "total_price": order.total_price
        }, status=status.HTTP_201_CREATED)
        
    except Cart.DoesNotExist:
        return Response(
            {"error": "Cart not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]


  