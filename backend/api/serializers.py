from rest_framework import serializers
from .models import DPI


# Handles the creation of the DPI object to put in the database 
class DPISerializer(serializers.ModelSerializer):
    mutuelles_id = serializers.IntegerField(required=True)
    medecins_id = serializers.IntegerField(required=True)
    personnes_contact_id = serializers.IntegerField(required=True)
    users_id = serializers.IntegerField(required=True)

    class Meta:
        model = DPI
        fields = ['nss', 'nom', 'prenom', 'date_naissance', 'adresse', 
                 'num_telephone', 'mutuelles_id', 'medecins_id', 
                 'personnes_contact_id', 'users_id', 'qr_url', 'antecedents']

    def validate(self, data):
        required_fks = ['mutuelles_id', 'medecins_id', 'personnes_contact_id', 'users_id']
        for fk in required_fks:
            if fk not in data or data[fk] is None:
                raise serializers.ValidationError({
                    fk: "This field cannot be null."
                })
        return data

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except Exception as e:
            print("Create error:", str(e)) 
            raise