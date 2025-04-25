# payments/views.py
import stripe
from django.conf import settings
from django.http import HttpResponseServerError, HttpResponse
from django.shortcuts import redirect
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
@require_POST
def create_checkout_session(request):
    try:
        session = stripe.checkout.Session.create(
            line_items=[{
                "price": "price_1RHrbgEgX0iyXAwMOg05ARHa",
                "quantity": 1,
            }],
            mode="payment",
            success_url="http://localhost:8000/payments/success/",
            cancel_url="http://localhost:8000/payments/cancel/",
        )
        return redirect(session.url, code=303)
    except stripe.error.StripeError as e:
        return HttpResponseServerError(str(e))


def success(request):
    return HttpResponse("success")

def cancel(request):
    return HttpResponse("cancel")
