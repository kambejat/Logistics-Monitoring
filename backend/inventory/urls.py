from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryMonitoringViewSet

router = DefaultRouter()
router.register(r'inventory-monitoring', InventoryMonitoringViewSet, basename='inventory-monitoring')

urlpatterns = [
    path('', include(router.urls)),
]

