import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Button, Link, Grid } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../css/Common.css'
import '../css/Login.css'
import { Alert } from '@mui/material';
/* 
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import { login } from '../redux/features/authSlice'; */

function Login() {

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState('');
  const [valid, setValidFlag] = useState(null);

/* const dispatch = useDispatch();
   const navigate = useNavigate(); */

  const initialStatus = {
    hasError: false,
    error: ''
  }

  const [status, setAPIStatus] = useState(initialStatus);

  const validateEmail = (event) => {
    let value = event.target.value;
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    console.log(regex.test(value));
    if ((value !== '' || value !== null) && regex.test(value)) {
      setEmailErr(false);
    }
    else {
      setEmailErr(true);
    }
  }

  const resetAll = () => {
    setEmail('');
    setEmailErr(false);
    setPassword('');
    setValidFlag(null);
    setAPIStatus(initialStatus);
  }

  const handleSubmit = () => {

    if (!emailErr && (email !== '') && password !== '') {
      const userDtls = {
        email: email,
        password: password
      }
      
      /* dispatch(login({userDtls,navigate,toast})); */

    axios.post('http://localhost:5000/users/signin', userDtls)
      .then(res => {
        localStorage.setItem('userid', res.data.result._id);
        localStorage.setItem('token', res.data.token);
        window.location.assign('/dashboard');
      })
      .catch(err => {
        console.log(err);
        setAPIStatus((prevStates) => { return { ...prevStates, hasError: true } });
        setAPIStatus((prevStates) => { return { ...prevStates, error: err.response.data.message } });
        setTimeout(() => {
          resetAll(); 
        }, 5000)
        
    })
      setValidFlag(true);
    }
    else {
      setValidFlag(false);
    }
  }

  return (
    <Box className='loginBg'>
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
        <Box
          sx={{
            py: 3, mx: 'auto'
          }} className='Login-Signup-Box'>

          <FormControl sx={{ mx: 5, mb: 2, width: '80%' }}>
            <TextField
              onKeyUp={validateEmail}
              onChange={(event) => { setEmail(event.target.value) }}
              value={email}
              sx={{ color: 'black' }}
              name='email'
              margin='normal'
              label="Email"
              color="primary"
              error={emailErr}
              helperText={emailErr ? "Please enter valid email" : ''} />
          </FormControl>
          <FormControl sx={{ mx: 5, mb: 2, width: '80%' }}>
            <TextField sx={{ color: 'black' }}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password" 
              value={password}
              onChange={(event) => { setPassword(event.target.value ) }}
            />
          </FormControl>

          <FormControl sx={{ mx: 5, mb: 2, width: '80%', textAlign: 'left' }}>
            {valid === false && <Alert sx={{ mb: 2 }} variant="outlined" severity="error">
              Please enter all the fields
            </Alert>}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <Button onClick={handleSubmit} sx={{ maxWidth: '200px', textAlign: 'left', flexGrow: 1 }} type='submit' variant="contained">Login</Button>
              <Link sx={{ textAlign: 'right', flexGrow: 1 }} to=''>Forgot Password?</Link>

            </Box>
          </FormControl>
          <FormControl sx={{ mx: 5, mb: 2, width: '80%', textAlign: 'left' }}>
            <NavLink to='/signup' className='signUpLink'>New? Sign up..</NavLink>
            {status.hasError === true && <Alert variant="outlined" severity="error">
              {status.error}
            </Alert>}
          </FormControl>

        </Box>
      </Grid>
    </Box>
  )
}

export default Login