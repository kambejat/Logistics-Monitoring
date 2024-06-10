from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShipmentTrackingViewSet

router = DefaultRouter()
router.register(r'shipment-tracking', ShipmentTrackingViewSet, basename='shipment-tracking')

urlpatterns = [
    path('', include(router.urls)),
]
