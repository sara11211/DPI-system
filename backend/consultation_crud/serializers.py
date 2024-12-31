from rest_framework import serializers
from .models import  Consultation, ResumeConsultation,Ordonnance,Medicament,SoinsInfirmier
from authentication.models import Dpis,Infirmiers

            
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

class SoinsInfirmierSerializer(serializers.ModelSerializer):
    infirmiers_id = serializers.PrimaryKeyRelatedField(queryset=Infirmiers.objects.all(), write_only=True)
    patient = serializers.PrimaryKeyRelatedField(queryset=Dpis.objects.all(), write_only=True)

    class Meta:
        model = SoinsInfirmier
        fields = ['id', 'infirmiers_id', 'date_soin', 'description_soin', 'patient']  # Tous les champs nécessaires
