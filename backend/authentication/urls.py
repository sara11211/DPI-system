from django.urls import path
from .views import LoginView,PASS,CheckAuthView



urlpatterns = [
    path('generate-password/<str:password>/', PASS.as_view(), name='generate_password'), #this is just for test purpouse
    path('login/', LoginView.as_view(), name='login'),
    path('check-auth/', CheckAuthView.as_view(), name='check-auth'),
]
