from django.urls import path
from .views import index

urlpatterns = [
    path('', index), #'home' page
    path('join', index),
    path('create', index),
    path('room/<str:roomCode>', index)
]