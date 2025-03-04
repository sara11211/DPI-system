from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Personnel,Dpis,Medecins,Radiologues,Infirmiers,Laborantins
from .serializers import DpiSerializer,UserSerializer,MedecinSerializer,LaborantinSerializer,InfirmierSerializer,RadiologueSerializer,PersonnelSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated


class PASS(APIView):
    def get(self, request, password):
        hashed_password = make_password(password)
        return Response({"password": password, "hashed_password": hashed_password})


class LoginView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username : #c'est un personnel (puisque ils connectent avec le username)
            user = authenticate(username=username, password=password)
        else : #c'est un patient et on doit récuperer le NSS
            username = request.data.get('nss')
            user = authenticate(username=username, password=password)
        #apres distinguer si c'est un personnel ou un patient, on doit rechercher la classe dpi ou personnel associée :
        if user:
            try:
                patient = Dpis.objects.get(users=user.id)
                serializer = DpiSerializer(patient)
                return Response({
                    "status": "success",
                    "patient": serializer.data
                })
            except Dpis.DoesNotExist:
                pass
            try:
                personnel = Personnel.objects.get(users=user.id)
                fonction = personnel.fonction
                if fonction == 'Medecin' :
                    medecin = Medecins.objects.get(personnel=personnel.id)
                    serializer1 = MedecinSerializer(medecin)
                    serializer2 = PersonnelSerializer(personnel)
                    serializer3 = UserSerializer(user)
                    return Response({
                    "status": "success",
                    "id" : serializer1.data['id'],
                    "username" : serializer3.data['username'],
                    "email" : serializer3.data['email'],
                    "nom" : serializer2.data['nom'],
                    "prenom" : serializer2.data['prenom'],
                    "fonction" : serializer2.data['fonction'],
                    "specialite": serializer1.data['specialite'],
                })
                    
                elif fonction == 'Radiologue' :
                    radiologue = Radiologues.objects.get(personnel=personnel.id)
                    serializer1 = RadiologueSerializer(radiologue)
                    serializer2 = PersonnelSerializer(personnel)
                    serializer3 = UserSerializer(user)
                    return Response({
                    "status": "success",
                    "id" : serializer1.data['id'],
                    "username" : serializer3.data['username'],
                    "email" : serializer3.data['email'],
                    "nom" : serializer2.data['nom'],
                    "prenom" : serializer2.data['prenom'],
                    "fonction" : serializer2.data['fonction'],
                    })
                    
                elif fonction == 'Laborantin':
                    laborantin = Laborantins.objects.get(personnel=personnel.id)
                    serializer1 = LaborantinSerializer(laborantin)
                    serializer2 = PersonnelSerializer(personnel)
                    serializer3 = UserSerializer(user)
                    return Response({
                    "status": "success",
                    "id" : serializer1.data['id'],
                    "username" : serializer3.data['username'],
                    "email" : serializer3.data['email'],
                    "nom" : serializer2.data['nom'],
                    "prenom" : serializer2.data['prenom'],
                    "fonction" : serializer2.data['fonction'],
                    })
                elif fonction == 'Infirmier' :
                    infirmier = Infirmiers.objects.get(personnel=personnel.id)
                    serializer1 = InfirmierSerializer(infirmier)
                    serializer2 = PersonnelSerializer(personnel)
                    serializer3 = UserSerializer(user)
                    return Response({
                    "status": "success",
                    "id" : serializer1.data['id'],
                    "username" : serializer3.data['username'],
                    "email" : serializer3.data['email'],
                    "nom" : serializer2.data['nom'],
                    "prenom" : serializer2.data['prenom'],
                    "fonction" : serializer2.data['fonction'],
                    })
                elif fonction == 'Personnel administratif' :
                    serializer1 = PersonnelSerializer(personnel)
                    serializer2 = UserSerializer(user)
                    return Response({
                    "status": "success",
                    "id" : serializer2.data['id'],
                    "username" : serializer2.data['username'],
                    "email" : serializer2.data['email'],
                    "nom" : serializer1.data['nom'],
                    "prenom" : serializer1.data['prenom'],
                    "fonction" : serializer1.data['fonction'],
                    })
                    
            except Personnel.DoesNotExist:
                return Response({"detail": "Aucun role n'est associé à cet utilisateur."}, status=404)
        else:
            return Response({"detail": "Nom d'utilisateur ou mot de passe incorrecte"}, status=400)
        
class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "status": "success",
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
                "first_name": request.user.first_name,
                "last_name": request.user.last_name,
            }
        })