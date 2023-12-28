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
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';

// export default class CreateRoomPage extends Component {
//export default function CreateRoomPage(props) {
const CreateRoomPage = ({defaultSkipValue=2, defaultPause=true, defaultUpdate=false, defaultRoomCode=null, updateCallBack}) => {
  const navigate = useNavigate();

  let[update, setUpdate] = useState(defaultUpdate);
  let[guestCanPause, setGuestCanPause] = useState(defaultPause);
  let[votesToSkip, setVotesToSkip] = useState(defaultSkipValue);
  let [successMsg, setSuccessMsg] = useState('');
  let [errorMsg, setErrorMsg] = useState('');

  // const handleVotesChange = event => {
  //   setVotesToSkip(event.target.value);
  // };

  // const handleGuestsCanPauseChange = event => {
  //   setGuestCanPause(event.target.value === "true" ? true : false);
  // };

  let handleRoomButtonPressed = async () => {
    console.log(setVotesToSkip);
    console.log(setGuestCanPause);
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    await fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/' + data.code));
  };

  const handleUpdateButtonPressed = async () => {
    console.log(votesToSkip);
    console.log(defaultRoomCode);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: defaultRoomCode,
      }),
    };
    await fetch('/api/update-room', requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg('Room updated successfully')
      } else {
        setErrorMsg('Error updated room...')
      }
      updateCallBack()
    })
  };

  const renderCreateButton = () => {
    return(
      <Grid container spacing={1}>
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
    );
  }

  const renderUpdateButton = () => {
    return (
      <Grid item xs={12} align="center">
          <Button 
            color="primary" 
            variant="contained" 
            onClick={handleUpdateButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
    );
  }

  const title = update ? "Update Room" : "Create a Room";

  return (
  <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg != "" || successMsg != ""}>
          {successMsg != "" ? (
          <Alert 
            severity="success" 
            onClose={() => {
              setSuccessMsg("");
            }}
          >
              {successMsg}
          </Alert>
          ) : (
          <Alert 
            severity="error"
            onClose={() => {
              setErrorMsg('');
            }}
          >
            {errorMsg}
          </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant='h4'>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align='center'>
              Guest Control of Playback State
            </div>
          </FormHelperText>
          <RadioGroup 
            row 
            defaultValue={defaultPause.toString()}
            onChange={(e) => {setGuestCanPause(e.target.value)}}
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
            onChange={(e) => {setVotesToSkip(e.target.value)}}
            defaultValue={defaultSkipValue}
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
      {update ? renderUpdateButton() : renderCreateButton()}
    </Grid>
  )
}

export default CreateRoomPage;