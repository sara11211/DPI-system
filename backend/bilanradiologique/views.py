from django.shortcuts import render
from .models import BilansRadiologiques,Medecins,ResumesConsultations,Radiologues,Consultations,Personnel,PersonnesContact
from .serializers import BilansRadiologiquesSerializer,MedecinsSerializer,ResumesConsultationsSerializer,RadiologuesSerializer,Consultations,PersonnelSerializer,PersonnesContactSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


#.#################################
#_fonctions de bilan Radiologique  #
#.################################

class bilan_radio(APIView):
    def get(self, request):
        bilans = BilansRadiologiques.objects.filter(date_radiologie__isnull=True) #exams not yet done
        serializer = BilansRadiologiquesSerializer(bilans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)  
    
    def post(self, request):
        serializer = BilansRadiologiquesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            bilan = BilansRadiologiques.objects.get(pk=pk)
        except BilansRadiologiques.DoesNotExist:
            return Response({"error": "Object not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BilansRadiologiquesSerializer(bilan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        try:
            bilan = BilansRadiologiques.objects.get(pk=pk)
        except BilansRadiologiques.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        bilan.delete()
        return Response({"message": "Object deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
#afficher les bilans d'un patient donné :
class bilan_patient(APIView):
    def get(self, request, patient_id):
        consultations = Consultations.objects.filter(dpis=patient_id)
        bilans = BilansRadiologiques.objects.filter(consultations__in=consultations)
        
        if bilans.exists():
            serializer = BilansRadiologiquesSerializer(bilans, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Ce patient n'a effectué aucun bilan Radiologique"}, status=status.HTTP_404_NOT_FOUND)
