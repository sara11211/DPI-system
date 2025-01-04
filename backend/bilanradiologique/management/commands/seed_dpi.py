from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from ...models import Mutuelles, Dpis, PersonnesContact,Consultations,ResumesConsultations,Medecins
from faker import Faker
import random


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        fake = Faker()
        medecins_ids = Medecins.objects.values_list('id', flat=True)
        medecins_ids_list = list(medecins_ids)
        for i in range(20):
            contact = PersonnesContact.objects.create(
                nom_contact = fake.name().split(' ')[0],
                prenom_contact = fake.name().split(' ')[1],
                numero_telephone = fake.phone_number()
            )
            username = fake.user_name()
            email = fake.email()
            password = "pbkdf2_sha256$870000$KcuBL8LaMZ2G60dOeCEKbU$8uKjOGrsVOssLmgQ7d9VCKHiSENYe/ETkapUkeL8cdc="

            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password
                )
                random_medecin_id = random.choice(medecins_ids_list)
                dpi = Dpis.objects.create(
                    nss = fake.random_number(digits=12),
                    nom=fake.name().split(' ')[0],
                    prenom=fake.name().split(' ')[1],
                    date_naissance = fake.date(),
                    adresse = fake.address(),
                    num_telephone = fake.phone_number(),
                    medecins_id = random_medecin_id,
                    personnes_contact_id = contact.id,
                    qr_url = '',
                    antecedents = 'antecedents',
                    users_id = user.id
                )
                
                Mutuelles.objects.create(
                    nom_mutuelle = 'MNF',
                    type_couverture = 'Partielle',
                    num_adherent = dpi.nss,
                    dpis_id = dpi.id
                )
                
                for j in range(3):     
                    resume = ResumesConsultations.objects.create(
                    diagnostic = '',
                    symptomes = '',
                    mesure = '',
                    antecedents = '',
                    info_supp = '',
                    date_prochaine_consultation = fake.date()
                    )
                    
                    Consultations.objects.create(
                    dpis_id = dpi.id,
                    resume_consultation_id = resume.id,
                    date_consultation = fake.date()
                    )