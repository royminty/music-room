from rest_framework import serializers
from .models import Room

# takes our model (in our case a room), translates it into a json response.
class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')

class CreateRoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('guest_can_pause', 'votes_to_skip') #send to post request, makes sure when we pass in data to the serializer, we have these two fields ready

class UpdateRoomSerializer(serializers.ModelSerializer):
  code = serializers.CharField(validators=[])

  class Meta:
    model = Room
    fields = ('guest_can_pause', 'votes_to_skip', 'code')