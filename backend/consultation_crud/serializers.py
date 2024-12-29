from rest_framework import serializers
from .models import Dpi, Consultation, ResumeConsultation,Ordonnance,Medicament,SoinsInfirmier,Infirmier

class DpiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dpi
        fields = '__all__'


            
class ResumeConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeConsultation
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    resume_consultation = ResumeConsultationSerializer(read_only=True)

    class Meta:
        model = Consultation
        fields = '__all__'
    
class MedicamentSerializer(serializers.ModelSerializer):
    ordonnance_id = serializers.PrimaryKeyRelatedField(queryset=Ordonnance.objects.all(), source='ordonnance', write_only=True)

    class Meta:
        model = Medicament
        fields = ['id', 'nom_medicament', 'dose', 'duree', 'ordonnance_id']


class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = MedicamentSerializer(many=True, read_only=True)

    class Meta:
        model = Ordonnance
        fields = ['id', 'consultation', 'etat_ordonnance', 'medicaments']

class InfirmierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infirmier
        fields = ['id', 'personnel']  # Assurez-vous que les champs sont corrects selon votre modèle

class SoinsInfirmierSerializer(serializers.ModelSerializer):
    infirmiers_id = serializers.PrimaryKeyRelatedField(queryset=Infirmier.objects.all(), write_only=True)
    patient = serializers.PrimaryKeyRelatedField(queryset=Dpi.objects.all(), write_only=True)

    class Meta:
        model = SoinsInfirmier
        fields = ['id', 'infirmiers_id', 'date_soin', 'description_soin', 'patient']  # Tous les champs nécessaires
