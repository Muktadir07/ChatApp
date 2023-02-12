import React, { useState } from 'react'
import Grid from '@mui/material/Grid'

import  {TextField,Button,Alert,IconButton,Collapse} from '@mui/material'
import ReactDOM from "react-dom/client";
import {Link,useNavigate} from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import {AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";


const Login = () => {
  const [open, setOpen] = React.useState(false);
  const auth = getAuth();
  const navigate=useNavigate();
  

  let[email,setEmail] = useState('');
  let[password,setPassword] = useState('');

 
  let[emailerr,setEmailerr]=useState('');
  let[passworderr,setPassworderr]=useState('');
  let [passwordlen,setPasswordlen]=useState('');
  let[existemailerr,setExistemailerr]=useState('')
  let[checkpassword,setCheckpassword]=useState(false);
  let[sevarity,setSevarity]=useState('error');

  


  let handlesubmit=()=>{
    if(!email){
      setEmailerr('Please enter email address');
    }
    else if(!password){
      setPassworderr('Please set your password');
      setEmailerr('');
    }
    else if(password.length < 8){
      setPasswordlen('Password must be at least 8 charracter long');
      setPassworderr('');

      
       

    }
    else{
        setPassworderr('');
        setPasswordlen('');
        

        signInWithEmailAndPassword(auth, email, password).then((user)=>{
          navigate('/home');
          
        }).catch((error)=>{
          const errorCode = error.code;
          console.log(errorCode)
        
        if(errorCode.includes('email')){
      

           setExistemailerr('There is no such email named '+email);
           setOpen(true);
           setSevarity('warning');
          console.log(errorCode)
        }else if(errorCode.includes('password')){
      

          setExistemailerr("Your password doesn't match");
          setOpen(true);
          setSevarity('error');
         console.log(errorCode)
        }else{
          

        }
        });
        

        

    }
  }
  let handleEye=()=>{
    setCheckpassword(!checkpassword);

  }
  let handleGoogleSignin=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  //------------------- Facebook Sign In------------------------------------------------//
  let handleFacebookSignin=()=>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

  }

  return (
    <section className='registration-part'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className='box'>
                <div className='left'>
                  <h2>Login to your account</h2>
                  <div className='loginoption' style={{ marginBottom:'10px' }}>
                    <div onClick={handleGoogleSignin} className='option'>
                      <img src="./assets/images/google.png "/>
                      Login with Google
                      </div>
                    <div onClick={handleFacebookSignin} className='option'>
                      <img src="./assets/images/facebook.png "/>
                      Login with Facebook
                      </div>
                  </div>

                  <Collapse in={open}>
                    <Alert severity={sevarity}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                        <IoMdClose fontSize="inherit" />
                        </IconButton>
                            }
                            sx={{ mb: 2 }}
                          >
                            {existemailerr} 
                          </Alert>
                        </Collapse>
                 
                  <TextField
                      helperText={emailerr}
                      id="demo-helper-text-misaligned"
                      label="Enter Email"
                      style={{ width:'355px',marginTop:'40px' }}
                      type='email'
                      onChange={(e)=>setEmail(e.target.value)}
                    /><br/>
                    <div className='eye'>
                          <TextField
                          helperText={passworderr ? passworderr : passwordlen ? passwordlen : ""}
                          id="demo-helper-text-misaligned" 
                          label="Password"
                          style={{ width:'355px',marginTop:'40px' }}
                          type={checkpassword? 'type':'password'} 
                          onChange={(e)=>setPassword(e.target.value)}
                            />
                            {checkpassword ?
                            <AiFillEye onClick={handleEye} className='eyeicon'/>
                            :
                            <AiFillEyeInvisible onClick={handleEye} className='eyeicon'/>
                            }<br/>
   
                    </div>
                  
                    <Button style={{ width:"360px",padding:"20px 0", borderRadius:'8px',background:'#5f35f5',marginTop:'40px',paddingBottom:'20px'  }} variant="contained"
                    onClick={handlesubmit }>Login to Continue</Button> 

                    <p className='msg'>Don't have an account? <Link to='/'>Sign Up</Link></p>
                </div>
              </div>
              
            </Grid>
            <Grid item xs={6}>
              <img style={{width:'100%',height:'110vh'}} src="./assets/images/typing2.jpg "/>
            </Grid>
        </Grid>
    </section>
  )
}

export default Login