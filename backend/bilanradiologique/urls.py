from django.urls import path,include
from .views import bilan_radio,bilan_consultation,bilan_par_id,image_radio

urlpatterns = [
    # bilan biologique
    path('get',bilan_radio.as_view()),
    path('create/', bilan_radio.as_view()),
    path('update/<int:pk>/', bilan_radio.as_view()),
    path('delete/<int:pk>/', bilan_radio.as_view()),
    path('bilan-consultation/<int:pk>',bilan_consultation.as_view()),
    path('bilan-id/<int:pk>',bilan_par_id.as_view()),
    path('image/<int:pk>', image_radio.as_view()),
]