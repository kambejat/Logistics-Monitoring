from django.db import models
from accounts.models import User


class TransportationEfficiency(models.Model):
    vehicle_id = models.CharField(max_length=255)
    fuel_consumption = models.DecimalField(max_digits=10, decimal_places=2)
    vehicle_utilization = models.DecimalField(max_digits=5, decimal_places=2)
    average_delivery_time = models.IntegerField()
    route_efficiency = models.DecimalField(max_digits=5, decimal_places=2)
    notes = models.TextField(null=True, blank=True)
    updated_by = models.ForeignKey(User, related_name='updated_transportations', on_delete=models.CASCADE)

    def __str__(self):
        return f'Record {self.id} for Vehicle {self.vehicle_id}'

    class Meta:
        db_table = 'TransportationEfficiency'
