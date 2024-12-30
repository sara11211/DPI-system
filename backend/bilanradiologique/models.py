from django.db import models
from django.contrib.auth.models import User

class Personnel(models.Model):
    nom = models.CharField(max_length=255, blank=True, null=True)
    prenom = models.CharField(max_length=255, blank=True, null=True)
    fonction = models.CharField(max_length=23, blank=True, null=True)
    users = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True, related_name='personnel_users')

    class Meta:
        managed = False
        db_table = 'personnel'


class Dpis(models.Model):
    nss = models.BigIntegerField(blank=True, null=True)
    nom = models.CharField(max_length=255, blank=True, null=True)
    prenom = models.CharField(max_length=255, blank=True, null=True)
    date_naissance = models.DateField(blank=True, null=True)
    adresse = models.CharField(max_length=255, blank=True, null=True)
    num_telephone = models.CharField(max_length=255, blank=True, null=True)
    medecins = models.ForeignKey('Medecins', models.DO_NOTHING, blank=True, null=True)
    personnes_contact = models.ForeignKey('PersonnesContact', models.DO_NOTHING, blank=True, null=True)
    qr_url = models.CharField(max_length=255, blank=True, null=True)
    antecedents = models.CharField(max_length=255, blank=True, null=True)
    users = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True, related_name='dpis_users')

    class Meta:
        managed = False
        db_table = 'dpis'


class BilansRadiologiques(models.Model):
    synthese_bilan_radio = models.TextField(blank=True, null=True)
    date_radiologie = models.DateField(blank=True, null=True)
    type_radiologie = models.CharField(max_length=255, blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True)
    radiologues = models.ForeignKey('Radiologues', models.DO_NOTHING, blank=True, null=True)
    consultations = models.ForeignKey('Consultations', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bilans_radiologiques'


class Medecins(models.Model):
    specialite = models.CharField(max_length=255, blank=True, null=True)
    personnel = models.ForeignKey('Personnel', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medecins'

class ResumesConsultations(models.Model):
    diagnostic = models.TextField(blank=True, null=True)
    symptomes = models.TextField(blank=True, null=True)
    mesure = models.TextField(blank=True, null=True)
    antecedents = models.TextField(blank=True, null=True)
    info_supp = models.TextField(blank=True, null=True)
    date_prochaine_consultation = models.DateField(blank=True, null=True)
    dpis_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'resumes_consultations'
        
class Consultations(models.Model):
    dpis = models.ForeignKey('Dpis', models.DO_NOTHING, blank=True, null=True)
    resume_consultation = models.ForeignKey('ResumesConsultations', models.DO_NOTHING, blank=True, null=True)
    date_consultation = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'consultations'


class PersonnesContact(models.Model):
    nom_contact = models.CharField(max_length=255, blank=True, null=True)
    prenom_contact = models.CharField(max_length=255, blank=True, null=True)
    numero_telephone = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'personnes_contact'


class Radiologues(models.Model):
    personnel = models.ForeignKey(Personnel, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'radiologues'
