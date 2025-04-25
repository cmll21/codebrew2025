# payments/urls.py
from django.urls import path
from .views import create_checkout_session, success, cancel

urlpatterns = [
    path("create-checkout-session/", create_checkout_session, name="create-checkout-session"),
    path("success/", success, name="success"),
    path("cancel/", cancel, name="cancel"),
]

