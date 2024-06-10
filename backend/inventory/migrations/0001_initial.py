# Generated by Django 5.0.6 on 2024-06-03 16:48

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='InventoryMonitoring',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=100)),
                ('quantity_on_hand', models.IntegerField()),
                ('quantity_on_order', models.IntegerField()),
                ('reorder_point', models.IntegerField()),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('updated_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='updated_inventories', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Inventories',
                'ordering': ['-id'],
            },
        ),
    ]
