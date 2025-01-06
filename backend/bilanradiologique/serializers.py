from rest_framework import serializers
from .models import Personnel, Dpis, BilansRadiologiques, Medecins, Consultations, ResumesConsultations, PersonnesContact, Radiologues

class PersonnelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personnel
        fields = '__all__'


class DpisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dpis
        fields = '__all__'


class BilansRadiologiquesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilansRadiologiques
        fields = '__all__'


class MedecinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecins
        fields = '__all__'


class ConsultationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultations
        fields = '__all__'


class ResumesConsultationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumesConsultations
        fields = '__all__'


class PersonnesContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnesContact
        fields = '__all__'


class RadiologuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Radiologues
        fields = '__all__'
