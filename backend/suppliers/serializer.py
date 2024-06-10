from rest_framework import serializers
from accounts.serializer import UserSerializer
from .models import SupplierPerformance


class SupplierPerformanceSerializer(serializers.ModelSerializer):
    updated_by = UserSerializer(read_only=True)

    class Meta:
        model = SupplierPerformance
        fields = [
            'id', 'supplier_name', 'order_volume', 'on_time_delivery_rate',
            'quality_metrics', 'lead_times', 'notes', 'updated_by'
        ]
