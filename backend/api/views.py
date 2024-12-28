from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import DPI, Medecin
from .serializers import DPISerializer, MUTUELLESerializer, CONTACTSerializer
import qrcode, io
from django.http import HttpResponse, JsonResponse
from django.db.models import F

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
        serializer = MUTUELLESerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# SEARCH: Searches for the id of the doctor given the name
class SearchDoctorView(APIView):
    def get(self, request, name):
        try:
            doctor = Medecin.objects.get(name=name)
            return Response({'id': doctor.id}, status=status.HTTP_200_OK)
        except Medecin.DoesNotExist:
            return Response({'error': 'Medecin n''existe pas.'}, status=status.HTTP_404_NOT_FOUND)
        
        

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
    """Generate and serve QR code for the provided nss value."""

    def get(self, request, nss):
        try:
            # Generate the QR code for the nss value
            qr_data = str(nss)
            qr_code = qrcode.make(qr_data)

            # Create an in-memory buffer to hold the image
            img_buffer = io.BytesIO()
            qr_code.save(img_buffer)
            img_buffer.seek(0)  # Rewind the buffer to the beginning

            # Set the response to be an image file download
            response = HttpResponse(img_buffer, content_type="image/png")
            response['Content-Disposition'] = f'attachment; filename="qr_code_{nss}.png"'

            return response

        except Exception as e:
            return HttpResponse(f"Error generating QR code: {str(e)}", status=500)
        

class GetDoctorsView(APIView):
    def get(self, request):
        try:
            # Query the Doctors table and join with the Personnel table
            doctors = Medecin.objects.select_related('personnel_id').annotate(
                nom=F('personnel_id__nom'),
                prenom=F('personnel_id__prenom')
            ).values('id', 'nom', 'prenom')

            # Convert the QuerySet to a list of dictionaries
            doctors_list = list(doctors)

            # Return the response in JSON format
            return JsonResponse(doctors_list, safe=False)
        except Exception as e:
            # Handle any potential errors
            return JsonResponse({'error': str(e)}, status=500)