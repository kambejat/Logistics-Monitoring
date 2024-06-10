from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import TransportationEfficiency
from .serializer import TransportationEfficiencySerializer


class TransportationEfficiencyViewSet(viewsets.ModelViewSet):
    queryset = TransportationEfficiency.objects.all()
    serializer_class = TransportationEfficiencySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)
