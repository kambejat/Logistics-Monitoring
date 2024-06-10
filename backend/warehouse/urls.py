from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WarehouseOperationViewSet

router = DefaultRouter()
router.register(r'warehouse-operations', WarehouseOperationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
