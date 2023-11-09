import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FromHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// export default class CreateRoomPage extends Component {
//export default function CreateRoomPage(props) {
const CreateRoomPage = (props) => {
  //const[defaultVotes, setDefaultVotes] = useState(2);
  const[guestCanPause, setGuestCanPause] = useState(true);
  const[votesToSkip, setVotesToSkip] = useState(2);
  const navigate = useNavigate();

  const handleVotesChange = event => {
    setVotesToSkip(event.target.value);
  };

  const handleGuestsCanPauseChange = event => {
    setGuestCanPause(event.target.value === "true" ? true : false);
  };

  const handleRoomButtonPressed = () => {
    console.log('TEST');
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    console.log('TEST 2');
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/' + data.code));
  };

  return (
  <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          Create a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align='center'>
              Guest Control of Playback state
            </div>
          </FormHelperText>
          <RadioGroup 
            row 
            defaultValue='true'
            onChange={handleGuestsCanPauseChange}
          >
            <FormControlLabel
              value='true'
              control={<Radio color='primary' />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value='False'
              control={<Radio color='secondary' />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField 
            required={true} 
            type="number" 
            onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: {textAlign: 'center'},
            }}
          />
          <FormHelperText>
            <div align='center'>
              Votes Required to Skip Song
            </div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button 
          color="primary" 
          variant="contained" 
          onClick={handleRoomButtonPressed}
        >
          Create a Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  )
}

export default CreateRoomPage;