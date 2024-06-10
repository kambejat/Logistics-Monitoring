from rest_framework import serializers
from accounts.serializer import UserSerializer
from .models import ShipmentTracking


class ShipmentTrackingSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    updated_by = UserSerializer(read_only=True)

    class Meta:
        model = ShipmentTracking
        fields = [
            'id', 'origin', 'destination', 'current_location', 'status', 'expected_delivery_date',
            'actual_delivery_date', 'carrier_information', 'notes', 'created_by', 'updated_by',
            'created_at', 'updated_at', 'is_archived', 'archived_by', 'un_archived_by'
        ]

