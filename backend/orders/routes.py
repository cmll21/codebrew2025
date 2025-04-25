from .views import OrderViewSet, CartViewSet

routes = [
    {"regex": r"orders", "viewset": OrderViewSet, "basename": "order"},
    {"regex": r"carts", "viewset": CartViewSet, "basename": "cart"},
]