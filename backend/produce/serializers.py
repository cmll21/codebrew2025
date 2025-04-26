from rest_framework import serializers
from .models import ProduceType, ProduceItem, ProduceCategory
from users.serializers import UserSerializer
from users.models import User

class ProduceTypeSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=ProduceCategory.objects.all())
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=ProduceCategory.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = ProduceType
        fields = ['id', 'name', 'image', 'category', 'category_id', 'season']


class ProduceItemSerializer(serializers.ModelSerializer):
    produce_type = ProduceTypeSerializer(read_only=True)
    supplier_profile = UserSerializer(read_only=True)

    produce_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ProduceType.objects.all(),
        source='produce_type',
        write_only=True
    )
    supplier_profile_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
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
            'price',
            'created_time',
            'expiry_time',
            'quality',
            'item_image'
        ]
