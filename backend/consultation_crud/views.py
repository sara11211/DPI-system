from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Consultation, Ordonnance, Medicament,ResumeConsultation,SoinsInfirmier
from authentication.serializers import DpiSerializer, MedecinSerializer
from .serializers import ConsultationSerializer, OrdonnanceSerializer,MedicamentSerializer,ResumeConsultationSerializer,SoinsInfirmierSerializer
from django.shortcuts import get_object_or_404, redirect
from io import BytesIO
from django.http import HttpResponse
from django.db import transaction
from datetime import date
from docx import Document
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Inches
from docx.shared import Pt
import os
from django.conf import settings
import requests




##   1.crud_medicament  ##

@api_view(['POST'])
def create_medicament(request):
    # Vérifiez que l'ordonnance existe et récupérez-la
    ordonnance_id = request.data.get('ordonnance_id')
    try:
        ordonnance = Ordonnance.objects.get(id=ordonnance_id)
    except Ordonnance.DoesNotExist:
        return Response({'error': 'Ordonnance not found'}, status=status.HTTP_400_BAD_REQUEST)

    # Créez le médicament avec l'ordonnance associée
    medicament = Medicament.objects.create(
        nom_medicament=request.data.get('nom_medicament'),
        dose=request.data.get('dose'),
        duree=request.data.get('duree'),
        ordonnance=ordonnance  # Assurez-vous que l'ordonnance est liée
    )

    # Réponse de succès
    return Response({'message': 'Medicament created successfully'}, status=status.HTTP_201_CREATED)
##list_medicaments : 
@api_view(['GET'])
def list_medicaments(request):
    medicaments = Medicament.objects.all()  # Récupérer tous les médicaments
    serializer = MedicamentSerializer(medicaments, many=True)  # Sérialiser la liste des médicaments
    return Response(serializer.data, status=status.HTTP_200_OK)

##details : 
@api_view(['GET'])
def detail_medicament(request, medicament_id):
    medicament = get_object_or_404(Medicament, id=medicament_id)  # Récupérer le médicament par son ID
    serializer = MedicamentSerializer(medicament)  # Sérialiser le médicament
    return Response(serializer.data, status=status.HTTP_200_OK)

##Update : 
@api_view(['PUT'])
def update_medicament(request, medicament_id):
    medicament = get_object_or_404(Medicament, id=medicament_id)  # Récupérer le médicament par son ID
    serializer = MedicamentSerializer(medicament, data=request.data, partial=True)  # Permet la mise à jour partielle
    
    if serializer.is_valid():
        serializer.save()  # Sauvegarder les modifications
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


##Delete 
@api_view(['DELETE'])
def delete_medicament(request, medicament_id):
    medicament = get_object_or_404(Medicament, id=medicament_id)  # Récupérer le médicament à supprimer
    medicament.delete()  # Supprimer le médicament
    return Response(status=status.HTTP_204_NO_CONTENT)  # Retourner une réponse 204 (pas de contenu)






##   2.crud_consultation##

@api_view(['POST'])
def create_consultation(request):
    if request.method == 'POST':
        data = request.data.copy()
        # Ajout de valeurs par défaut pour certains champs si non fournis
        data.setdefault('bilans_biologiques', None)
        data.setdefault('bilans_radiologiques', None)
        
        # Sérialisation et validation des données
        serializer = ConsultationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Liste des consultations
