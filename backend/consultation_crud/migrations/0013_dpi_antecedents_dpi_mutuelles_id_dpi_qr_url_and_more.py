# Generated by Django 5.1.4 on 2024-12-26 13:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consultation_crud', '0012_alter_dpi_medecin'),
    ]

    operations = [
        migrations.AddField(
            model_name='dpi',
            name='antecedents',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='dpi',
            name='mutuelles_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='dpi',
            name='qr_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='dpi',
            name='medecin',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='consultation_crud.medecin'),
        ),
        migrations.AlterModelTable(
            name='medecin',
            table='medecins',
        ),
    ]
