import React from 'react'
import Box from '@mui/material/Box';
import DrawerHeader from '../DrawerHeader';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import dayjs from 'dayjs';
import {Alert} from '@mui/material';
import { useActionData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onlyNumber, 
        mobileValidation, 
        nameCheck, 
        nameValidation,
        emailValidation,
        ageValidation,
        addressValidation } from '../../common/validations'

function PersonalDetails() {

  const user_id = localStorage.getItem('userid');

  const [ifAllValues, setValidFlag] = useState(null);

  const initialState = {
    firstName: '',
    lastName: '',
    emailid: '',
    mobile: '',
    age: '',
    address: '',
    maritalstatus: '',
    firstNameErr: null,
    lastNameErr: null,
    emailidErr: null,
    mobileErr: null,
    ageErr: null,
    addressErr: null,
    maritalstatusErr: null,
  }

  const [state, setState] = useState(initialState);

  const [dob, setDOB] = useState(dayjs('YYYY-MM-DD'));

  const [persDtldId, setPersDtlsId] = useState('');

  const fetchIfExistingUser = () => {
    if(user_id) {
      axios.get('http://localhost:5000/personaldetails/edit/'+user_id).then(res => {
        console.log(res.data);
        const existingDataState = {
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          emailid: res.data.emailid,
          mobile: res.data.phonenum,
          age: res.data.age,
          address: res.data.address,
          maritalstatus: res.data.maritalstatus,
          firstNameErr: null,
          lastNameErr: null,
          emailidErr: null,
          mobileErr: null,
          ageErr: null,
          addressErr: null,
          maritalstatusErr: null,
        }
        setState(existingDataState);
        setDOB(dayjs(res.data.dob));
        console.log(dob);
        setPersDtlsId(res.data._id);
      }).catch(err => {
        setPersDtlsId('');
      }); 
    }
  }

  useEffect(() => {
    fetchIfExistingUser();
  }, []);
  

  const handleValidation = (e) => { 
    const inputFieldName = e.target.name;

    switch(inputFieldName) {
      case 'firstName': setState({
        ...state,
        firstNameErr: nameValidation(e.target.value)
      });
      break;
      case 'lastName': setState({
        ...state,
        lastNameErr: nameValidation(e.target.value)
      });
      break;
      case 'mobile': setState({
        ...state,
        mobileErr: mobileValidation(e.target.value)
      });
      break;
      case 'emailid': setState({
        ...state,
        emailidErr: emailValidation(e.target.value)
      });
      break;
      case 'age': setState({
        ...state,
        ageErr: ageValidation(e.target.value)
      });
      break;
      case 'address': setState({
        ...state,
        addressErr: addressValidation(e.target.value)
      });
      break;

    }

  }

  const changeMaritalStatus = (e) => {
    const selectedVal = e.target.value;
    console.log(selectedVal);
    if(selectedVal && selectedVal != '') {
      setState({
        ...state,
        maritalstatus: selectedVal,
        maritalstatusErr: false
      });
    }
    else {
      setState({
        ...state,
        maritalstatusErr: true
      });
    }
    console.log(state.maritalstatus) 
  }

  const handleChange = (event) => {
    const target = event.currentTarget;
    setState({
      ...state,
      [target.name]: target.value
    })
    
  };

  const onUpdateDetails = (e) => {

    e.preventDefault();

    const personaldtl = {
      userid: user_id,
      firstName: state.firstName,
      lastName: state.lastName,
      dob: dob.format('YYYY-MM-DD'),
      email: state.emailid,
      phone: state.mobile,
      age: state.age,
      maritalstatus: state.maritalstatus,
      address: state.address
    }

    console.log(personaldtl);

    const validOrNot = Object.values(personaldtl).every(value => { 
      if (value !== null && value !== '' && value !== undefined) {
        return true;
      }
      else {
        return false;
      }
    });

    setValidFlag(validOrNot);

    console.log(ifAllValues);

    if(ifAllValues && persDtldId) {
      axios.post('http://localhost:5000/personaldetails/update/'+persDtldId, personaldtl).then(res => {
        setState(initialState);
        setDOB(dayjs('YYYY-MM-DD'))
      }); 
    }

  }


  const onSubmit = (e) => {

    e.preventDefault();

    const personaldtl = {
      userid: user_id,
      firstName: state.firstName,
      lastName: state.lastName,
      dob: dob.format('YYYY-MM-DD'),
      email: state.emailid,
      phone: state.mobile,
      age: state.age,
      maritalstatus: state.maritalstatus,
      address: state.address
    }

    console.log(personaldtl);

    const validOrNot = Object.values(personaldtl).every(value => {
      if (value !== null && value !== '' && value !== undefined) {
        return true;
      }
      else {
        return false;
      }
    });

    setValidFlag(validOrNot);

    console.log(ifAllValues);

    if(ifAllValues) {
      axios.post('http://localhost:5000/personaldetails/add', personaldtl).then(res => {
        setState(initialState);
        setDOB(dayjs('YYYY-MM-DD'));
        
      }); 
    }
    
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Box sx={{ ml: '10px', color: '#555' }}>
        <h3>Personal Details</h3>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          helperText = {state.firstNameErr ? 'Please enter the field' : ''} 
          error={state.firstNameErr} 
          onKeyPress={nameCheck}
          onKeyUp={handleValidation} 
          value={state.firstName} 
          name='firstName' 
          onChange={handleChange} 
          margin='normal' 
          label="First Name" 
          color="primary" />
        <TextField 
          helperText = {state.lastNameErr ? 'Please enter the field' : ''} 
          error={state.lastNameErr} 
          onKeyUp={handleValidation} 
          value={state.lastName} 
          name='lastName' 
          onChange={handleChange} 
          margin='normal' 
          label="Last Name" 
          color="primary" />
          <TextField 
          helperText = {state.emailidErr ? 'Please enter the field' : ''} 
          error={state.emailidErr} 
          onKeyUp={handleValidation} 
          value={state.emailid} 
          name='emailid' 
          onChange={handleChange} 
          margin='normal' 
          label="Email id" 
          color="primary" />
          <TextField 
          helperText = { state.mobileErr ? 'Please enter the field' : '' } 
          error={ state.mobileErr }
          onKeyUp = { handleValidation } 
          onKeyPress={onlyNumber} 
          value={state.mobile} 
          name='mobile' 
          onChange={handleChange} 
          margin='normal' 
          label="Mobile Number"
          type='text'
          color="primary" inputProps={{ maxLength: 10 }} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={dob} onChange={(newValue) =>{ setDOB(dayjs(newValue)); }} label="Dob" disableFuture />
        </LocalizationProvider>
        <TextField 
          helperText = {state.ageErr ? 'Please enter valid age' : ''} 
          error={state.ageErr} 
          value={state.age} 
          onKeyUp={handleValidation}
          name='age' 
          onChange={handleChange} 
          margin='normal' 
          pattern="[0-9]*" 
          label="Age" 
          color="primary" /> 
        <FormControl sx={{ m: 1, minWidth: '222px' }}>
          <InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
          <Select name='maritalstatus'
            labelId="marital-status"
            id="marital-status"
            value={state.maritalstatus}
            label="Marital Status"
            onChange={ changeMaritalStatus}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value='unmarried'>Unmarried</MenuItem>
            <MenuItem value='married'>Married</MenuItem>
          </Select>
        </FormControl>
        <TextField 
          helperText = {state.addressErr ? 'Please enter the field' : ''} 
          error={state.addressErr} 
          value={state.address} 
          onKeyUp={handleValidation}
          name='address' 
          onChange={handleChange} 
          margin='normal' 
          label="Address" 
          color="primary" />
        {ifAllValues === false && <Alert sx={{ ml: '9px', width: '222px'}} variant="outlined" severity="error">
              Please enter all fields
            </Alert>}
        <Box sx={{ mt: '15px', ml: '10px' }}>
          {
            persDtldId != '' && <Button onClick={onUpdateDetails} type='submit' variant="contained">Update Personal Details</Button>
          }
          {
            persDtldId == '' && <Button onClick={onSubmit} type='submit' variant="contained">Add Personal Details</Button>
          }
        </Box>
      </Box>
    </Box>
  )
}

export default PersonalDetails