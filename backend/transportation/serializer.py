from rest_framework import serializers
from accounts.serializer import UserSerializer
from .models import TransportationEfficiency


class TransportationEfficiencySerializer(serializers.ModelSerializer):
    updated_by = UserSerializer(read_only=True)  # Read-only, as the user will be set automatically

    class Meta:
        model = TransportationEfficiency
        fields = [
            'id', 'vehicle_id', 'fuel_consumption', 'vehicle_utilization',
            'average_delivery_time', 'route_efficiency', 'notes', 'updated_by'
        ]
