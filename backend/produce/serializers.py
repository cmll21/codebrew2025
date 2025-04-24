from rest_framework import serializers
from .models import ProduceType, ProduceItem
from users.serializers import SupplierProfileSerializer
from users.models import SupplierProfile


class ProduceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProduceType
        fields = ['id', 'name']

class ProduceItemSerializer(serializers.ModelSerializer):
    produce_type = ProduceTypeSerializer(read_only=True)
    supplier_profile = SupplierProfileSerializer(read_only=True)

    produce_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ProduceType.objects.all(),
        source='produce_type',
        write_only=True,
        required=False
    )
    supplier_profile_id = serializers.PrimaryKeyRelatedField(
        source='supplier_profile',
        write_only=True,
        required=False,
        queryset=None
    )

    class Meta:
        model = ProduceItem
        fields = ['id',
                  'produce_type', 'produce_type_id',
                  'supplier_profile', 'supplier_profile_id',
                  'quantity',
                  'created_time',
                  'expiry_time',
                  'quality']
