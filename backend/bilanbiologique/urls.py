from django.urls import path,include
from .views import bilan_bio,analyse_bio,bilan_patient,graphique_laborantin,graphique_patient,graphique_tendance,SaveImageAPIView

urlpatterns = [
    # bilan biologique
    path('bilanbio',bilan_bio.as_view()),
    path('bilanbio/create/', bilan_bio.as_view()),
    path('bilanbio/update/<int:pk>/', bilan_bio.as_view()),
    path('bilanbio/delete/<int:pk>/', bilan_bio.as_view()),
    # analyse_biologique
    path('analysebio/<int:bilan_id>/',analyse_bio.as_view()),
    path('analysebio/create/', analyse_bio.as_view()),
    path('analysebio/update/<int:pk>/', analyse_bio.as_view()),
    path('analysebio/delete/<int:pk>/', analyse_bio.as_view()),
    # afficher les bilans d'un patient
    path('bilanbio/<int:patient_id>/',bilan_patient.as_view()),
    #afficher les graphes d'un patient :
    path('graphe-tendance-patient/<int:patient_id>/',graphique_patient.as_view()),
    #afficher les graphes d'un laborantin :
    path('graphe-tendance-laborantin/<int:patient_id>/',graphique_laborantin.as_view()),
    #ajouter un graphe :
    path('graph-data/<int:id_bilan>/',graphique_tendance.as_view()), #envoyer les donnees vers le frontend
    path('save-graph/', SaveImageAPIView.as_view(), name='save_graph'),
]