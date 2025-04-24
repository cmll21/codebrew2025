from .views import ProduceItemViewSet, ProduceTypeViewSet

routes = [
    {"regex": r"produce/types", "viewset": ProduceTypeViewSet, "basename": "produce_type"},
    {"regex": r"produce/items", "viewset": ProduceItemViewSet, "basename": "produce_item"},
]
