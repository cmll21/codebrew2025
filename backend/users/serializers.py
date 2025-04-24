from rest_framework import serializers
from .models import User, ConsumerProfile, SupplierProfile


class ConsumerProfileSerializer(serializers.ModelSerializer):
    #user_info = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ConsumerProfile
        fields = ["delivery_address"]


class SupplierProfileSerializer(serializers.ModelSerializer):
   # user_info = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SupplierProfile
        fields = ["location_address"]


class UserSerializer(serializers.ModelSerializer):
    consumer_profile = ConsumerProfileSerializer(read_only=True)
    supplier_profile = SupplierProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [  # noqa: RUF012
            "id",
            "email",
            "password",
            "is_active",
            "is_staff",
            "is_superuser",
            "created",
            "modified",
            "last_login",
            "user_type",
            "consumer_profile",
            "supplier_profile",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
