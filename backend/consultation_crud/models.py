#from dpi_crud.models import Dpi

from django.db import models
from django.contrib.auth import get_user_model
from  authentication.models import Dpis,Infirmiers



# Modèle de la consultation
class Consultation(models.Model):
    patient = models.ForeignKey(Dpis, on_delete=models.CASCADE, db_column='dpis_id')  # Nom explicite de la colonne
    resume_consultation = models.ForeignKey('ResumeConsultation', on_delete=models.CASCADE, null=True, blank=True,db_column='resume_consultation_id')
    date_consultation = models.DateField()
   
    class Meta:
        db_table = 'consultations'  # Associe ce modèle à la table 'consultations' dans la BDD
        managed = False  
    def __str__(self):
        return f"Consultation pour {self.patient.nom} {self.patient.prenom}"

# Modèle pour le résumé de consultation (pour lier avec la Consultation)
class ResumeConsultation(models.Model):
    diagnostic = models.TextField(null=True, blank=True)
    symptomes = models.TextField(null=True, blank=True)
    mesure=models.TextField(null=True, blank=True) 
    antecedents = models.TextField(null=True, blank=True)
    info_supp = models.TextField(null=True, blank=True)
    date_prochaine_consultation = models.DateField()
    patient = models.ForeignKey(Dpis, on_delete=models.CASCADE, db_column='dpis_id')

    class Meta:
        db_table = 'resumes_consultations'  
        managed = False  
    def __str__(self):

        return f"Résumé de consultation pour {self.patient.nom} {self.patient.prenom} "


# Modèle Ordonnance
class Ordonnance(models.Model):

    consultation = models.ForeignKey(Consultation, on_delete=models.CASCADE, db_column='consultations_id')

    # Statut de l'ordonnance : validée ou refusée
    ETAT_CHOICES = [
        ('Validee', 'Validée'),
        ('En cours de validation', 'En cours de validation'),
        ('Refusee', 'Refusée'),
        
    ]
    etat_ordonnance = models.CharField(
        max_length=255,
        choices=ETAT_CHOICES,
        default='En cours de validation', 
    )


    class Meta:
        db_table = 'ordonnances'  # Associe ce modèle à la table 'ordonnances' dans la BDD
        managed = False  
    def __str__(self):
        return f"Ordonnance pour {self.consultation.patient.nom} {self.consultation.patient.prenom} - État: {self.etat_ordonnance}"


class Medicament(models.Model):
    nom_medicament= models.CharField(max_length=255)
    dose = models.CharField(max_length=255)
    duree = models.IntegerField()
    ordonnance = models.ForeignKey(Ordonnance, db_column='ordonnances_id', on_delete=models.CASCADE, related_name='medicaments')

    class Meta:
        db_table = 'medicaments'  # Associe ce modèle à la table 'medicaments' dans la BDD
        managed = False  

    def __str__(self):
        return f"Medicament: {self.nom} {self.dose} mg {self.duree} jours"
    


class SoinsInfirmier(models.Model):
    infirmiers_id = models.ForeignKey(
        Infirmiers, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        db_column='infirmiers_id'
    )
    date_soin = models.DateField()
    description_soin = models.TextField()
    patient = models.ForeignKey(Dpis, on_delete=models.CASCADE, db_column='patients_id')

    class Meta:
        db_table = 'soins_infirmier'
        managed = False  

    def __str__(self):
        return f"Soins infirmiers pour {self.patient.nom} {self.patient.prenom}"
