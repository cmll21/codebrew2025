from .views import OrderViewSet, CartViewSet, CartItemViewSet

routes = [
    {"regex": r"orders", "viewset": OrderViewSet, "basename": "order"},
    {"regex": r"carts", "viewset": CartViewSet, "basename": "cart"},
    {"regex": r"cart-items", "viewset": CartItemViewSet, "basename": "cart-item"},
]