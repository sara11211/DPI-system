from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BilansBiologiques,AnalysesBiologiques
from .serializers import BilansBiologiquesSerializer,AnalysesBiologiquesSerializer

#.#################################
#_fonctions de bilan biologique  #
#.################################

class bilan_bio(APIView):
    def get(self, request):
        bilans = BilansBiologiques.objects.all()
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
