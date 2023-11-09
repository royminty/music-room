from django.db import models
import string
import random

def generate_unique_code():
  length = 6
  
  while True: # we keep looping till our conditional if statement true
    code = ''.join(random.choices(string.ascii_uppercase, k=length)) # generate random code, length 6, and only uppercase ascii characters
    if Room.objects.filter(code=code).count() == 0: # filter all room objects to see if the room code is equal to our generated code, then count all of the rooms that meet this filter criteria and if it is 0 then it should be unique 
      break
  
  return code

# Create your models here.
class Room(models.Model):
  code = models.CharField(max_length=8, default=generate_unique_code, unique=True) # unique code that identifies each room
  host = models.CharField(max_length=50, unique=True) # host field stores info that relates back to the host, keeps track of who the host is
  guest_can_pause = models.BooleanField(null=False, default=False) # is guest allowed to pause
  votes_to_skip = models.IntegerField(null=False, default=1) # how many votes to skip
  created_at = models.DateTimeField(auto_now_add=True) # puts date and time 


  