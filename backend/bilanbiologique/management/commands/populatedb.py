from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from ...models import Personnel, Medecins, Laborantins

class Command(BaseCommand):
    help = 'Populate the database with test data'

    def handle(self, *args, **kwargs):
        users = []
        for i in range(3):
            user = User.objects.create_user(
                username=f'users{i}',
                password='password123',
                email=f'user{i}@example.com',
                first_name=f'User{i}',
                last_name=f'Lastname{i}'
            )
            users.append(user)

        self.stdout.write(self.style.SUCCESS(f'{len(users)} users created.'))

        # Creating 3 personnel entries and associating each with a user
        personnel = []
        for i in range(3):
            personnel_member = Personnel.objects.create(
                users=users[i],  # Associate with a user
                nom=f'Nom{i}',
                prenom=f'Prenom{i}',
                fonction=f'Laborantin'
            )
            personnel.append(personnel_member)

        self.stdout.write(self.style.SUCCESS(f'{len(personnel)} personnel created.'))


        # Creating 3 Laborantins and associating them with personnel
        laborantins = []
        for i in range(3):
            laborantin = Laborantins.objects.create(
                personnel=personnel[i]  # Associating with next personnel
            )
            laborantins.append(laborantin)

        self.stdout.write(self.style.SUCCESS(f'{len(laborantins)} laborantins created.'))
        
        users = []
        for i in range(3):
            user = User.objects.create_user(
                username=f'users{i}',
                password='password123',
                email=f'user{i}@example.com',
                first_name=f'User{i}',
                last_name=f'Lastname{i}'
            )
            users.append(user)

        self.stdout.write(self.style.SUCCESS(f'{len(users)} users created.'))

        # Creating 3 personnel entries and associating each with a user
        personnel = []
        for i in range(3):
            personnel_member = Personnel.objects.create(
                users=users[i],  # Associate with a user
                nom=f'Nom{i}',
                prenom=f'Prenom{i}',
                fonction=f'Laborantin'
            )
            personnel.append(personnel_member)

        self.stdout.write(self.style.SUCCESS(f'{len(personnel)} personnel created.'))
        
        medecins = []
        for i in range(3):
            medecin = Medecins.objects.create(
                specialite=f'Medicine {i + 1}',
                personnel=personnel[i]
            )
            medecins.append(medecin)

        self.stdout.write(self.style.SUCCESS(f'{len(medecins)} medecins created.'))