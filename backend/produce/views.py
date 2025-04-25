from rest_framework import viewsets

from .models import ProduceItem, ProduceType, ProduceCategory
from .serializers import ProduceItemSerializer, ProduceTypeSerializer, ProduceCategorySerializer

class ProduceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProduceCategory.objects.all()
    serializer_class = ProduceCategorySerializer

class ProduceTypeViewSet(viewsets.ModelViewSet):
    queryset = ProduceType.objects.all()
    serializer_class = ProduceTypeSerializer

class ProduceItemViewSet(viewsets.ModelViewSet):
    queryset = ProduceItem.objects.all()
    serializer_class = ProduceItemSerializer
