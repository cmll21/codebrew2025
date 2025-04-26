import json
from decimal import Decimal
import stripe
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

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

        # ensure we got a number
        amount_cents = int(Decimal(str(amount)) * 100)
    except (ValueError, TypeError, json.JSONDecodeError):
        return HttpResponseBadRequest("Invalid payload")

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
            success_url=base("/payments/success/"),
            cancel_url = base("/payments/cancel/"),
        )
        return JsonResponse({"sessionId": session.id})
    except stripe.error.StripeError as e:
        return HttpResponseServerError(str(e))



def success(request):
    return HttpResponse("success")

def cancel(request):
    return HttpResponse("cancel")
