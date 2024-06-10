from rest_framework import serializers
from accounts.serializer import UserSerializer
from .models import WarehouseOperation


class WarehouseOperationSerializer(serializers.ModelSerializer):
    assigned_personnel = UserSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)
    updated_by = UserSerializer(read_only=True)

    class Meta:
        model = WarehouseOperation
        fields = [
            'id', 'task', 'assigned_personnel', 'start_time', 'end_time',
            'status', 'notes', 'created_by', 'updated_by'
        ]
