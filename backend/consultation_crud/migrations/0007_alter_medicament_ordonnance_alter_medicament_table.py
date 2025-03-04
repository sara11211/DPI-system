# Generated by Django 5.1.4 on 2024-12-24 14:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consultation_crud', '0006_alter_medicament_dose'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicament',
            name='ordonnance',
            field=models.ForeignKey(db_column='ordonnances_id', on_delete=django.db.models.deletion.CASCADE, to='consultation_crud.ordonnance'),
        ),
        migrations.AlterModelTable(
            name='medicament',
            table='medicaments',
        ),
    ]
