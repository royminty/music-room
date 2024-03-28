#allows us to render index template, then react will take care of the rest
from django.shortcuts import render

# Create your views here.
def index(request, *args, **kwargs):
  #render takes the request and the template and return that html to wherever we sent the request
  return render(request, 'frontend/index.html')
  