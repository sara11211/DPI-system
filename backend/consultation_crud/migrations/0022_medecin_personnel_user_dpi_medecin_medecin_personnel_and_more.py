# Generated by Django 5.1.4 on 2024-12-26 16:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consultation_crud', '0021_remove_dpi_medecin_remove_personnel_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Medecin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specialite', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'medecins',
            },
        ),
        migrations.CreateModel(
            name='Personnel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(blank=True, max_length=255, null=True)),
                ('prenom', models.CharField(blank=True, max_length=255, null=True)),
                ('fonction', models.CharField(choices=[('Medecin', 'Médecin'), ('Personnel administratif', 'Personnel administratif'), ('Laborantin', 'Laborantin'), ('Pharmacien', 'Pharmacien'), ('Radiologue', 'Radiologue'), ('Infirmier', 'Infirmier')], max_length=25, null=True)),
            ],
            options={
                'db_table': 'personnel',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=255)),
                ('nss', models.CharField(max_length=255, unique=True)),
                ('mdp', models.CharField(max_length=255)),
                ('type_personnel', models.CharField(choices=[('Personnel', 'Personnel'), ('Patient', 'Patient')], max_length=10)),
                ('cree_le', models.DateField(auto_now_add=True)),
            ],
            options={
                'db_table': 'users',
            },
        ),
        migrations.AddField(
            model_name='dpi',
            name='medecin',
            field=models.ForeignKey(blank=True, db_column='medecins_id', null=True, on_delete=django.db.models.deletion.SET_NULL, to='consultation_crud.medecin'),
        ),
        migrations.AddField(
            model_name='medecin',
            name='personnel',
            field=models.ForeignKey(db_column='personnel_id', on_delete=django.db.models.deletion.CASCADE, to='consultation_crud.personnel'),
        ),
        migrations.AddField(
            model_name='personnel',
            name='user',
            field=models.ForeignKey(db_column='users_id', null=True, on_delete=django.db.models.deletion.SET_NULL, to='consultation_crud.user'),
        ),
        migrations.AddField(
            model_name='dpi',
            name='user',
            field=models.ForeignKey(blank=True, db_column='users_id', null=True, on_delete=django.db.models.deletion.SET_NULL, to='consultation_crud.user'),
        ),
    ]
