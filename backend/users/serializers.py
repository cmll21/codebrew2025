from rest_framework import serializers
from .models import User, CustomerProfile, SupplierProfile, CustomerAddress, SupplierAddress, CustomerAddress
from common.serializers import AddressSerializer


class NestedCustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ["delivery_address"]


class NestedSupplierProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierProfile
        fields = ["location_address"]


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "user_type"]

class CustomerProfileSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer(read_only=True)

    class Meta:
        model = CustomerProfile
        fields = ["user", "delivery_address"]

class SupplierProfileSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer(read_only=True)

    class Meta:
        model = SupplierProfile
        fields = ["user", "location_address"]

class UserSerializer(serializers.ModelSerializer):
    customer_profile = NestedCustomerProfileSerializer(required=False)
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
            "customer_profile",
            "supplier_profile",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        customer_data = validated_data.pop("customer_profile", None)
        supplier_data = validated_data.pop("supplier_profile", None)

        user = User.objects.create_user(**validated_data)

        if user.user_type == "customer" and customer_data:
            CustomerProfile.objects.create(user=user, **customer_data)
        elif user.user_type == "supplier" and supplier_data:
            SupplierProfile.objects.create(user=user, **supplier_data)

        return user

class CustomerAddressSerializer(AddressSerializer, serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = [
            "id",
            "nickname",
            "customer",
            "is_primary",
            "street",
            "city",
            "state",
            "country",
            "postal_code",
        ]

class SupplierAddressSerializer(AddressSerializer, serializers.ModelSerializer):
    class Meta:
        model = SupplierAddress
        fields = [
            "id",
            "supplier",
            "street",
            "city",
            "state",
            "country",
            "postal_code",
        ]
