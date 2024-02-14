import React, {useEffect, useState} from 'react';
/*import logo from './logo.svg'; */
import './css/App.css';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
  

function App() {

  const checkLoggedin = (localStorage.getItem('userid') !== null && localStorage.getItem('userid') !== '' && 
                        localStorage.getItem('userid') !== undefined) && (localStorage.getItem('token') !== null && 
                        localStorage.getItem('token') !== '' && localStorage.getItem('token') !== undefined);

/*  const isLoggedIn = useState(checkLoggedin);

  useEffect(() => {
    if(checkLoggedin) {
      window.location.assign('/dashboard/');
    }
  }, [isLoggedIn]) */
                    
  return (
    <BrowserRouter>
    <Routes>
      <Route exact index path="/" element={<Login />}></Route>
      {checkLoggedin && <Route index path='/dashboard/*' element={<Dashboard />}></Route> }
      <Route path='/signup' element={<Signup />}></Route>
    </Routes>
    </BrowserRouter>
  );  
}

export default App;
