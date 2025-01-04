from django.urls import path
from . import views

urlpatterns = [
    ## 1. CRUD Soins Infirmiers ##
    path('soins/', views.list_soins, name='list_soins'),  
    path('soin/<int:SoinsInfirmier_id>/', views.detail_soin, name='detail_soin'),  
    path('soin/create/', views.create_soin, name='create_soin'),  
    path('soin/<int:SoinsInfirmier_id>/update/', views.update_soin, name='update_soin'),  
    path('soin/<int:SoinsInfirmier_id>/delete/', views.delete_soin, name='delete_soin'),  

    ## 2. Médicaments CRUD ##
    path('medicaments/', views.list_medicaments, name='list_medicaments'),  
    path('medicament/<int:medicament_id>/', views.detail_medicament, name='detail_medicament'),  
    path('medicament/create/', views.create_medicament, name='create_medicament'),  
    path('medicament/<int:medicament_id>/update/', views.update_medicament, name='update_medicament'),  
    path('medicament/<int:medicament_id>/delete/', views.delete_medicament, name='delete_medicament'),  

    ## 3. Consultations CRUD ##
    path('consultations/', views.list_consultations, name='list_consultations'),  
    path('consultation/<int:consultation_id>/', views.detail_consultation, name='detail_consultation'),  
    path('consultation/create/', views.create_consultation, name='create_consultation'), 
    path('consultation/<int:consultation_id>/update/', views.update_consultation, name='update_consultation'),  
    path('consultation/<int:consultation_id>/delete/', views.delete_consultation, name='delete_consultation'),  

    ## 4. Résumé des Consultations CRUD ##
    path('resume-consultations/', views.list_resume_consultations, name='list_resume_consultations'),  
    path('resume-consultation/<int:consultation_id>/', views.detail_resume_consultation, name='detail_resume_consultation'), 
    path('resume-consultation/create/', views.create_resume_consultation, name='create_resume_consultation'), 
    path('resume-consultation/<int:resume_consultation_id>/update/', views.update_resume_consultation, name='update_resume_consultation'),  
    path('resume-consultation/<int:resume_consultation_id>/delete/', views.delete_resume_consultation, name='delete_resume_consultation'),  

    ## 5. Ordonnances CRUD  ##
    path('ordonnance/create/<int:consultation_id>/', views.create_ordonnance, name='create_ordonnance'),
    path('ordonnance/<int:ordonnance_id>/', views.get_ordonnance, name='get_ordonnance'),
    path('ordonnance/update/<int:ordonnance_id>/', views.update_ordonnance, name='update_ordonnance'),
    path('ordonnance/delete/<int:ordonnance_id>/', views.delete_ordonnance, name='delete_ordonnance'),
    path('ordonnance/word/<int:ordonnance_id>/', views.download_ordonnance_word, name='generate_ordonnance_word'),
    path('ordonnance/valider/<int:ordonnance_id>/', views.valider_ordonnance, name='valider_ordonnance'),

    ## 6. Liste par médecin et par patient ##
    path('consultations/medecin/<int:medecins_id>/', views.list_consultations_by_medecin, name='list_consultations_by_medecin'),
    path('consultations/patient/<str:nss>/', views.list_consultations_by_patient, name='list_consultations_by_patient'),
    path('ordonnances/medecin/<int:medecins_id>/', views.list_ordonnances_by_medecin, name='list_ordonnances_by_medecin'),
    path('ordonnances/patient/<int:patient_id>/', views.list_ordonnances_by_patient, name='list_ordonnances_by_patient'),
    path('ordonnance/consultation/<int:consultation_id>/', views.get_ordonnance_id_by_consultation, name='get_ordonnance_id_by_consultation'),




]
