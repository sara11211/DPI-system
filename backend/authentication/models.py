from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Personnel(models.Model):
    users = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True,  related_name='personnel')
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
        
class PersonnesContact(models.Model):
    id = models.IntegerField(primary_key=True)
    nom_contact = models.CharField(max_length=255, blank=True, null=True)
    prenom_contact = models.CharField(max_length=255, blank=True, null=True)
    numero_telephone = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'personnes_contact'
        
class Medecins(models.Model):
    id = models.IntegerField(primary_key=True)
    specialite = models.CharField(max_length=255, blank=True, null=True)
    personnel = models.ForeignKey('Personnel', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medecins'
        
        
class Dpis(models.Model):
    id = models.IntegerField(primary_key=True)
    nss = models.CharField(max_length=255, blank=True, null=True)
    nom = models.CharField(max_length=255, blank=True, null=True)
    prenom = models.CharField(max_length=255, blank=True, null=True)
    date_naissance = models.DateField(blank=True, null=True)
    adresse = models.CharField(max_length=255, blank=True, null=True)
    num_telephone = models.CharField(max_length=255, blank=True, null=True)
    medecins = models.ForeignKey('Medecins', models.DO_NOTHING, blank=True, null=True)
    personnes_contact = models.ForeignKey('PersonnesContact', models.DO_NOTHING, blank=True, null=True)
    users = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True)
    qr_url = models.CharField(max_length=255, blank=True, null=True)
    antecedents = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dpis'