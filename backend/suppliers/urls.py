from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierPerformanceViewSet

router = DefaultRouter()
router.register(r'supplier-performance', SupplierPerformanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
