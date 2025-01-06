from django.db import models
from django.contrib.auth.models import User


class Personnel(models.Model):
    id = models.IntegerField(primary_key=True)
    users = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True,related_name='personel')
    nom = models.CharField(max_length=255, blank=True, null=True)
    prenom = models.CharField(max_length=255, blank=True, null=True)
    fonction = models.CharField(max_length=23, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'personnel'
        
class Laborantins(models.Model):
    id = models.IntegerField(primary_key=True)
    personnel = models.ForeignKey('Personnel', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'laborantins'

class Medecins(models.Model):
    id = models.IntegerField(primary_key=True)
    specialite = models.CharField(max_length=255, blank=True, null=True)
    personnel = models.ForeignKey('Personnel', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'medecins'
        
class PersonnesContact(models.Model):
    id = models.IntegerField(primary_key=True)
    nom_contact = models.CharField(max_length=255, blank=True, null=True)
    prenom_contact = models.CharField(max_length=255, blank=True, null=True)
    numero_telephone = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'personnes_contact'

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
    users = models.ForeignKey(User, models.DO_NOTHING, blank=True, null=True,related_name='dossierp')
    qr_url = models.CharField(max_length=255, blank=True, null=True)
    antecedents = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dpis'
        
class ResumesConsultations(models.Model):
    id = models.IntegerField(primary_key=True)
    diagnostic = models.TextField(blank=True, null=True)
    symptomes = models.TextField(blank=True, null=True)
    mesure = models.TextField(blank=True, null=True)
    antecedents = models.TextField(blank=True, null=True)
    info_supp = models.TextField(blank=True, null=True)
    date_prochaine_consultation = models.DateField(blank=True, null=True)
    dpis_id = models.IntegerField(blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'resumes_consultations'  # Specify the exact table name in the database

class Consultations(models.Model):
    id = models.IntegerField(primary_key=True)
    dpis = models.ForeignKey('Dpis', models.DO_NOTHING, blank=True, null=True)
    resume_consultation = models.ForeignKey('ResumesConsultations', models.DO_NOTHING, blank=True, null=True)
    date_consultation = models.DateField(blank=True, null=True)
    class Meta:
        managed = False
        db_table = 'consultations'  # Specify the exact table name in the database


class AnalysesBiologiques(models.Model):
    nom_analyse = models.CharField(max_length=255, blank=True, null=True)
    quantite = models.CharField(max_length=255, blank=True, null=True)
    unite = models.CharField(max_length=255, blank=True, null=True)
    bilan_biologique = models.ForeignKey('BilansBiologiques', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'analyses_biologiques'

class BilansBiologiques(models.Model):
    synthese_bilan_bio = models.TextField(blank=True, null=True)
    date_bilan = models.DateField(blank=True, null=True)
    laborantins = models.ForeignKey('Laborantins', models.DO_NOTHING, blank=True, null=True)
    consultations = models.ForeignKey('Consultations', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bilans_biologiques'
        
class GraphiquesTendances(models.Model):
    id = models.IntegerField(primary_key=True)
    laborantins = models.ForeignKey('Laborantins', models.DO_NOTHING, blank=True, null=True)
    date_graphique = models.DateField(blank=True, null=True)
    url_graphique = models.CharField(max_length=255, blank=True, null=True)
    dpis = models.ForeignKey('Dpis', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'graphiques_tendances'
