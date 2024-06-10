from rest_framework import serializers
from accounts.serializer import UserSerializer
from .models import InventoryMonitoring


class InventoryMonitoringSerializer(serializers.ModelSerializer):
    updated_by = UserSerializer(read_only=True)

    class Meta:
        model = InventoryMonitoring
        fields = [
            'id',
            'location',
            'quantity_on_hand',
            'quantity_on_order',
            'reorder_point',
            'last_updated',
            'notes',
            'updated_by'
        ]
