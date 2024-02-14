import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import DrawerHeader from '../DrawerHeader';
import { MuiFileInput } from 'mui-file-input';
import {Button} from '@mui/material';
import axios from 'axios';
import {Alert} from '@mui/material';

function ProfilePicture() {

  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const [fileBase64, setFileData] = React.useState(null);
  const [update, setUpdate] = React.useState({flag: false, file: '', fileName: '', id: ''});

  const handleChange = (newFile) => {
    console.log(newFile);
    setFile(newFile);
    if(newFile && newFile !== null) {
      setFile(newFile);
      setFileName(newFile.name);
      let reader = new FileReader();
      reader.readAsDataURL(newFile);
      reader.onload = function () {
          setFileData(reader.result)
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
      document.getElementById('errorAlert').style.display = 'none';
    }
    else {
      setFileName(null);
      setFileData(null);
    }
  }

  const uploadPicture = (e) => {

    if(update.flag) {
      const updateDtl = {
        userid: localStorage.getItem('userid'),
        file: fileBase64,
        fileName: fileName
      }

      console.log(updateDtl);

      axios.post('http://localhost:5000/profilepicture/update/'+update.id, updateDtl)
      .then(res => console.log(res.data))
      .catch((err) => {
        console.log(err)
      });
    }
    else {
      const pictureDtl = {
        userid: localStorage.getItem('userid'),
        file: fileBase64,
        fileName: fileName
      }
      if(file && file !== null) {
        axios.post('http://localhost:5000/profilepicture/add', pictureDtl).then(res => console.log(res.data)); 
        document.getElementById('errorAlert').style.display = 'none';
      }
      else {
        document.getElementById('errorAlert').style.display = 'flex';
      }
    }
    
  }

  const fetchProfilePicture = () => {
    const userid =  localStorage.getItem('userid');
    axios.get('http://localhost:5000/profilepicture/edit/'+userid)
    .then((res) => {
      const profilepicture= res.data[0];
      setFileData(profilepicture.file);
      setUpdate({flag: true, id: profilepicture._id});
    })
    .catch(err => {
      console.log(err);
      setUpdate({flag: false, id: ''});
    });  
  }

  useEffect(() => {
    fetchProfilePicture()
  }, [])

  return (

    <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
      <DrawerHeader />
      <Box sx={{  color: '#555' }}>
        <h3>Profile Photo</h3>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 3,width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <MuiFileInput value={file} onChange={handleChange} />
        <Button sx={{ml:2, mt:2}} onClick={uploadPicture} type='button' variant="contained">Upload</Button>
        <Alert variant="outlined" id='errorAlert' severity="error" sx={ {my:2, display: 'none'} }>
              Please choose picture to upload
            </Alert>
      </Box>
      {fileBase64 && <img width={150} src={fileBase64} className='profPicDisplay'/>}
    </Box>)
}

export default ProfilePicture