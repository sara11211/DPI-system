from rest_framework import serializers
from .models import (
    Personnel,
    Laborantins,
    Medecins,
    PersonnesContact,
    Dpis,
    ResumesConsultations,
    Consultations,
    AnalysesBiologiques,
    BilansBiologiques,
    GraphiquesTendances,
)

class PersonnelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personnel
        fields = '__all__'


class LaborantinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laborantins
        fields = '__all__'


class MedecinsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecins
        fields = '__all__'


class PersonnesContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonnesContact
        fields = '__all__'


class DpisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dpis
        fields = '__all__'


class ResumesConsultationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumesConsultations
        fields = '__all__'


class ConsultationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultations
        fields = '__all__'


class AnalysesBiologiquesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysesBiologiques
        fields = '__all__'


class BilansBiologiquesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilansBiologiques
        fields = '__all__'


class GraphiquesTendancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GraphiquesTendances
        fields = '__all__'
