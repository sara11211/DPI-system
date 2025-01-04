from django.urls import path,include
from .views import bilan_radio

urlpatterns = [
    # bilan biologique
    path('get',bilan_radio.as_view()),
    path('create/', bilan_radio.as_view()),
    path('update/<int:pk>/', bilan_radio.as_view()),
    path('delete/<int:pk>/', bilan_radio.as_view()),
]