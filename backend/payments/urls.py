from django.urls import path
from .views import StripeWebhookView

urlpatterns = [
    path("stripe/webhook/", StripeWebhookView.as_view(), name="stripe-webhook"),
]
