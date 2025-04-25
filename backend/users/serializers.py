from rest_framework import serializers
from .models import (
    User,
    CustomerProfile,
    SupplierProfile,
    CustomerAddress,
    SupplierAddress,
)
from common.serializers import AddressSerializer


class CustomerAddressSerializer(AddressSerializer, serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = [
            "id",
            "nickname",
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
            "street",
            "city",
            "state",
            "country",
            "postal_code",
        ]


class NestedCustomerProfileSerializer(serializers.ModelSerializer):
    addresses = CustomerAddressSerializer(
        source="customer_address",
        many=True,
        required=False,
    )

    class Meta:
        model = CustomerProfile
        fields = ["addresses"]

    def validate_addresses(self, value):
        # Ensure only one address is marked primary
        primary_count = sum(addr.get('is_primary', False) for addr in value)
        if primary_count > 1:
            raise serializers.ValidationError("Only one address can be marked as primary.")
        return value

    def update(self, instance, validated_data):
        address_list = validated_data.get('addresses', [])
        # remove existing addresses and recreate with validated data
        instance.customer_address.all().delete()
        for addr in address_list:
            CustomerAddress.objects.create(customer=instance.user, **addr)
        return instance


class NestedSupplierProfileSerializer(serializers.ModelSerializer):
    addresses = SupplierAddressSerializer(
        source="supplier_addresses",
        many=True,
        required=False,
    )

    class Meta:
        model = SupplierProfile
        fields = ["addresses"]

    def update(self, instance, validated_data):
        address_list = validated_data.get('addresses', [])
        instance.supplier_addresses.all().delete()
        for addr in address_list:
            SupplierAddress.objects.create(supplier=instance.user, **addr)
        return instance


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "user_type"]


class UserSerializer(serializers.ModelSerializer):
    customer_profile = NestedCustomerProfileSerializer(required=False)
    supplier_profile = NestedSupplierProfileSerializer(required=False)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "user_type",
            "customer_profile",
            "supplier_profile",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        cust_data = validated_data.pop('customer_profile', None)
        supp_data = validated_data.pop('supplier_profile', None)
        user = User.objects.create_user(**validated_data)
        if cust_data:
            NestedCustomerProfileSerializer().update(user.customer_profile, cust_data)
        if supp_data:
            NestedSupplierProfileSerializer().update(user.supplier_profile, supp_data)
        return user

    def update(self, instance, validated_data):
        cust_data = validated_data.pop('customer_profile', None)
        supp_data = validated_data.pop('supplier_profile', None)
        user = super().update(instance, validated_data)
        if cust_data:
            NestedCustomerProfileSerializer().update(user.customer_profile, cust_data)
        if supp_data:
            NestedSupplierProfileSerializer().update(user.supplier_profile, supp_data)
        return user

class CustomerProfileSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()

    class Meta:
        model = CustomerProfile
        fields = ["user"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            NestedUserSerializer().update(instance.user, user_data)
        return super().update(instance, validated_data)

class SupplierProfileSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()

    class Meta:
        model = SupplierProfile
        fields = ["user"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            NestedUserSerializer().update(instance.user, user_data)
        return super().update(instance, validated_data)
