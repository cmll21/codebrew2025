# payments/views.py
import stripe
from django.conf import settings
from django.http import HttpResponseServerError, HttpResponse, JsonResponse
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
            success_url=f"{settings.HOST}/payments/success/",
            cancel_url=f"{settings.HOST}/payments/cancel/",
        )
        return JsonResponse({"sessionId": session.id})
    except stripe.error.StripeError as e:
        return HttpResponseServerError(str(e))



def success(request):
    return HttpResponse("success")

def cancel(request):
    return HttpResponse("cancel")
