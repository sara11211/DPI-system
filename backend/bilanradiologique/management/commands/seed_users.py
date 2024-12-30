from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from ...models import Radiologues,Personnel,Medecins,Infirmiers,Laborantins
from faker import Faker

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        fake = Faker()

        for i in range(50):
            username = fake.user_name()
            email = fake.email()
            password = "pbkdf2_sha256$870000$KcuBL8LaMZ2G60dOeCEKbU$8uKjOGrsVOssLmgQ7d9VCKHiSENYe/ETkapUkeL8cdc="

            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password
                )

                if i < 10:  
                        personnel = Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Medecin'
                        )
                        Medecins.objects.create(
                            specialite = 'generalist',
                            personnel_id = personnel.id
                        )
                elif i < 20:  
    
                        personnel = Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Infirmier'
                        )
                        Infirmiers.objects.create(
                            personnel_id = personnel.id
                        )
                elif i < 30:  
    
                        personnel = Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Radiologue'
                        )
                        Radiologues.objects.create(
                            personnel_id = personnel.id
                        )
                elif i < 40:  
    
                        personnel = Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Laborantin'
                        )
                        Laborantins.objects.create(
                            personnel_id = personnel.id
                        )
                elif i < 50:  
                        user.is_superuser = 1
                        user.is_staff = 1
                        personnel = Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Personnel administratif'
                        )

                self.stdout.write(self.style.SUCCESS(f"User {username} created with email {email}."))
            else:
                self.stdout.write(self.style.WARNING(f"User {username} already exists."))

        self.stdout.write(self.style.SUCCESS("50 random users created successfully!"))
        
