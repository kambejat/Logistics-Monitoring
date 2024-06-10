from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import WarehouseOperation
from .serializer import WarehouseOperationSerializer


class WarehouseOperationViewSet(viewsets.ModelViewSet):
    queryset = WarehouseOperation.objects.all()
    serializer_class = WarehouseOperationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            assigned_personnel=self.request.user,
            created_by=self.request.user,
            updated_by=self.request.user
        )

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
