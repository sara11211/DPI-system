from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Personnel(models.Model):
    users = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    nom = models.CharField(max_length=255, blank=True, null=True)
    prenom = models.CharField(max_length=255, blank=True, null=True)
    fonction = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'personnel'
        
class Infirmiers(models.Model):
    personnel = models.ForeignKey('Personnel', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'infirmiers'


class Laborantins(models.Model):
    personnel = models.ForeignKey('Personnel', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'laborantins'


class Medecins(models.Model):
    specialite = models.CharField(max_length=255, blank=True, null=True)
    personnel = models.ForeignKey('Personnel', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medecins'
        
class Radiologues(models.Model):
    personnel = models.ForeignKey(Personnel, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'radiologues'