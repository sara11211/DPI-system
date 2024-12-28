from django.db import models
from django.contrib.auth.models import User 

   

class Personnel(models.Model):
    users = models.ForeignKey(User, on_delete=models.CASCADE)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    fonction = models.CharField(max_length=255)

    class Meta:
        app_label = 'api'
        db_table = 'personnel' 
        managed = False 

    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.fonction})"
    

class Medecin(models.Model):
    specialite = models.CharField(max_length=255)
    personnel = models.ForeignKey(Personnel, on_delete=models.CASCADE)

    class Meta:
        app_label = 'api'
        db_table = 'medecins' 
        managed = False

    def __str__(self):
        return f"Dr. {self.specialite} - {self.personnel.nom}"


class PersonneContact(models.Model):
    nom_contact = models.CharField(max_length=255)
    prenom_contact = models.CharField(max_length=255)
    numero_telephone = models.CharField(max_length=15)

    class Meta:
        app_label = 'api'
        db_table = 'personnes_contact'
        managed = False

    def __str__(self):
        return f"{self.prenom} {self.nom}"


class DPI(models.Model):
    nss = models.IntegerField()
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=255)
    num_telephone = models.CharField(max_length=20)
    medecins = models.ForeignKey(Medecin, on_delete=models.CASCADE,null=False,  related_name='dpis') # dpi must have a medecin
    personnes_contact = models.ForeignKey(PersonneContact, on_delete=models.CASCADE, null=False, related_name='dpis') # dpi must have a personne contact
    users = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name='dpis')  # dpi must have a user
    qr_url = models.CharField(max_length=255)
    antecedents = models.TextField()

    class Meta:
        app_label = 'api'
        db_table = 'dpis'
        managed = False

    def __str__(self):
        return f"{self.nss} - {self.nom} {self.prenom}"


    
class Mutuelle(models.Model):
    nom_mutuelle = models.CharField(max_length=255)
    num_adherent = models.CharField(max_length=50)
    type_couverture = models.CharField(max_length=100)
    dpis = models.ForeignKey(DPI, on_delete=models.CASCADE,null=False,  related_name='dpis') # Mutuelle must have dpi

    class Meta:
        app_label = 'api'
        db_table = 'mutuelles'
        managed = False 

    def __str__(self):
        return f"{self.nom_mutuelle} - {self.num_adherent}"

    