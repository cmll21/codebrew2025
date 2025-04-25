import stripe
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Payment
from users.models import CustomerProfile
from decimal import Decimal



DEFAULT_CURRENCY = "aud"

class CreatePaymentIntentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amt = request.data.get("amount")
        if not amt:
            return Response({"error": "Amount is required."}, 400)

        try:
            amount = Decimal(amt)
            if amount <= 0:
                raise ValueError
        except:
            return Response({"error": "Invalid amount."}, 400)

        # assume CustomerProfile is one-to-one with request.user
        customer = get_object_or_404(CustomerProfile, user=request.user)

        # record Stripe customer ID
        stripe_customer_id = customer.stripe_customer_id
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),
            currency=DEFAULT_CURRENCY,
            customer=stripe_customer_id,
            metadata={"local_customer_id": customer.id},
            payment_method_types=["card"],
        )

        Payment.objects.create(
            customer=customer,
            stripe_payment_intent_id=intent.id,
            amount=amount,
            status="pending",
        )
        return Response({"client_secret": intent.client_secret})

class StripeWebhookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        payload = request.body
        sig_header = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except (ValueError, stripe.error.SignatureVerificationError):
            return Response(status=400)

        intent = event['data']['object']
        payment = Payment.objects.filter(
            stripe_payment_intent_id=intent['id']
        ).first()
        if not payment:
            return Response(status=404)

        if event['type'] == 'payment_intent.succeeded':
            payment.status = 'completed'
        elif event['type'] == 'payment_intent.payment_failed':
            payment.status = 'failed'
        payment.save()
        return Response(status=200)
