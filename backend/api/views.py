from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import DPI, Medecin
from .serializers import DPISerializer, MUTUELLESerializer, CONTACTSerializer
import qrcode, io
from django.http import HttpResponse, JsonResponse
from django.db.models import F
from fpdf import FPDF
import os

# Ensure the user is an admin
def is_admin(user):
    return user.is_superuser

# CREATE: Create a new DPI (functionality for admin)
class DPICreateView(APIView):
    #@user_passes_test(is_admin) --> we don't have an admin (we need authentification)
    def post(self, request):
        serializer = DPISerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# READ: Read all DPIs (Visible to all users)
class DPIListView(APIView):
    def get(self, request):
        dpis = DPI.objects.all()
        serializer = DPISerializer(dpis, many=True)
        return Response(serializer.data)

# READ: Read a specific DPI (Visible to all users)
class DPIViewView(APIView):
    def get(self, request, dpi_id):
        dpi = get_object_or_404(DPI, id=dpi_id)
        serializer = DPISerializer(dpi)
        return Response(serializer.data)

# UPDATE: Update a DPI (functionality for admin)
#TODO: make this view allowed for "medecin" too
class DPIUpdateView(APIView):
    #@user_passes_test(is_admin) 
    def put(self, request, dpi_id):
        dpi = get_object_or_404(DPI, id=dpi_id)
        serializer = DPISerializer(dpi, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# DELETE: Delete a DPI (functionality for admin)
class DPIDeleteView(APIView):
    #@user_passes_test(is_admin)  --> we don't have an admin (we need authentification)
    def delete(self, request, dpi_id):
        dpi = get_object_or_404(DPI, id=dpi_id)
        dpi.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# CREATE: Create a new Mutuelle (functionality for admin)
class MUTUELLECreateView(APIView):
    #@user_passes_test(is_admin) --> we don't have an admin (we need authentification)
    def post(self, request):
        print("Incoming request data:", request.data)  # Debug line
        serializer = MUTUELLESerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


# CREATE: Create a new DPI (functionality for admin)
class CONTACTCreateView(APIView):
    #@user_passes_test(is_admin) --> we don't have an admin (we need authentification)
    def post(self, request):
        serializer = CONTACTSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class GenerateQRCodeView(APIView):
    def post(self, request, nss):
        if not nss:
            return Response({'error': 'NSS is required'}, status=400)

        nom = request.data.get('nom')
        prenom = request.data.get('prenom')
        if not nom or not prenom:
            return Response({'error': 'Nom and prenom are required in the request body'}, status=400)
        parent_dir = os.path.abspath(os.path.join(os.getcwd(), '..'))
        qr_dir = os.path.join(parent_dir, 'qr_patients')
        os.makedirs(qr_dir, exist_ok=True)
        qr = qrcode.make(nss)
        qr_image_path = os.path.join(qr_dir, f'{nom}_{prenom}_{nss}.png')
        qr.save(qr_image_path)
        absolute_path = os.path.abspath(qr_image_path)

        return JsonResponse({
            'qr_url': absolute_path,
            'nom': nom,
            'prenom': prenom
        }, status=200)
        
        
class GetDoctorsView(APIView):
    def get(self, request):
        try:
            doctors = Medecin.objects.select_related('personnel_id').annotate(
                nom=F('personnel_id__nom'),
                prenom=F('personnel_id__prenom')
            ).values('id', 'nom', 'prenom')

            doctors_list = list(doctors)

            return JsonResponse(doctors_list, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)