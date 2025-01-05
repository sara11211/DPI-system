# Generated by Django 5.1.4 on 2024-12-26 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consultation_crud', '0023_remove_consultation_bilans_biologiques_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicament',
            name='nom',
        ),
        migrations.AddField(
            model_name='medicament',
            name='nom_medicament',
            field=models.CharField(default='Inconnu', max_length=255),
            preserve_default=False,
        ),
    ]
