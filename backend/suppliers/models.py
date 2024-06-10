from django.db import models
from accounts.models import User


class SupplierPerformance(models.Model):
    supplier_name = models.CharField(max_length=100)
    order_volume = models.IntegerField()
    on_time_delivery_rate = models.DecimalField(max_digits=5, decimal_places=2)
    quality_metrics = models.CharField(max_length=100)
    lead_times = models.IntegerField()
    notes = models.TextField(null=True, blank=True)
    updated_by = models.ForeignKey(User, related_name='updated_suppliers', on_delete=models.CASCADE)

    def __str__(self):
        return self.supplier_name

    class Meta:
        db_table = 'Suppliers'

