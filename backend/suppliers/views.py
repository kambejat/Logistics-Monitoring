from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SupplierPerformance
from .serializer import SupplierPerformanceSerializer


class SupplierPerformanceViewSet(viewsets.ModelViewSet):
    queryset = SupplierPerformance.objects.all()
    serializer_class = SupplierPerformanceSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
