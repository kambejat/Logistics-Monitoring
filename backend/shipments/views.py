from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ShipmentTracking
from .serializer import ShipmentTrackingSerializer


class ShipmentTrackingViewSet(viewsets.ModelViewSet):
    queryset = ShipmentTracking.objects.all()
    serializer_class = ShipmentTrackingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, updated_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
