from django.shortcuts import render
from django.conf import settings
from django.utils.decorators import method_decorator
from .models import BilansRadiologiques,Dpis,Consultations,Personnel,PersonnesContact,Medecins
from .serializers import BilansRadiologiquesSerializer,DpisSerializer,ResumesConsultationsSerializer,RadiologuesSerializer,Consultations,PersonnelSerializer,PersonnesContactSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import base64
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os




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
                    "resultat" : bilan.resultat
                })
                print(response_data)
                
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
        
        #handle the image :
        image = request.data['image_url']
        print(request.data)
        image_data = base64.b64decode(image.split(',')[1])  # Split to remove the data URL part
        # Define the file path
        directory = os.path.join(settings.BASE_DIR, 'public/radios')
        if not os.path.exists(directory):
            os.makedirs(directory)
        file_path = os.path.join(directory, 'radio_n'+str(request.data['id'])+'.png')
        # Save the image to the directory
        with open(file_path, 'wb') as f:
            f.write(image_data)
            file_path = replace_character(file_path, '\\', '/')
        print(file_path)
        
        real_data={
            'id': request.data['id'],
            'type_radiologie': request.data['type_radiologie'],
            'synthese_bilan_radio': request.data['synthese_bilan_radio'],
            'date_radiologie': request.data['date_radiologie'],
            'resultat': request.data['resultat'],
            'image_url': file_path
        }
                    
        serializer = BilansRadiologiquesSerializer(bilan,data=real_data, partial=True)
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
        
        
        
def replace_character(input_string, old_char, new_char):
    return input_string.replace(old_char, new_char)   
        
        
        
        # image = request.data['image']  # assuming the image is sent as a base64 string
        # if image:
        #     try:
        #         # Decode the base64 image data
        #         image_data = base64.b64decode(image.split(',')[1])  # Split to remove the data URL part
        #         # Define the file path
        #         directory = os.path.join(settings.BASE_DIR, 'public/radios')
        #         if not os.path.exists(directory):
        #             os.makedirs(directory)
        #         file_path = os.path.join(directory, 'radio_consultation'+str(id_consultation)'.png')
        #         # Save the image to the directory
        #         with open(file_path, 'wb') as f:
        #             f.write(image_data)
        #             file_path = replace_character(file_path, '\\', '/')
                    
        #         #suvegarder l'element dans la bdd
        #         graph = GraphiquesTendances.objects.create(laborantins_id=id_laborantin,dpis_id=id_dpis,url_graphique=file_path,date_graphique=date)
        #         return JsonResponse({"message": "Image saved successfully", "path": file_path}, status=200)