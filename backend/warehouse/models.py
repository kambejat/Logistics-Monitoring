from django.db import models
from accounts.models import User


class WarehouseOperation(models.Model):
    task = models.CharField(max_length=100)
    assigned_personnel = models.ForeignKey(User, related_name='assigned_operations', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=50)
    notes = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(User, related_name='created_operations', on_delete=models.CASCADE)
    updated_by = models.ForeignKey(User, related_name='updated_operations', on_delete=models.CASCADE)

    def __str__(self):
        return f'Operation {self.id} - {self.task}'

    class Meta:
        verbose_name = 'Warehouse Operation'
        verbose_name_plural = 'Warehouse Operations'
        db_table = 'Warehouse'
