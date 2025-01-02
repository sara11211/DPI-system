from django.shortcuts import render
from .models import BilansRadiologiques,Dpis,Consultations,Personnel,PersonnesContact,Medecins
from .serializers import BilansRadiologiquesSerializer,DpisSerializer,ResumesConsultationsSerializer,RadiologuesSerializer,Consultations,PersonnelSerializer,PersonnesContactSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


#.#################################
#_fonctions de bilan Radiologique  #
#.################################

class bilan_radio(APIView):
    def get(self, request):
        bilans = BilansRadiologiques.objects.all()
        serializer1 = BilansRadiologiquesSerializer(bilans, many=True)
        response_data = []
        for bilan in bilans:
            consultation = bilan.consultations
            if consultation:
                dpis_id = consultation.dpis_id
                date = consultation.date_consultation
                patient = Dpis.objects.filter(id=dpis_id).first()
                nss = patient.nss if patient else None
                nomComplet = patient.nom+" "+patient.prenom
                medecin_id = patient.medecins_id
                medecin = Medecins.objects.filter(id=medecin_id).first()
                personnel_id = medecin.personnel_id
                personnel = Personnel.objects.filter(id=personnel_id).first()
                parDocteur = personnel.nom+" "+personnel.prenom
                
                response_data.append({
                    "status": "success",
                    "id": bilan.id,
                    "synthese_bilan_radio": bilan.synthese_bilan_radio,
                    "date_radiologie": bilan.date_radiologie,
                    "type_radiologie": bilan.type_radiologie,
                    "consultations": bilan.consultations.id if bilan.consultations else None,
                    "radiologues": bilan.radiologues.id if bilan.radiologues else None,
                    "image_url": bilan.image_url,
                    "nss": nss,
                    "nomComplet": nomComplet,
                    "parDocteur": parDocteur,
                    "date" : date,
                })
                
        return Response(response_data)
    
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
