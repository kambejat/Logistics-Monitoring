from django.db import models
from accounts.models import User


class InventoryMonitoring(models.Model):
    location = models.CharField(max_length=100)
    quantity_on_hand = models.IntegerField()
    quantity_on_order = models.IntegerField()
    reorder_point = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)
    notes = models.TextField(null=True, blank=True)
    updated_by = models.ForeignKey(User, related_name='updated_inventories', on_delete=models.CASCADE)

    def __str__(self):
        return f'Product {self.id} in {self.location}'

    class Meta:
        db_table = 'Inventories'
        ordering = ['-id']

