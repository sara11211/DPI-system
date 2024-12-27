from django.urls import path,include
from .views import create_bilan_bio

urlpatterns = [
    path('create/', create_bilan_bio.as_view()),
    path('update/<int:pk>/', create_bilan_bio.as_view()),
    path('delete/<int:pk>/', create_bilan_bio.as_view()),
]