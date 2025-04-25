from rest_framework import serializers
from .models import User, CustomerProfile, SupplierProfile


class AddressFieldsMixin(serializers.Serializer):
    street = serializers.CharField(max_length=255, allow_blank=True, required=False, default="", allow_null=True)
    city = serializers.CharField(max_length=100, allow_blank=True, required=False, default="", allow_null=True)
    state = serializers.CharField(max_length=100, allow_blank=True, required=False, default="", allow_null=True)
    country = serializers.CharField(max_length=100, allow_blank=True, required=False, default="", allow_null=True)
    postal_code = serializers.CharField(max_length=20, allow_blank=True, required=False, default="", allow_null=True)


class NestedCustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ["nickname"]


class NestedSupplierProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierProfile
        fields = []


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "user_type"]


class UserSerializer(AddressFieldsMixin, serializers.ModelSerializer):
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
            "street",
            "city",
            "state",
            "country",
            "postal_code",
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
        fields = ["user", "nickname"]

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
