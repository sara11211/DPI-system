from django.db import models

class ContactPerson(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=10)
    patient = models.ForeignKey(
        'Patient', 
        on_delete=models.CASCADE, 
        related_name='contact_persons'
    )  # One-to-Many relation with Patient

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class Patient(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    dateNaissance = models.DateField()
    nss = models.CharField(max_length=15, unique=True)  # Numéro unique pour chaque patient 
    addresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class DPI(models.Model):
    patient = models.OneToOneField(
        Patient, 
        on_delete=models.CASCADE, 
        related_name='dpi'
    )  # One-to-One relation with Patient

    def __str__(self):
        return f"DPI for {self.patient.nom} {self.patient.prenom}"
