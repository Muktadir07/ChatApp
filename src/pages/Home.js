import React,{useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert, Grid, Item } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Leftbar from '../components/Leftbar';


const Home = () => {
  const auth = getAuth();
  const navigate =useNavigate();
  const [emailverify,setEmailverify]=useState(false);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setEmailverify(user.emailVerified); 
        
        
        
        // ...
      } else {
        navigate('/login');
        // User is signed out
        // ...
      }
    });
    
  },[]);


  return (
    <>
    {
    emailverify
    ? 
        <Grid container >
          <Grid item xs={2} >
            <Leftbar active="settings"/>
          </Grid>
          <Grid item xs={4} >
            middle
          </Grid>
          <Grid item xs={3} >
            middle right
          </Grid>
          <Grid item xs={3} >
            right
          </Grid>
        </Grid>
      :
      <Alert variant="filled" severity="info">
        Please Verify Your Email
      </Alert>
    }
    </>
  )
}

export default Home