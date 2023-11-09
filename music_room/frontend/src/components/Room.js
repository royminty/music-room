import React, { Component } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage";

const Room = (props) => {
  //let { roomCode } = useParams()
  // const navigate = useNavigate();
  // let param = useParams();
  // let roomCode = param.roomCode;

  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const navigate = useNavigate();
  const { roomCode } = useParams();

  const getRoomDetails = () => {
    fetch(`/api/get-room?code=${roomCode}`)
      .then((response) => {
        if (!response.ok) {
          navigate('/');
        }
        return response.json();
      })
    .then((data) => {
      setVotesToSkip(data.votes_to_skip);
      setGuestCanPause(data.guest_can_pause);
      setIsHost(data.is_host);
    });
  };

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      props.leaveRoomCallBack();
      navigate('/');
    });
  }

  useEffect(() => {
    getRoomDetails();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {isHost.toString()}
        </Typography>
      </Grid>
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