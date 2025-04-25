from .views import ProduceItemViewSet, ProduceTypeViewSet, ProduceCategoryViewSet

routes = [
    {"regex": r"produce/categories", "viewset": ProduceCategoryViewSet, "basename": "produce_category"},
    {"regex": r"produce/types", "viewset": ProduceTypeViewSet, "basename": "produce_type"},
    {"regex": r"produce/items", "viewset": ProduceItemViewSet, "basename": "produce_item"},
]