@api_view(['GET'])
def list_consultations(request):
    patient_id = request.query_params.get('patient_id', None)
    consultations = Consultation.objects.filter(patient_id=patient_id) if patient_id else Consultation.objects.all()
    consultations = consultations.order_by('-date_consultation')  # Trier par date décroissante

    serializer = ConsultationSerializer(consultations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def list_consultations_by_medecin(request, medecins_id):
    """
    Liste les consultations associées à un médecin spécifique.
    """
    consultations = Consultation.objects.filter(patient__medecin__id=medecins_id).order_by('-date_consultation')
    if not consultations.exists():
        return Response({"message": "Aucune consultation trouvée pour ce médecin."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ConsultationSerializer(consultations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_consultations_by_patient(request, patient_id):
    """
    Liste les consultations associées à un patient spécifique.
    """
    consultations = Consultation.objects.filter(patient_id=patient_id).order_by('-date_consultation')
    if not consultations.exists():
        return Response({"message": "Aucune consultation trouvée pour ce patient."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ConsultationSerializer(consultations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Détails d'une consultation spécifique
@api_view(['GET'])
def detail_consultation(request, consultation_id):
    consultation = get_object_or_404(Consultation, id=consultation_id)
    serializer = ConsultationSerializer(consultation)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Mise à jour d'une consultation spécifique
@api_view(['PUT'])
def update_consultation(request, consultation_id):
    consultation = get_object_or_404(Consultation, id=consultation_id)
    serializer = ConsultationSerializer(consultation, data=request.data, partial=True)  # Mise à jour partielle

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Suppression d'une consultation
@api_view(['DELETE'])
def delete_consultation(request, consultation_id):
    consultation = get_object_or_404(Consultation, id=consultation_id)
    consultation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)





##   3.crud_ResumeConsultation ##
@api_view(['POST'])
def create_resume_consultation(request):
    if request.method == 'POST':
        # Sérialiser les données du résumé de consultation
        serializer = ResumeConsultationSerializer(data=request.data)

        if serializer.is_valid():
            # Sauvegarder le résumé de consultation dans la base de données
            resume_consultation = serializer.save()

            # Récupérer le patient (Dpi) à partir du résumé
            patient = resume_consultation.patient

            # Trouver la consultation correspondant à ce patient
            consultation = Consultation.objects.filter(patient=patient, resume_consultation__isnull=True).first()

            # Si une consultation existe sans résumé, on l'associe au résumé
            if consultation:
                consultation.resume_consultation = resume_consultation
                consultation.save()

            # Répondre avec les données du résumé de consultation
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Liste des résumés de consultations
@api_view(['GET'])
def list_resume_consultations(request):
    resume_consultations = ResumeConsultation.objects.all()
    serializer = ResumeConsultationSerializer(resume_consultations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Détails d'un résumé de consultation
@api_view(['GET'])
def detail_resume_consultation(request, resume_consultation_id):
    resume_consultation = get_object_or_404(ResumeConsultation, id=resume_consultation_id)
    serializer = ResumeConsultationSerializer(resume_consultation)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Mise à jour d'un résumé de consultation
@api_view(['PUT'])
def update_resume_consultation(request, resume_consultation_id):
    resume_consultation = get_object_or_404(ResumeConsultation, id=resume_consultation_id)
    serializer = ResumeConsultationSerializer(resume_consultation, data=request.data, partial=True)

    if serializer.is_valid():
        # Sauvegarder le résumé mis à jour
        resume_consultation = serializer.save()

        # Associer ce résumé à la consultation
        consultation_id = request.data.get('consultation_id', None)
        if consultation_id:
            consultation = get_object_or_404(Consultation, id=consultation_id)
            consultation.resume_consultation = resume_consultation
            consultation.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Suppression d'un résumé de consultation
@api_view(['DELETE'])
def delete_resume_consultation(request, resume_consultation_id):
    resume_consultation = get_object_or_404(ResumeConsultation, id=resume_consultation_id)
    resume_consultation.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)





##   4.crud_ordonnance  ##
@api_view(['POST'])
def create_ordonnance(request, consultation_id):
    consultation = get_object_or_404(Consultation, id=consultation_id)

    # Vérifier si une ordonnance existe déjà pour cette consultation
    if Ordonnance.objects.filter(consultation=consultation).exists():
        return Response({"message": "Une ordonnance existe déjà pour cette consultation."}, status=400)

    # Créer une ordonnance
    ordonnance_data = {
        'consultation': consultation.id,
        'etat_ordonnance': 'En cours de validation'
    }
    ordonnance_serializer = OrdonnanceSerializer(data=ordonnance_data)
    
    if ordonnance_serializer.is_valid():
        ordonnance = ordonnance_serializer.save()

        # Ajouter les médicaments associés si fournis dans la requête
        medicaments_data = request.data.get('medicaments', [])
        errors = []  # Liste pour collecter les erreurs

        for medicament_data in medicaments_data:
            medicament_data['ordonnance'] = ordonnance.id  # Associer l'ordonnance au médicament
            medicament_serializer = MedicamentSerializer(data=medicament_data)
            if medicament_serializer.is_valid():
                medicament_serializer.save()
            else:
                errors.append(medicament_serializer.errors)  # Ajouter les erreurs à la liste
        
        if errors:
            return Response({"errors": errors}, status=400)

        return Response(ordonnance_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(ordonnance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_ordonnance(request, ordonnance_id):
    ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
    serializer = OrdonnanceSerializer(ordonnance)
    return Response(serializer.data)


@api_view(['PUT'])
def update_ordonnance(request, ordonnance_id):
    ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)

    # Mettre à jour l'état de l'ordonnance
    ordonnance_serializer = OrdonnanceSerializer(ordonnance, data=request.data, partial=True)

    if ordonnance_serializer.is_valid():
        ordonnance = ordonnance_serializer.save()

        # Si de nouveaux médicaments sont fournis, les associer à l'ordonnance
        medicaments_data = request.data.get('medicaments', [])
        if medicaments_data:
            # Supprimer les anciens médicaments associés à l'ordonnance avant d'ajouter les nouveaux
            ordonnance.medicaments.all().delete()

            for medicament_data in medicaments_data:
                medicament_data['ordonnance'] = ordonnance.id  # Associer l'ordonnance au médicament
                medicament_serializer = MedicamentSerializer(data=medicament_data)
                if medicament_serializer.is_valid():
                    medicament_serializer.save()

        return Response(ordonnance_serializer.data, status=status.HTTP_200_OK)

    return Response(ordonnance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_ordonnance(request, ordonnance_id):
    ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
    ordonnance.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
def download_ordonnance_word(request, ordonnance_id):
    # Récupérer l'ordonnance, la consultation et les informations associées
    ordonnance = get_object_or_404(Ordonnance, id=ordonnance_id)
    consultation = ordonnance.consultation
    patient = consultation.patient
    medecin = getattr(patient, 'medecin', None)

    # Création du document Word
    doc = Document()

    # Ajouter un tableau pour les informations du patient et du médecin
    table = doc.add_table(rows=1, cols=2)
    table.autofit = True
    row = table.rows[0].cells

    # Informations du patient dans la colonne gauche
    patient_info = row[0].paragraphs[0]
    patient_info.add_run(f"Nom : {patient.nom}\n").bold = True
    patient_info.add_run(f"Prénom : {patient.prenom}\n")
    patient_info.add_run(f"Adresse : {patient.adresse or 'Non renseignée'}\n")

    # Informations du médecin dans la colonne droite
    doctor_info = row[1].paragraphs[0]
    if medecin:
        doctor_info.add_run(f"Dr {medecin.personnel.nom} {medecin.personnel.prenom}\n").bold = True
        doctor_info.add_run(f"{medecin.specialite or 'Médecin généraliste'}\n")
    else:
        doctor_info.add_run("Médecin inconnu\n")

    # Alignements et espacements
    for cell in row:
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
    doctor_info.paragraph_format.left_indent = Pt(50)

    # Ajouter la date de consultation en gras noir
    date_paragraph = doc.add_paragraph()
    date_paragraph.add_run(f"Consulté le: {consultation.date_consultation.strftime('%d/%m/%Y') if consultation.date_consultation else 'Date non renseignée'}").bold = False
    doc.add_paragraph("\n")
    # Ajouter le titre "Ordonnance"
    title = doc.add_paragraph()
    title_run = title.add_run("Ordonnance")
    title_run.bold = True
    title_run.font.size = Pt(20)  # Grande taille
    title_run.font.color.rgb = None  # Couleur noire
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    # Éviter toute bordure ou espace supplémentaire
    title.paragraph_format.space_after = Pt(0)  # Pas d'espace après
    title.paragraph_format.space_before = Pt(0)  # Pas d'espace avant

    # Ajouter un saut de ligne avant les médicaments
    doc.add_paragraph("\n\n")  # Sauts de ligne avant la liste des médicaments

    # Ajouter les médicaments
    for idx, medicament in enumerate(ordonnance.medicaments.all(), start=1):
        p = doc.add_paragraph()
        p.add_run(f"{idx}. {medicament.nom_medicament} ").bold = False
        p.add_run(f"{medicament.dose} ").bold = True
        p.add_run("pendant ").bold = False
        p.add_run(f"{medicament.duree} jours").bold = True
        doc.add_paragraph()  # Ajouter une ligne vide entre les médicaments

    # Ajouter la signature en gras, alignée à droite
    signature_paragraph = doc.add_paragraph()
    signature_paragraph.add_run("\nSignature :").bold = True
    signature_paragraph.alignment = WD_ALIGN_PARAGRAPH.RIGHT

    # Sauvegarder le document et le retourner en réponse HTTP
    filename = f"{patient.nom}_{patient.prenom}_{consultation.date_consultation.strftime('%d%m%Y') if consultation.date_consultation else 'unknown_date'}.docx"
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    doc.save(response)

    return response


@api_view(['POST'])
def valider_ordonnance(request, ordonnance_id):
    try:
        ordonnance = Ordonnance.objects.get(id=ordonnance_id)
    except Ordonnance.DoesNotExist:
        return Response({"error": "Ordonnance non trouvée"}, status=status.HTTP_404_NOT_FOUND)

    # Paramètres à envoyer au SGPH
    data = {
        'ordonnance_id': ordonnance.id,
        'medicaments': [
            {'nom_medicament': medicament.nom_medicament, 'dose': medicament.dose, 'duree': medicament.duree}
            for medicament in ordonnance.medicaments.all()
        ]
    }

    # URL de l'API SGPH pour valider l'ordonnance
    sgph_url = "http://localhost:8001/api/valider_ordonnance/"  # Adaptez l'URL selon votre configuration

    try:
        response = requests.post(sgph_url, json=data)  # Envoi de la requête POST au SGPH

        if response.status_code == 200:
            # Traitement de la réponse du SGPH
            sgph_response = response.json()
            etat_ordonnance = sgph_response.get('etat_ordonnance', 'En cours de validation')  # Valeur par défaut
            motif_refus = sgph_response.get('motif_refus', None)

            # Vérification des valeurs valides pour 'etat_ordonnance'
            if etat_ordonnance not in ['Validee', 'En cours de validation', 'Refusee']:
                return Response({
                    "error": "État de l'ordonnance invalide reçu du SGPH"
                }, status=status.HTTP_400_BAD_REQUEST)

            # Mise à jour de l'état de l'ordonnance dans le DPI
            ordonnance.etat_ordonnance = etat_ordonnance
            ordonnance.motif_refus = motif_refus
            ordonnance.save()

            # Retour de la réponse avec un message confirmant la mise à jour
            return Response({
                "message": f"Ordonnance {etat_ordonnance} avec succès.",
                "motif_refus": motif_refus if motif_refus else "Aucun motif de refus"
            }, status=status.HTTP_200_OK)

        else:
            return Response({
                "error": "Échec de la validation dans le SGPH",
                "details": response.json()  # Inclut les détails du message d'erreur si présents
            }, status=status.HTTP_400_BAD_REQUEST)

    except requests.exceptions.RequestException as e:
        # Gestion des erreurs liées à la requête HTTP
        return Response({
            "error": "Erreur de communication avec le SGPH",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    





@api_view(['GET'])
def list_ordonnances_by_medecin(request, medecins_id):
    """
    Liste les ordonnances associées à un médecin spécifique.
    """
    
    consultations = Consultation.objects.filter(patient__medecin__id=medecins_id)
    if not consultations.exists():
        return Response({"message": "Aucune consultation trouvée pour ce médecin."}, status=status.HTTP_404_NOT_FOUND)
    
    ordonnances = Ordonnance.objects.filter(consultation__in=consultations)
    if not ordonnances.exists():
        return Response({"message": "Aucune ordonnance trouvée pour ce médecin."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrdonnanceSerializer(ordonnances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
@api_view(['GET'])
def list_ordonnances_by_patient(request, patient_id):
    """
    Liste les ordonnances associées à un patient spécifique.
    """
    consultations = Consultation.objects.filter(patient_id=patient_id)
    if not consultations.exists():
        return Response({"message": "Aucune consultation trouvée pour ce patient."}, status=status.HTTP_404_NOT_FOUND)
    
    ordonnances = Ordonnance.objects.filter(consultation__in=consultations)
    if not ordonnances.exists():
        return Response({"message": "Aucune ordonnance trouvée pour ce patient."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = OrdonnanceSerializer(ordonnances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


## crud soins_infermier ##

# Créer un soin
@api_view(['POST'])
def create_soin(request):
    if request.method == 'POST':
        serializer = SoinsInfirmierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Liste des soins
@api_view(['GET'])
def list_soins(request):
    soins = SoinsInfirmier.objects.all()
    serializer = SoinsInfirmierSerializer(soins, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Détails d'un soin spécifique
@api_view(['GET'])
def detail_soin(request, SoinsInfirmier_id):
    soin = get_object_or_404(SoinsInfirmier, id=SoinsInfirmier_id)
    serializer = SoinsInfirmierSerializer(soin)  # Passer l'instance de soin ici
    return Response(serializer.data, status=status.HTTP_200_OK)

# Mise à jour d'un soin spécifique
@api_view(['PUT'])
def update_soin(request, SoinsInfirmier_id):
    soin = get_object_or_404(SoinsInfirmier, id=SoinsInfirmier_id)
    serializer = SoinsInfirmierSerializer(soin, data=request.data, partial=True)  # Mise à jour partielle
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Suppression d'un soin
@api_view(['DELETE'])
def delete_soin(request, SoinsInfirmier_id):
    soin = get_object_or_404(SoinsInfirmier, id=SoinsInfirmier_id)
    soin.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)