from rest_framework import serializers
from .models import ProduceType, ProduceItem
from users.serializers import SupplierProfileSerializer
from users.models import SupplierProfile


class ProduceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProduceType
        fields = ['id', 'name', 'image']


class ProduceItemSerializer(serializers.ModelSerializer):
    produce_type = ProduceTypeSerializer(read_only=True)
    supplier_profile = SupplierProfileSerializer(read_only=True)

    produce_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ProduceType.objects.all(),
        source='produce_type',
        write_only=True
    )
    supplier_profile_id = serializers.PrimaryKeyRelatedField(
        queryset=SupplierProfile.objects.all(),
        source='supplier_profile',
        write_only=True
    )

    class Meta:
        model = ProduceItem
        fields = [
            'id',
            'produce_type', 'produce_type_id',
            'supplier_profile', 'supplier_profile_id',
            'weight',
            'created_time',
            'expiry_time',
            'quality'
        ]
