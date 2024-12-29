#from dpi_crud.models import Dpi

from django.db import models


# Modèle temporaire de DPI pour les tests
class User(models.Model):
    email = models.CharField(max_length=255)  
    nss = models.CharField(max_length=255, unique=True)  
    mdp = models.CharField(max_length=255)
    
    TYPE_PERSONNEL_CHOICES = [
        ('Personnel', 'Personnel'),
        ('Patient', 'Patient'),
    ]
    type_personnel = models.CharField(max_length=10, choices=TYPE_PERSONNEL_CHOICES)  
    
    cree_le = models.DateField(auto_now_add=True)  

    class Meta:
        db_table = 'users'
        managed = False
    def __str__(self):
        # Ajustement pour afficher l'email et le NSS
        return f"{self.email} - NSS: {self.nss}"

class Personnel(models.Model): 
    user = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        db_column='users_id'
    )
    nom = models.CharField(max_length=255, null=True, blank=True)
    prenom = models.CharField(max_length=255, null=True, blank=True)
    
    FONCTION_CHOICES = [
        ('Medecin', 'Médecin'),
        ('Personnel administratif', 'Personnel administratif'),
        ('Laborantin', 'Laborantin'),
        ('Pharmacien', 'Pharmacien'),
        ('Radiologue', 'Radiologue'),
        ('Infirmier', 'Infirmier'),
    ]
    fonction = models.CharField(
        max_length=25,  # Longueur maximale basée sur les options
        choices=FONCTION_CHOICES,
        null=True, 
    )

    class Meta:
        db_table = 'personnel'
        managed = False
    def __str__(self):
        return f"{self.nom} {self.prenom} - {self.fonction}"


class Medecin(models.Model):
    specialite = models.CharField(max_length=255, null=True, blank=True)  # La spécialité peut être vide
    personnel = models.ForeignKey(
        Personnel, 
        on_delete=models.CASCADE, 
        db_column='personnel_id'
    )

    class Meta:
        db_table = 'medecins'
        managed = False
    def __str__(self):
        return f"{self.personnel.nom} {self.personnel.prenom} - {self.specialite}"


class Dpi(models.Model):
    nss = models.CharField(max_length=255, null=True, unique=True)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    date_naissance = models.DateField(null=True, blank=True)
    adresse = models.CharField(max_length=255, null=True, blank=True)
    num_telephone = models.CharField(max_length=255, null=True, blank=True)
    medecin = models.ForeignKey(
        Medecin, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        db_column='medecins_id'
    )
    user = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        db_column='users_id'
    )

    class Meta:
        db_table = 'dpis'
        managed = False
    def __str__(self):
        return f"{self.nom} {self.prenom} - {self.nss}"


# Modèle de la consultation
class Consultation(models.Model):
    patient = models.ForeignKey(Dpi, on_delete=models.CASCADE, db_column='dpis_id')  # Nom explicite de la colonne
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
    patient = models.ForeignKey(Dpi, on_delete=models.CASCADE, db_column='dpis_id')

    class Meta:
        db_table = 'resumes_consultations'  
        managed = False  
    def __str__(self):

        return f"Résumé de consultation pour {self.patient.nom} {self.patient.prenom} "


# Modèle Ordonnance
class Ordonnance(models.Model):

    consultation = models.ForeignKey('Consultation', on_delete=models.CASCADE, db_column='consultations_id')

    # Statut de l'ordonnance : validée ou refusée
    ETAT_CHOICES = [
        ('Validee', 'Validée'),
        ('En cours de validation', 'En cours de validation'),
        ('Refusee', 'Refusée'),
        
    ]
    etat_ordonnance = models.CharField(
        max_length=255,
        choices=ETAT_CHOICES,
        default='Refusee',  # L'ordonnance est refusée par défaut
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
    ordonnance = models.ForeignKey('Ordonnance', db_column='ordonnances_id', on_delete=models.CASCADE, related_name='medicaments')

    class Meta:
        db_table = 'medicaments'  # Associe ce modèle à la table 'medicaments' dans la BDD
        managed = False  

    def __str__(self):
        return f"Medicament: {self.nom} {self.dose} mg {self.duree} jours"
    
class Infirmier(models.Model):
    personnel = models.ForeignKey(
        Personnel, 
        on_delete=models.CASCADE, 
        db_column='personnel_id'
    )

    class Meta:
        db_table = 'infirmiers'
        managed = False     

    def __str__(self):
        return f"Infirmier: {self.personnel.nom} {self.personnel.prenom}"


class SoinsInfirmier(models.Model):
    infirmiers_id = models.ForeignKey(
        Infirmier, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        db_column='infirmiers_id'
    )
    date_soin = models.DateField()
    description_soin = models.TextField()
    patient = models.ForeignKey(Dpi, on_delete=models.CASCADE, db_column='patients_id')

    class Meta:
        db_table = 'soins_infirmier'
        managed = False  

    def __str__(self):
        return f"Soins infirmiers pour {self.patient.nom} {self.patient.prenom}"
