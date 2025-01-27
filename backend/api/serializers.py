from rest_framework import serializers
from .models import DPI, Mutuelle, PersonneContact, Medecin
from django.contrib.auth.models import User
import qrcode, io
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404

# Handles the creation of the DPI object to put in the database 
class DPISerializer(serializers.ModelSerializer):
    medecins_id = serializers.IntegerField(required=True)
    personnes_contact_id = serializers.IntegerField(required=True)

    class Meta:
        model = DPI
        fields = [
            'id','nss', 'nom', 'prenom', 'date_naissance', 'adresse',
            'num_telephone', 'medecins_id', 'personnes_contact_id', 'qr_url', 'users_id'
        ]

    def validate(self, data):
        required_fks = ['medecins_id', 'personnes_contact_id']
        for fk in required_fks:
            if fk not in data or data[fk] is None:
                raise serializers.ValidationError({
                    fk: "This field cannot be null."
                })
        return data

    def create(self, validated_data):
        nom = validated_data.get('nom')
        prenom = validated_data.get('prenom')
        nss = validated_data.get('nss')
        username = f"{nss}"

        try:
            user = User.objects.create_user(
                username=username,
                first_name=prenom,
                last_name=nom,
                password='password'  
            )
            validated_data['users_id'] = user.id  
            validated_data['antecedents'] = ''
            
        except Exception as e:
            raise serializers.ValidationError({
                'users_id': f"Error creating user: {str(e)}"
            })

        # Proceed to create the DPI instance
        try:
            return super().create(validated_data)
        except Exception as e:
            print("Create error:", str(e))
            raise serializers.ValidationError({
                'dpi': f"Error creating DPI: {str(e)}"
            })
 
class MUTUELLESerializer(serializers.ModelSerializer):
    dpis_id = serializers.IntegerField(required=True)

    class Meta:
        model = Mutuelle
        fields = ['nom_mutuelle', 'num_adherent', 'type_couverture', 'dpis_id']

        def validate_dpis_id(self, value):
                # Check if the dpis_id exists in the Dpis table
                if not DPI.objects.filter(id=value).exists():
                    raise ValidationError(f"DPIS with id {value} does not exist.")
                return value

        def create(self, validated_data):
                try:
                    return super().create(validated_data)
                except Exception as e:
                    print("Create error:", str(e))
                    raise


# Handles the creation of the MUTUELLE object to put in the database 
class CONTACTSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonneContact
        fields = '__all__'
        

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except Exception as e:
            print("Create error:", str(e)) 
            raise
        
        
        
class USERSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'date_joined']  
        
        
class MedecinSerializer(serializers.ModelSerializer):
    # Use the foreign key relationship to fetch first_name and last_name from the Personnel table
    prenom = serializers.CharField(source='personnel.prenom', read_only=True)
    nom = serializers.CharField(source='personnel.nom', read_only=True)

    class Meta:
        model = Medecin
        fields = ['nom', 'prenom']
        


class MutuelleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mutuelle
        fields = ['nom_mutuelle', 'type_couverture', 'num_adherent']
        
        


class PersonneContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonneContact
        fields = ['nom_contact', 'prenom_contact', 'numero_telephone']
