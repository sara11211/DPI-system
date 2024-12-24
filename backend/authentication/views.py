from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Personnel
from .serializers import UserSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            personnel = Personnel.objects.get(users = user.id)
            if personnel :
                return Response({
                    "status": "success",
                    "personnel_id": personnel.id,
                    "nom": personnel.nom,
                    "prenom": personnel.prenom,
                    "fonction": personnel.fonction,
                })
            else :
                    return Response({"its a patient"}) #I'll treat this when I merge with imane
        else:
            return Response({"error": "Invalid credentials"}, status=400)