from django.urls import path
from .views import LoginView,PASS




urlpatterns = [
    path('generate-password/<str:password>/', PASS.as_view(), name='generate_password'),
    path('login/', LoginView.as_view(), name='login'),
]
