import json
from decimal import Decimal
import stripe
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import get_object_or_404, redirect

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from orders.models import Cart
from orders.serializers import OrderSerializer
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
@require_POST
def create_checkout_session(request):
    try:
        payload = json.loads(request.body)
        # 1. grab & validate
        amount = payload.get("amount")
        currency = payload.get("currency", "aud").lower()
        name     = payload.get("product_name", "Total due")
        cart_id     = payload.get("cart")

        # ensure we got a number
        amount_cents = int(Decimal(str(amount)) * 100)
    except (ValueError, TypeError, json.JSONDecodeError):
        return HttpResponseBadRequest("Invalid payload")

    base_success = request.build_absolute_uri("/payments/success/")
    success_url = f"{base_success}?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = request.build_absolute_uri("/payments/cancel/")

    try:
        base = request.build_absolute_uri
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": currency,
                    "product_data": {"name": name},
                    "unit_amount": amount_cents,
                },
                "quantity": 1,
            }],
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "cart_id": cart_id,
            }
        )
        return JsonResponse({"sessionId": session.id})
    except stripe.error.StripeError as e:
        return HttpResponseServerError(str(e))

class PaymentSuccessView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        session_id = request.GET.get("session_id")
        if not session_id:
            return Response({"error":"session_id missing"}, status=status.HTTP_400_BAD_REQUEST)

        # 1. fetch the Stripe session
        session = stripe.checkout.Session.retrieve(session_id)

        # 2. pull cart info out of metadata
        cart = get_object_or_404(Cart, pk=session.metadata["cart_id"])

        # 3. perform checkout
        try:
            order = cart.checkout()
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # 4. return home
        return redirect("/")

def cancel(request):
    return redirect("/#/checkout")
