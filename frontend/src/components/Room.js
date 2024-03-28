import React, { Component } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

const Room = (props) => {
  //let { roomCode } = useParams()
  // const navigate = useNavigate();
  // let param = useParams();
  // let roomCode = param.roomCode;
  const navigate = useNavigate();
  let { roomCode } = useParams();

  let [votesToSkip, setVotesToSkip] = useState(2);
  let [guestCanPause, setGuestCanPause] = useState(false);
  let [isHost, setIsHost] = useState(false);
  let [showSettings, setShowSettings] = useState(false);
  let [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  let [song, setSong] = useState({});
  

  const getRoomDetails = async () => {
    //let response = await fetch(`/api/get-room?code=${roomCode}`)
    let response = await fetch("/api/get-room" + "?code=" + roomCode)
    let data = await response.json()
      if (!response.ok) {
        navigate('/');
        return
      }
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
  };

  useEffect(() => {
    getRoomDetails();
    if (isHost) {
      console.log('Host Updated')
      authenticateSpotify();
    }
  }, [isHost]);

  useEffect(() => {
    let interval = setInterval(getCurrentSong, 1000)

    return () => {
      console.log('Unmounting')
      clearInterval(interval)
    }
  })

  const authenticateSpotify = () => {
    fetch('/spotify/is-authenticated')
    .then((response) => response.json())
    .then((data) => {
      setSpotifyAuthenticated(data.status);
      if(!data.status) {
        fetch('/spotify/get-auth-url')
        .then((response) => response.json())
        .then((data) => {
          window.location.replace(data.url);
        });
      }
    });
  }

  const getCurrentSong = () => {
    fetch('/spotify/current-song').then((response) => {
      if (!response.ok) {
        return {};
      }
      else {
        return response.json();
      }
    }).then((data) => {
      setSong(data)
      console.log(data)
    })
  }

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      navigate('/');
    });
  }

  const updateShowSettings = (value) => {
    setShowSettings(value)
  }

  const renderSettings = () => {
    return <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage 
          defaultUpdate={true} 
          defaultSkipValue={votesToSkip}
          defaultPause={guestCanPause}
          defaultRoomCode={roomCode}
          updateCallBack={getRoomDetails}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
          Close
        </Button>
      </Grid>
    </Grid>
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  }

  if (showSettings) {
    return renderSettings();
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>

      <MusicPlayer {...song}/>

      {isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
    // <div>
    //   <h3>{roomCode}</h3>
    //   <p>Votes: {roomDetails.votesToSkip}</p>
    //   <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p>
    //   <p>Host: {roomDetails.isHost.toString()}</p>
    // </div>
  );
};

export default Room;