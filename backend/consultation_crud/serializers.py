from rest_framework import serializers
from .models import Consultation, ResumeConsultation, Ordonnance, Medicament, SoinsInfirmier
from authentication.models import Dpis, Infirmiers




class ConsultationSerializer(serializers.ModelSerializer):
    dateConsultation = serializers.DateField(write_only=True, label="Date Consultation")
    nss = serializers.CharField(write_only=True, label="NSS ")
    nomPatient = serializers.CharField(write_only=True, required=False)
    prenomPatient = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Consultation
        fields = ['dateConsultation', 'nomPatient', 'prenomPatient', 'nss']

    def validate_nss(self, nss):
        """
        Valide le NSS et récupère l'objet Dpis correspondant.
        """
        try:
            return Dpis.objects.get(nss=nss)
        except Dpis.DoesNotExist:
            raise serializers.ValidationError("Aucun patient trouvé avec ce NSS.")

    def create(self, validated_data):
        """
        Crée une instance de Consultation en ignorant `nom` et `prenom`.
        """
        # Retirer et ignorer nom et prenom
        validated_data.pop('nomPatient', None)
        validated_data.pop('prenomPatient', None)

        # Extraire l'objet Dpis validé
        patient = validated_data.pop('nss')
        date_consultation = validated_data['dateConsultation']  # Utilisez `dateConsultation` ici

        # Créer la consultation en mappant 'dateConsultation' à 'date_consultation'
        consultation = Consultation.objects.create(
            patient=patient,
            date_consultation=date_consultation  # Mapper 'dateConsultation' à 'date_consultation'
        )
        return consultation

class MedicamentSerializer(serializers.ModelSerializer):
    ordonnance_id = serializers.PrimaryKeyRelatedField(
        queryset=Ordonnance.objects.all(), 
        source='ordonnance', 
        write_only=True, 
        required=False  # Le champ devient facultatif
    )
    
    class Meta:
        model = Medicament
        fields = ['id', 'nom_medicament', 'dose', 'duree', 'ordonnance_id']


class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = MedicamentSerializer(many=True, read_only=True)
    date = serializers.DateField(source='consultation.date_consultation', read_only=True)
    nss = serializers.CharField(source='consultation.patient.nss', read_only=True)
    etat=serializers.CharField(source='etat_ordonnance', read_only=True)

    class Meta:
        model = Ordonnance
        fields = ['id', 'consultation', 'medicaments', 'date', 'nss', 'etat']

class SoinsInfirmierSerializer(serializers.ModelSerializer):
    infirmiers_id = serializers.PrimaryKeyRelatedField(queryset=Infirmiers.objects.all(), write_only=True)
    patient = serializers.PrimaryKeyRelatedField(queryset=Dpis.objects.all(), write_only=True)

    class Meta:
        model = SoinsInfirmier
        fields = ['id', 'infirmiers_id', 'date_soin', 'description_soin', 'patient']
class ResumeConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeConsultation
        fields = '__all__'

class Consultation_Serializer(serializers.ModelSerializer):
    resume_consultation = ResumeConsultationSerializer(read_only=True)
    ordonnance=OrdonnanceSerializer(read_only=True)
    class Meta:
        model = Consultation
        fields = '__all__'