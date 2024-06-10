from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import InventoryMonitoring
from .serializer import InventoryMonitoringSerializer


class InventoryMonitoringViewSet(viewsets.ModelViewSet):
    queryset = InventoryMonitoring.objects.all()
    serializer_class = InventoryMonitoringSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)
