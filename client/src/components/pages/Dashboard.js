import React from 'react'
import MiniDrawer from '../MiniDrawer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PersonalDetails from './PersonalDetails';
import ProfilePicture from './ProfilePicture';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Links from './Links';
import Hobbies from './Hobbies';
import Box from '@mui/material/Box';

function Dashboard() {
  
  return (
    <Box sx={{ display: 'flex' }}>
      <MiniDrawer />
      <Routes>
        <Route exact index path="/personaldetails" element={<PersonalDetails />}></Route>
        <Route exact path="/profilepicture" element={<ProfilePicture />}></Route>
        <Route exact path="/experience" element={<WorkExperience />}></Route>
        <Route exact path="/education" element={<Education />}></Route>
        <Route exact path="/links" element={<Links />}></Route>
        <Route exact path="/hobbies" element={<Hobbies />}></Route>
      </Routes>
    </Box>
  )
}

export default Dashboard