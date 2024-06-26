from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''), #'home' page
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index)
]