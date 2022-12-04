import React,{useState,useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert } from '@mui/material';

const Home = () => {
  const auth = getAuth();
  const [emailverify,setEmailverify]=useState(false);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailverify(user.emailVerified); 
        const uid = user.uid;
        
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    
  },[]);


  return (
    <>
    {emailverify? 
      <h1>Home</h1>
      :
      <Alert variant="filled" severity="info">
        Please Verify Your Email
      </Alert>
    }
    </>
  )
}

export default Home