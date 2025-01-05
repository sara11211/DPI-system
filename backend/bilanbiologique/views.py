from django.shortcuts import render
from django.conf import settings
from django.utils.decorators import method_decorator
import base64
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BilansBiologiques,AnalysesBiologiques,Consultations,GraphiquesTendances
from .serializers import BilansBiologiquesSerializer,AnalysesBiologiquesSerializer,GraphiquesTendancesSerializer

#.#################################
#_fonctions de bilan biologique  #
#.################################

class bilan_bio(APIView):
    def get(self, request):
        bilans = BilansBiologiques.objects.filter(date_bilan__isnull=True) #exams not yet done
        serializer = BilansBiologiquesSerializer(bilans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)  
    def post(self, request):
        serializer = BilansBiologiquesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            bilan = BilansBiologiques.objects.get(pk=pk)
        except BilansBiologiques.DoesNotExist:
            return Response({"error": "Object not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BilansBiologiquesSerializer(bilan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        try:
            bilan = BilansBiologiques.objects.get(pk=pk)
        except BilansBiologiques.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        bilan.delete()
        return Response({"message": "Object deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
#afficher les bilans d'un patient donné :
class bilan_patient(APIView):
    def get(self, request, patient_id):
        consultations = Consultations.objects.filter(dpis=patient_id)
        bilans = BilansBiologiques.objects.filter(consultations__in=consultations)
        
        if bilans.exists():
            serializer = BilansBiologiquesSerializer(bilans, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Ce patient n'a effectué aucun bilan biologique"}, status=status.HTTP_404_NOT_FOUND)


#.#################################
#_fonctions de analyse biologique  #
#.################################

class analyse_bio(APIView):
    def get(self, request, bilan_id):
        analyses = AnalysesBiologiques.objects.filter(bilan_biologique=bilan_id)
        if analyses.exists():
            serializer = AnalysesBiologiquesSerializer(analyses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Aucun analyses trouvées pour ce bilan biologique ."}, status=status.HTTP_404_NOT_FOUND) 
    
    def post(self, request):
        serializer = AnalysesBiologiquesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            bilan = AnalysesBiologiques.objects.get(pk=pk)
        except AnalysesBiologiques.DoesNotExist:
            return Response({"error": "Object not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = AnalysesBiologiquesSerializer(bilan, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        try:
            bilan = AnalysesBiologiques.objects.get(pk=pk)
        except AnalysesBiologiques.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        bilan.delete()
        return Response({"message": "Object deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

###############################################################################
####################  generation de graphe tendance  ##########################
###############################################################################
#################### A ajuster lors de l'integration ##########################
###############################################################################

#les graphes d'un patient donné
class graphique_patient(APIView):
    def get(self, request, patient_id):
        graphes = GraphiquesTendances.objects.filter(dpis_id=patient_id)
        if graphes.exists():
            serializer = GraphiquesTendancesSerializer(graphes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Ce patient n'a effectué aucun graphe de tendance"}, status=status.HTTP_404_NOT_FOUND)
        
#les graphe qu'un laborantin donné a generé 
class graphique_laborantin(APIView):
    def get(self, request, laborantin_id):
        graphes = GraphiquesTendances.objects.filter(laborantins_id=laborantin_id)
        if graphes.exists():
            serializer = GraphiquesTendancesSerializer(graphes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Ce laborantin n'a effectué aucun graphe de tendance"}, status=status.HTTP_404_NOT_FOUND)
        
#generer le graphe
class graphique_tendance(APIView):
    def get(self, request,id_bilan): #fonction qui envoie les donnees pour generer le graphe
        analyses = AnalysesBiologiques.objects.filter(bilan_biologique_id=id_bilan)
        if analyses.exists():
            serializer = AnalysesBiologiquesSerializer(analyses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Aucun analyses trouvées pour ce bilan biologique ."}, status=status.HTTP_404_NOT_FOUND) 
    
    def delete(self, request, *args, **kwargs): #suprimer un graphe
        pk = kwargs.get('pk')
        try:
            bilan = GraphiquesTendances.objects.get(pk=pk)
        except GraphiquesTendances.DoesNotExist:
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        bilan.delete()
        return Response({"message": "Object deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    def post(self,request):
        serializer = GraphiquesTendancesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#Graphe comparatif
class graphe_comparatif(APIView):
    def post(self,request):
        serializer = GraphiquesTendancesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


def replace_character(input_string, old_char, new_char):
    return input_string.replace(old_char, new_char)

@method_decorator(csrf_exempt, name='dispatch')
class SaveImageAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.POST.get('image')  # assuming the image is sent as a base64 string
        if data:
            try:
                # Decode the base64 image data
                image_data = base64.b64decode(data.split(',')[1])  # Split to remove the data URL part

                # Define the file path
                directory = os.path.join(settings.BASE_DIR, 'public/graphique_tendance')
                if not os.path.exists(directory):
                    os.makedirs(directory)
                #les infos necessaire pour creer le graohe dans la bdd
                id_laborantin = request.POST.get('id_laborantin')
                id_dpis = request.POST.get('id_dpis')
                id_bilan = request.POST.get('id_bilan')
                date = request.POST.get('date')
                type_graphe = request.POST.get('type_graphe')
                file_path = os.path.join(directory, 'graph_patient'+str(id_dpis)+'_bilan'+str(id_bilan)+ str(type_graphe) +'.png')

                # Save the image to the directory
                with open(file_path, 'wb') as f:
                    f.write(image_data)
                    file_path = replace_character(file_path, '\\', '/')
                    
                #suvegarder l'element dans la bdd
                graph = GraphiquesTendances.objects.create(laborantins_id=id_laborantin,dpis_id=id_dpis,url_graphique=file_path,date_graphique=date)
                return JsonResponse({"message": "Image saved successfully", "path": file_path}, status=200)

            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
        else:
            return JsonResponse({"error": "No image data provided"}, status=400)