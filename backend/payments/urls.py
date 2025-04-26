# payments/urls.py
from django.urls import path
from .views import create_checkout_session, PaymentSuccessView, cancel

urlpatterns = [
    path("create-checkout-session/", create_checkout_session, name="create-checkout-session"),
    path("success/", PaymentSuccessView.as_view(), name="payment-success"),
    path("cancel/", cancel, name="cancel"),
]

