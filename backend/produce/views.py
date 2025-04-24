from rest_framework import viewsets

from .models import ProduceItem, ProduceType
from .serializers import ProduceItemSerializer, ProduceTypeSerializer

class ProduceTypeViewSet(viewsets.ModelViewSet):
    queryset = ProduceType.objects.all()
    serializer_class = ProduceTypeSerializer

class ProduceItemViewSet(viewsets.ModelViewSet):
    queryset = ProduceItem.objects.all()
    serializer_class = ProduceItemSerializer
