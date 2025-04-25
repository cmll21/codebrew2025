import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CreatePaymentIntent(APIView):
    def post(self, request):
        stripe.api_key = settings.STRIPE_API_KEY

        # you might pass amount/currency in the request body
        try:
            amount = int(request.data["amount"])
        except (KeyError, ValueError):
            return Response(
                {"error": "Please provide a valid integer amount in cents."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        currency = request.data.get("currency", "aud")
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            metadata={"user_id": request.user.id if request.user.is_authenticated else None},
        )
        return Response({"clientSecret": intent.client_secret})
