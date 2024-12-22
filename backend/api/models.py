from django.db import models
#from django.contrib.auth.models import User --> don't want to change the bdd schema again

# defined User (didn't use the built in User model)
class User(models.Model):
    email = models.EmailField(max_length=255, blank=True, null=True)
    nss = models.CharField(max_length=255, blank=True, null=True)
    mdp = models.CharField(max_length=255)
    TYPE_PERSONNEL_CHOICES = [
        ('Personnel', 'Personnel'),
        ('Patient', 'Patient'),
    ]
    type_personnel = models.CharField(max_length=10, choices=TYPE_PERSONNEL_CHOICES)
    cree_le = models.DateTimeField(auto_now_add=True)  
    
    class Meta:
        app_label = 'api'
        db_table = 'users'
        managed = False 

    def __str__(self):
        return self.email if self.email else f"User {self.id}"
    
    
class Mutuelle(models.Model):
    nom = models.CharField(max_length=255)
    num_adherent = models.CharField(max_length=50)
    type_couverture = models.CharField(max_length=100)

    class Meta:
        app_label = 'api'
        db_table = 'mutuelles'
        managed = False 

    def __str__(self):
        return f"{self.nom} - {self.num_adherent}"

    
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
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
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
    mutuelles = models.ForeignKey(Mutuelle, on_delete=models.CASCADE, null=True, related_name='dpis') # dpi can not have a mutuelle
    medecins = models.ForeignKey(Medecin, on_delete=models.CASCADE,null=False,  related_name='dpis') # dpi must have a medecin
    personnes_contact = models.ForeignKey(PersonneContact, on_delete=models.CASCADE, null=False, related_name='dpis') # dpi must have a personne contact
    users = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name='dpis') 
    # dpi must have a user
    qr_url = models.CharField(max_length=255)
    antecedents = models.TextField()

    class Meta:
        app_label = 'api'
        db_table = 'dpis'
        managed = False

    def __str__(self):
        return f"{self.nss} - {self.nom} {self.prenom}"
