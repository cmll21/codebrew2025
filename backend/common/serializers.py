from rest_framework import serializers


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

class AddressSerializer(serializers.Serializer):
    street = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    country = serializers.CharField()
    postal_code = serializers.CharField()
