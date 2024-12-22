from django.urls import path
from .views import DPICreateView, DPIListView, DPIViewView, DPIUpdateView, DPIDeleteView

urlpatterns = [
    path('dpis/', DPIListView.as_view(), name='dpis_list'), # GET all DPIS
    path('dpis/<int:dpi_id>/', DPIViewView.as_view(), name='view_dpi'), # GET DPI with id
    path('dpis/create/', DPICreateView.as_view(), name='create_dpi'), # CREATE DPI
    path('dpis/<int:dpi_id>/update/', DPIUpdateView.as_view(), name='update_dpi'), # UPDATE DPI
    path('dpis/<int:dpi_id>/delete/', DPIDeleteView.as_view(), name='delete_dpi'), #DELETE DPI
]
