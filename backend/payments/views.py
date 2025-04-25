import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from users.models import CustomerProfile

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    def post(self, request):
        try:
            # Validate input data
            amount = request.data.get("amount")
            customer_id = request.data.get("customer_id")

            if not amount or not customer_id:
                return Response({"error": "Amount and customer_id are required."}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch the customer profile
            try:
                customer = CustomerProfile.objects.get(id=customer_id)
            except CustomerProfile.DoesNotExist:
                return Response({"error": "Customer not found."}, status=status.HTTP_404_NOT_FOUND)

            # Create a PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=int(float(amount) * 100),  # Convert to cents
                currency="usd",
                payment_method_types=["card"],
            )

            # Save payment details
            Payment.objects.create(
                customer=customer,
                stripe_payment_intent_id=intent["id"],
                amount=amount,
                status="pending",
            )

            return Response({"client_secret": intent["client_secret"]}, status=status.HTTP_200_OK)
        except stripe.error.StripeError as e:
            return Response({"error": str(e.user_message)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
