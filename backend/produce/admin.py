from django.contrib import admin

from .models import (
    ProduceCategory,
    ProduceType,
    ProduceItem,
)

admin.site.register(ProduceCategory)
admin.site.register(ProduceType)
admin.site.register(ProduceItem)

# Register your models here.
