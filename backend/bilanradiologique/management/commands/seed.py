from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from ...models import Radiologues, BilansRadiologiques, Personnel, Dpis
from faker import Faker

class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        fake = Faker()

        for i in range(1):
            username = fake.user_name()
            email = fake.email()
            password = fake.password(length=10)

            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password=password
                )

                if i < 10:  
                        Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Medecin'
                    )
                elif i < 20:  
    
                        Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Infirmier'
                    )
                elif i < 30:  
    
                        Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Radiologue'
                    )
                elif i < 40:  
    
                        Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Laborantin'
                    )
                elif i < 50:  
    
                        Personnel.objects.create(
                        nom=fake.name().split(' ')[0],
                        prenom=fake.name().split(' ')[1],
                        users_id=user.id,
                        fonction='Personnel administratif'
                    )

                self.stdout.write(self.style.SUCCESS(f"User {username} created with email {email}."))
            else:
                self.stdout.write(self.style.WARNING(f"User {username} already exists."))

        self.stdout.write(self.style.SUCCESS("50 random users created successfully!"))
