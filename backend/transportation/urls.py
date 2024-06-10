from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransportationEfficiencyViewSet

router = DefaultRouter()
router.register(r'transportation-efficiency', TransportationEfficiencyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
