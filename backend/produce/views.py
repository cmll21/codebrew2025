from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import ProduceItem, ProduceType, ProduceCategory
from .serializers import ProduceItemSerializer, ProduceTypeSerializer, ProduceCategorySerializer

class ProduceCategoryViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = ProduceCategory.objects.all()
    serializer_class = ProduceCategorySerializer
    authentication_classes = []

class ProduceTypeViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = ProduceType.objects.all()
    serializer_class = ProduceTypeSerializer
    authentication_classes = []

class ProduceItemViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = ProduceItem.objects.all()
    serializer_class = ProduceItemSerializer
    authentication_classes = []
