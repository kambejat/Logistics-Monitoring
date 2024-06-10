from django.db import models

from accounts.models import User

# Create your models here.


class ShipmentTracking(models.Model):
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    current_location = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    expected_delivery_date = models.DateField()
    actual_delivery_date = models.DateField(null=True, blank=True)
    carrier_information = models.CharField(max_length=100)
    notes = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, related_name='created_shipments', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, related_name='updated_shipments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_archived = models.BooleanField(default=False)
    archived_by = models.ForeignKey(User, related_name='archived_shipments', on_delete=models.CASCADE, null=True, blank=True)
    un_archived_by = models.ForeignKey(User, related_name='un_archived_shipments', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'Shipment from {self.origin} to {self.destination}'

    class Meta:
        verbose_name_plural = 'Shipments'
        ordering = ['-id']
        db_table = 'Shipments'
