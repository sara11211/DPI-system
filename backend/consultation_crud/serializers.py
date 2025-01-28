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
    ordonnance_id = serializers.PrimaryKeyRelatedField(queryset=Ordonnance.objects.all(), source='ordonnance', write_only=True)

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

class Ordonnance_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Ordonnance
        fields = ['id', 'consultation', 'etat_ordonnance']


class SoinsInfirmierSerializer(serializers.ModelSerializer):
    infirmiers_id = serializers.PrimaryKeyRelatedField(queryset=Infirmiers.objects.all(), write_only=True)
    patient = serializers.PrimaryKeyRelatedField(queryset=Dpis.objects.all(), write_only=True)

    heure_soin = serializers.SerializerMethodField()  # Champ virtuel
    type_soin = serializers.SerializerMethodField()   # Champ virtuel

    class Meta:
        model = SoinsInfirmier
        fields = ['id', 'infirmiers_id', 'date_soin', 'heure_soin', 'type_soin', 'description_soin', 'patient']

    def get_heure_soin(self, obj):
        # Retourne une heure par défaut ou None si l'heure n'est pas stockée dans la base
        return "00:00"  # Modifier si nécessaire

    def get_type_soin(self, obj):
        # Retourne un type par défaut ou None si le type n'est pas stocké dans la base
        return "Type inconnu"  # Modifier si nécessaire

    def create(self, validated_data):
        """
        Personnalisation de la création de l'objet sans modifier le modèle.
        """
        heure_soin = self.context['request'].data.get('heure_soin', "00:00")  # Récupérer l'heure du frontend
        type_soin = self.context['request'].data.get('type_soin', "Type inconnu")  # Récupérer le type du frontend

        # Créer l'instance de soin (sans stocker `heure_soin` et `type_soin` dans la base)
        soin = SoinsInfirmier.objects.create(**validated_data)

        # Ajouter ces valeurs au serializer en les stockant temporairement
        soin.heure_soin = heure_soin
        soin.type_soin = type_soin

        return soin

class ResumeConsultationSerializer(serializers.ModelSerializer):
    consultationId = serializers.IntegerField(write_only=True)  # Ajouter un champ pour l'ID de consultation
    
    class Meta:
        model = ResumeConsultation
        fields = ['diagnostic', 'symptomes', 'mesure', 'date_prochaine_consultation', 'consultationId']  # Ajouter consultationId
        extra_kwargs = {
            'diagnostic': {'required': True},
            'symptomes': {'required': True},
            'mesure': {'required': True},
            'date_prochaine_consultation': {'required': True},
            'antecedents': {'required': False},  # Ces champs ne sont pas obligatoires
            'info_supp': {'required': False},    # Ces champs ne sont pas obligatoires
        }

    def create(self, validated_data):
        # Extraire l'ID de consultation depuis les données validées
        consultation_id = validated_data.pop('consultationId')

        # Récupérer la consultation correspondante
        try:
            consultation = Consultation.objects.get(id=consultation_id)
        except Consultation.DoesNotExist:
            raise serializers.ValidationError("Consultation not found")

        # Créer le résumé de consultation
        resume_consultation = ResumeConsultation.objects.create(
            diagnostic=validated_data['diagnostic'],
            symptomes=validated_data['symptomes'],
            mesure=validated_data['mesure'],
            date_prochaine_consultation=validated_data['date_prochaine_consultation'],
            patient=consultation.patient  # Associer le patient de la consultation
        )

        # Associer le résumé de consultation à la consultation
        consultation.resume_consultation = resume_consultation
        consultation.save()

        return resume_consultation


class Consultation_Serializer(serializers.ModelSerializer):
    resume_consultation = ResumeConsultationSerializer(read_only=True)
    ordonnance=OrdonnanceSerializer(read_only=True)
    class Meta:
        model = Consultation
        fields = '__all__'