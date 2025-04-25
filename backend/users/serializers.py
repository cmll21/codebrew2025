from rest_framework import serializers
from .models import User, ConsumerProfile, SupplierProfile


class NestedConsumerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsumerProfile
        fields = ["delivery_address"]


class NestedSupplierProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierProfile
        fields = ["location_address"]


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "user_type"]

class ConsumerProfileSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    #user_info = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ConsumerProfile
        fields = ["delivery_address"]


class SupplierProfileSerializer(serializers.ModelSerializer):
   # user_info = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SupplierProfile
        fields = ["location_address"]
        fields = ["location_address"]

=======
    user = NestedUserSerializer(read_only=True)

    class Meta:
        model = ConsumerProfile
        fields = ["user", "delivery_address"]

class SupplierProfileSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer(read_only=True)

    class Meta:
        model = SupplierProfile
        fields = ["user", "location_address"]
>>>>>>> main

class UserSerializer(serializers.ModelSerializer):
    consumer_profile = NestedConsumerProfileSerializer(required=False)
    supplier_profile = NestedSupplierProfileSerializer(required=False)

    class Meta:
        model = User
        fields = [  # noqa: RUF012
            "id",
            "first_name",
            "last_name",
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
<<<<<<< HEAD
        user = User.objects.create_user(**validated_data)
=======
        consumer_data = validated_data.pop("consumer_profile", None)
        supplier_data = validated_data.pop("supplier_profile", None)

        user = User.objects.create_user(**validated_data)

        if user.user_type == "consumer" and consumer_data:
            ConsumerProfile.objects.create(user=user, **consumer_data)
        elif user.user_type == "supplier" and supplier_data:
            SupplierProfile.objects.create(user=user, **supplier_data)

>>>>>>> main
        return user
