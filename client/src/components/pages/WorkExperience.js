import React from 'react';
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
import { Popover } from '@mui/material';
import { useActionData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import designations from '../json/designations.json';
import { onlyNumber, 
  mobileValidation, 
  nameCheck, 
  nameValidation,
  emailValidation,
  ageValidation,
  addressValidation } from '../../common/validations'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function WorkExperience() {

  let designationsList = designations.it_job_designations;

  const user_id = localStorage.getItem('userid');

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
    organizationName: '',
    responsibilities: '',
    achievements: '',
    projectDtls:'',
    organizationNameErr: false,
    responsibilitiesErr: false,
    achievementsErr: false,
    projectDtlssErr: false,
  }

  const [state, setState] = useState(initialState);

  const [ifAllValidValue, setAllValidFlag] = useState(null);

  const [fromDate, setFromDate] = useState(dayjs('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(dayjs('YYYY-MM-DD'));
  const [designation, setDesignation] =  useState('');
  const [skills, setSkills] = useState([]);
  const [skillsChosen, setChosenSkills] = useState([]);
  const [projLinks, setProjLinks] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [dbExpArr, setExpArr] = useState([]);

  const handleWEValidation = (e) => { 
    const inputFieldName = e.target.name;

    switch(inputFieldName) {
      case 'organizationName': setState({
        ...state,
        organizationNameErr: nameValidation(e.target.value)
      });
      break;
      case 'responsibilities': setState({
        ...state,
        responsibilitiesErr: nameValidation(e.target.value)
      });
      break;
      case 'achievements': setState({
        ...state,
        achievementsErr: nameValidation(e.target.value)
      });
      break;
      case 'projectDtls': setState({
        ...state,
        projectDtlsErr: emailValidation(e.target.value)
      });
      break;

    }

  }

  const handleChange = (event) => {
    const target = event.currentTarget;
    const value = target.value;
    setState({
        ...state,
        [target.name]: value
      })
  };

  const handleKeyUp = (event) => {
    const target = event.target;
    const value = target.value;
    if(value) {
      setState({
        ...state,
        [target.name + 'Err']: false
      })
    }
    else {
      setState({
        ...state,
        [target.name + 'Err']: true
      })
    }
  };


  const handleDesignationChange = (event) => {
    const desigID = event.target.value;
    setDesignation(desigID);
    const designationDtls = designationsList.filter((item) => {
      return item.designation === desigID
    });
    let skillsList = designationDtls.map((e, key) => {
        return e.technical_skills;
    })
    setSkills(skillsList)
  }

  const handleSkillsChange = (event) => {
    const {
      target: { value },
    } = event;
    setChosenSkills(value);
  }

  const handleProjLinksChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjLinks(value);
  }

  const onAddNew = (e) => {

    e.preventDefault();

    const expArray = [];

    const experience = {
      userid: user_id,
      organizationName: state.organizationName,
      responsibilities: state.responsibilities,
      achievements: state.achievements,
      projectDtls: state.projectDtls,
      projectLinks: projLinks,
      designation: designation,
      skills: skillsChosen.toString(),
      fromDate: fromDate,
      toDate: toDate
    }

    const validOrNot = Object.values(experience).every(value => {
      if (value !== null && value !== '' && value !== undefined) {
        return true;
      }
      else {
        return false;
      }
    });

    setAllValidFlag(validOrNot);

    if(ifAllValidValue) {
      expArray.push(experience);
      setExperiences(expArray);
    }
   
  }

  const onSubmit = (e) => {
    if(experiences.length > 0) {
      experiences.forEach((exp) => {
        axios.post('http://localhost:5000/experience/add/', exp).then(res => {
          setState(initialState);
        }); 
      });
    }
  }

  const fetchWorkExperiences = () => {
    if(user_id) {
      axios.get('http://localhost:5000/experience/edit/'+user_id).then(res => {

        const data = res.data;
        const expArr = [];
        expArr.push(data.map((item) => {
          return {
            id: item._id,
            userid: user_id,
            organizationName: item.orgname,
            responsibilities: item.responsibilities,
            achievements: item.acheivements,
            projectDtls: item.projDtls,
            projectLinks: item.projLinks,
            designation: item.desgination,
            skills: item.skills,
            fromDate: item.fromdate,
            toDate: item.todate
          }
        }))

        setExpArr(...expArr);
        
      }).catch(err => {
        console.log(err)
      }); 
    }
  }

  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  const deleteExperience = (id) => {
    if(id) {
      axios.post('http://localhost:5000/experience/remove/'+id).then(res => {
          console.log(res);
      }).catch(err => {
        console.log(err)
      }); 
    }
  }


  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Box sx={{ ml: '10px', color: '#555' }}>
        <h3>Work Experience <span>(Start from initial employer)</span></h3> 
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
          onKeyUp={handleWEValidation}
          onKeyPress={nameCheck}
          error = {state.organizationNameErr}
          helperText = {state.organizationNameErr ? 'Please enter the field' : ''}
          value={state.organizationName} 
          name='organizationName' 
          onChange={handleChange} 
          margin='normal' 
          label="Organization Name" 
          color="primary" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={(newValue) =>{ setFromDate(dayjs(newValue).format('YYYY-MM-DD')); }} label="From" disableFuture />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={(newValue) =>{ setToDate(dayjs(newValue).format('YYYY-MM-DD')); }} label="To" disableFuture />
        </LocalizationProvider>
          <TextField
          onKeyUp={handleWEValidation}
          onKeyPress={nameCheck}
          error = {state.responsibilitiesErr}
          helperText = {state.responsibilitiesErr ? 'Please enter the field' : ''}
          value={state.responsibilities} 
          name='responsibilities' 
          onChange={handleChange} 
          margin='normal' 
          label="Responsibilities" 
          color="primary" multiline/>
          <TextField
          onKeyUp={handleWEValidation}
          onKeyPress={nameCheck}
          error = {state.achievementsErr}
          helperText = {state.achievementsErr ? 'Please enter the field' : ''}
          value={state.achievements} 
          name='achievements' 
          onChange={handleChange} 
          margin='normal' 
          label="Achievements" 
          color="primary" multiline />
          <TextField
          onKeyUp={handleWEValidation}
          onKeyPress={nameCheck}
          error = {state.projectDtlssErr}
          helperText = {state.projectDtlssErr ? 'Please enter the field' : ''}
          value={state.projectDtls} 
          name='projectDtls' 
          onChange={handleChange} 
          margin='normal' 
          label="Project Details" 
          color="primary" multiline />
          <FormControl>
          <TextField
          value={projLinks} 
          name='projLinks' 
          onChange={handleProjLinksChange} 
          margin='normal' 
          label="Project Links" 
          color="primary" multiline />
          <Button sx={{ ml: 'auto', fontSize: '12px', color: 'green', textTransform: 'capitalize' }} aria-describedby={id} variant="success" onClick={handleClick}>
              Instructions
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
                <p style={{ marginTop: "0px" }}>Paste the links with commas</p>
              </Box>
            </Popover></FormControl>
        <FormControl sx={{ m: 1, minWidth: '222px' }}>
          <InputLabel id="demo-simple-select-label">Designation</InputLabel>
          <Select name='designation'
            labelId="designation"
            id="designation"
            value={designation}
            label="Designation"
            onChange={handleDesignationChange  }
          >
            {designationsList && designationsList.map((e, key) => {
                return <MenuItem key={e.id} value={e.designation}>{e.designation}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: '222px' }}>
          <InputLabel id="demo-simple-select-label">Skills</InputLabel>
          <Select name='skills'
            labelId="skills"
            id="skills"
            value={skillsChosen}
            label="skills"
            onChange={handleSkillsChange  } multiple
          >
            { skills[0]&& skills[0].map((item) => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
        {ifAllValidValue === false && <Alert sx={{ ml: '9px', width: '222px'}} variant="outlined" severity="error">
              Please enter all fields
            </Alert>}
        <Box sx={{ mt: '15px', ml: '10px' }}>
          <Button onClick={onAddNew} type='button' variant="contained">Add</Button>
          <Button sx={{ml: 2}} onClick={onSubmit} type='submit' variant="contained">Submit</Button>
        </Box>


          <TableContainer sx={{mt:3,mx:1, overflowX: 'auto'}} component={Paper}>
      <Table sx={{ width: 'max-content' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>Organization Name</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>From</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>To</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>Designation</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>Skills</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>Responsibilities</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>Achievements</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>Project Links</TableCell>
            <TableCell sx={{fontWeight: 'bold', width: 'max-content'}}>Project Details</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {dbExpArr.length > 0  && dbExpArr.map(({id,organizationName, responsibilities, achievements, projectDtls,
         projectLinks, fromDate, toDate, skills, designation}) => {
            return <TableRow
              key={user_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {organizationName}
              </TableCell>
              <TableCell>{fromDate}</TableCell>
              <TableCell>{toDate}</TableCell>
              <TableCell>{designation}</TableCell>
              <TableCell>{skills}</TableCell>
              <TableCell>{responsibilities}</TableCell>
              <TableCell>{achievements}</TableCell>
              <TableCell>{projectLinks}</TableCell>
              <TableCell>{projectDtls}</TableCell>
              <TableCell><EditIcon sx={{mr: 2}} /> <DeleteOutlineOutlinedIcon onClick={()=> {deleteExperience(id)}}/></TableCell>
            </TableRow> }
          )}
        </TableBody>
      </Table>
    </TableContainer>


      </Box>
    </Box>
  )
}

export default WorkExperience