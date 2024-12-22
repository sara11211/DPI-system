from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import DPI
from .serializers import DPISerializer

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
