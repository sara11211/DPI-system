from django.urls import path
from .views import DPICreateView, DPIListView, DPIViewView, DPIUpdateView, DPIDeleteView, MUTUELLECreateView, SearchDoctorView, CONTACTCreateView, GenerateQRCodeView, GetDoctorsView

urlpatterns = [
    path('dpis/', DPIListView.as_view(), name='dpis_list'), # GET all DPIS
    path('dpis/<int:dpi_id>/', DPIViewView.as_view(), name='view_dpi'), # GET DPI with id
    path('dpis/create/', DPICreateView.as_view(), name='create_dpi'), # CREATE DPI
    path('dpis/<int:dpi_id>/update/', DPIUpdateView.as_view(), name='update_dpi'), # UPDATE DPI
    path('dpis/<int:dpi_id>/delete/', DPIDeleteView.as_view(), name='delete_dpi'), #DELETE DPI
    path('mutuelles/create/', MUTUELLECreateView.as_view(), name='create_mutuelle'),
    path('recherche-docteur/<str:name>/', SearchDoctorView.as_view(), name='recherche-docteur'),
    path('personnes_contacts/create/', CONTACTCreateView.as_view(), name='create_contact'),
    path('generate_qr_code/<int:nss>/', GenerateQRCodeView.as_view(), name='generate_qr_code'),
    path('get-medecins/', GetDoctorsView.as_view(), name='get_doctors'),

]
