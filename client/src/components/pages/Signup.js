import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { Popover } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import '../css/Common.css';
import '../css/Signup.css'

function Signup() {

  const [isAllValid, setValidFlag] = useState(null);
  const [isUserCreated, setUserFlag] = useState(null);

  /** Popover */
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const initialState = {
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    EmailErr: false,
    PasswordErr: false,
    FirstNameErr: false,
    LastNameErr: false,
    response: ''
  }

  const [states, setState] = useState(initialState)

  const emailValidation = (event) => {
    let value = event.target.value;
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if ((value !== '' || value !== null) && regex.test(value)) {
      setState((prevStates) => { return { ...prevStates, EmailErr: false } });
    }
    else {
      setState((prevStates) => { return { ...prevStates, EmailErr: true } });
    }
  }

  const passwordValidation = (event) => {
    let value = event.target.value;
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if ((value !== '' || null) && regex.test(value)) {
      setState((prevStates) => { return { ...prevStates, PasswordErr: false } });
    }
    else {
      setState((prevStates) => { return { ...prevStates, PasswordErr: true } });
    }
  }

  const firstNameValidation = (event) => {
    let value = event.target.value;
    if ((value !== '' || null) && value.length > 2) {
      setState((prevStates) => { return { ...prevStates, FirstNameErr: false } });
    }
    else {
      setState((prevStates) => { return { ...prevStates, FirstNameErr: true } });
    }
  }

  const lastNameValidation = (event) => {
    let value = event.target.value;
    if ((value !== '' || null) && value.length > 2) {
      setState((prevStates) => { return { ...prevStates, LastNameErr: false } });
    }
    else {
      setState((prevStates) => { return { ...prevStates, LastNameErr: true } });
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState((prevStates) => { return { ...prevStates, [name]: value } });
  }

  const handleSignup = () => {

    if (!states.EmailErr && (states.Email !== '') && !states.PasswordErr && (states.Password !== '') &&
      !states.FirstNameErr && (states.FirstName !== '') && !states.LastNameErr && (states.LastName !== '')) {
      const signupDtls = {
        "email": states.Email,
        "password": states.Password,
        "firstName": states.FirstName,
        "lastName": states.LastName
      }
      axios.post('http://localhost:5000/users/signup', signupDtls)
        .then(res => {
          console.log(res);
          setUserFlag(true);
          states.response = "Congratulations. Let's get your portfolio created.";
        }).catch(err => {
          if (err) {
            setUserFlag(false);
            setValidFlag(true);
            states.response = err.response.data.message
          }
        }).finally(() => {
          setTimeout(() => {
             setState(initialState);
             setValidFlag(null);
             setUserFlag(null)
           },10000);
        })

    }
    else {
      setValidFlag(false);
    }

  }

  return (
    <Box className='loginBg'>
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        <Box
          className='Login-Signup-Box' sx={{mx: 'auto', py: 3}}>
          <FormControl sx={{ mx: 4, width: '80%' }} className='bg-none'>
            <TextField
              name='Email'
              value={states.Email}
              onKeyUp={emailValidation}
              onChange={handleChange}
              sx={{ color: 'black' }}
              margin='normal'
              label="Email"
              color="primary"
              error={states.EmailErr}
              helperText={states.EmailErr ? "Please enter valid email" : ''} />
          </FormControl>
          <FormControl sx={{ mx: 4, mb: 2, width: '80%' }}>
            <Button sx={{ ml: 'auto', fontSize: '12px', color: 'green', textTransform: 'capitalize' }} aria-describedby={id} variant="success" onClick={handleClick}>
              Password Instructions
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ py: 2, fontSize: 12, px: 3 }}>
                <p style={{ marginTop: "0px" }}>At least one digit [0-9]</p>
                <p>At least one lowercase character [a-z]</p>
                <p>At least one uppercase character [A-Z]</p>
                <p>At least one special character [*.!@#$%^&(){ }[]:;,.?/~_+-=|\]</p>
                <p>At least 8 characters in length</p>
              </Box>
            </Popover>
            <TextField sx={{ color: 'black' }}
              id="outlined-password-input"
              name="Password"
              value={states.Password}
              label="Password"
              type="password"
              autoComplete="current-password" 
              onKeyUp={passwordValidation}
              onChange={handleChange}
              error={states.PasswordErr}
              helperText={states.PasswordErr ? "Please enter valid password" : ''}
              FormHelperTextProps={{
                className: 'helperText'
              }}
            />
          </FormControl>
          <FormControl sx={{ mx: 4, mb: 2, width: '80%' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} >
            
              <TextField sx={{ color: 'black', mr:1 }}
                id="firstname"
                value={states.FirstName}
                name="FirstName"
                label="First Name"
                type="text"
                autoComplete="" 
                onKeyUp={firstNameValidation}
                onChange={handleChange}
                error={states.FirstNameErr}
                helperText={states.FirstNameErr ? "Please enter first name" : ""}
              />
              <TextField sx={{ color: 'black', ml: 1 }}
                id="lastname"
                name="LastName"
                value = {states.LastName}
                label="Last Name"
                type="text"
                autoComplete="" 
                onKeyUp={lastNameValidation}
                onChange={handleChange}
                error={states.LastNameErr}
                helperText={states.LastNameErr ? "Please enter last name" : ""}
              />
            
          </Box>
          </FormControl>
          <Box sx={{ mx: 6, px: 1 }}>

            {isAllValid === false && <Alert variant="outlined" severity="error">
              Please enter all the fields
            </Alert>}

            <Button onClick={handleSignup} sx={{ my: 2, float: 'center' }} type='submit' variant="contained">Sign up</Button>
            {isUserCreated === false && <Alert variant="outlined" severity="error">
              {states.response}
            </Alert>}
            {isUserCreated === true && <Alert severity="success"> {states.response}<Link to='/'>Sign in here</Link> </Alert> }
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default Signup