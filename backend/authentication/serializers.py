from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Dpis,Medecins,Laborantins,Radiologues,Infirmiers,Personnel


class DpiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dpis
        fields = ['nss', 'nom', 'prenom', 'date_naissance', 'adresse', 'num_telephone', 'medecins_id', 'personnes_contact_id', 'users_id', 'qr_url', 'antecedents']

class MedecinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecins
        fields = ['id','specialite']
        
class LaborantinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laborantins
        fields = ['id']
        
class RadiologueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radiologues
        fields = ['id']
        
class InfirmierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infirmiers
        fields = ['id']
        
class PersonnelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personnel
        fields = ['nom','prenom','fonction']
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']