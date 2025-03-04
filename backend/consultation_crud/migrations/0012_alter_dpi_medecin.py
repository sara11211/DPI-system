# Generated by Django 5.1.4 on 2024-12-26 13:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consultation_crud', '0011_alter_dpi_medecin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dpi',
            name='medecin',
            field=models.ForeignKey(blank=True, db_column='medecin_id', null=True, on_delete=django.db.models.deletion.CASCADE, to='consultation_crud.medecin'),
        ),
    ]
