from django.urls import path
from .views import DPICreateView, DPIListView, DPIViewView, DPIUpdateView, DPIDeleteView, MUTUELLECreateView, CONTACTCreateView, GenerateQRCodeView, GetDoctorsView, USERViewView, DPINSSView, GetDoctorIDView, MUTUELLEGetView, CONTACTGetView, DossierChartView
urlpatterns = [
    path('dpis/', DPIListView.as_view(), name='dpis_list'), # GET all DPIS
    path('dpis/<int:dpi_id>/', DPIViewView.as_view(), name='view_dpi'), # GET DPI with id
    path('dpis/create/', DPICreateView.as_view(), name='create_dpi'), # CREATE DPI
    path('dpis/<int:dpi_id>/update/', DPIUpdateView.as_view(), name='update_dpi'), # UPDATE DPI
    path('dpis/<str:nss>/delete/', DPIDeleteView.as_view(), name='delete_dpi'), #DELETE DPI
    path('personnes_contacts/create/', CONTACTCreateView.as_view(), name='create_contact'),
    path('generate_qr_code/<int:nss>/', GenerateQRCodeView.as_view(), name='generate_qr_code'),
    path('get-medecins/', GetDoctorsView.as_view(), name='get_doctors'),
    path('mutuelles/create/', MUTUELLECreateView.as_view(), name='create_mutuelle'),
    path('users/<int:users_id>/', USERViewView.as_view(), name='get_user_data'),
    path('dpis_nss/<str:nss>/',  DPINSSView.as_view(), name='view_dpi_nss'), 
    path('get-medecin_traitant/<int:id>', GetDoctorIDView.as_view(), name='get_doctor_by_id'),
    path('get_mutuelle/<int:dpis_id>/',  MUTUELLEGetView.as_view(), name='get_mutuelle'), 
    path('get_contact/<int:id>/',  CONTACTGetView.as_view(), name='get_contact'), 
    path('dossier_chart/', DossierChartView.as_view(), name='dossier_chart'),

    

    
]