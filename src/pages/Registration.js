import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import  {TextField,Button,Alert,IconButton,Collapse} from '@mui/material'
import {Link, useNavigate} from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";


const Registration = () => { 
  const auth = getAuth();
  let[name,setName] = useState('');
  let[email,setEmail] = useState('');
  let[password,setPassword] = useState('');
  let[confirmpassword,setConfirmPassword] = useState('');

  const [open, setOpen] = React.useState(false);

  let[nameerr,setNameerr]=useState('');
  let[emailerr,setEmailerr]=useState('');
  let[passworderr,setPassworderr]=useState('');
  let[confirmpassworderr,setConfirmPassworderr]=useState('');
  let [passwordlen,setPasswordlen]=useState('');
  let [matchpassword,setMatchpassword] = useState('');
  let[existemailerr,setExistemailerr]=useState('')

  const navigate = useNavigate();

  let handlesubmit=()=>{
    if(!name){
      setNameerr('Please enter a name');
    }else if(!email){
      setEmailerr('Please enter email address');
      setNameerr('');
    }
    else if(!password){
      setPassworderr('Please set your password');
      setEmailerr('');
    }
    else if(password.length < 8){
      setPasswordlen('Password must be at least 8 charracter long');
      setPassworderr('');
      setConfirmPassworderr('');     

    }
    else if(!confirmpassword){
      setConfirmPassworderr('Please confirm password')
      setPasswordlen('');
    }
    else{
      if(password !== confirmpassword){
          setConfirmPassworderr('');
          setMatchpassword('Password doesnt match');

      }
      else{
        setPassworderr('');
        setMatchpassword('');
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          
          sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            // ...
            console.log('email sent')
          });

          console.log(userCredential);
          navigate('/login'); 
      })
      .catch((error) => {
        const errorCode = error.code;
        
        if(errorCode.includes('email')){
          // setExistemailerr('Email already in use, Please try another');
          // setOpen(true);
        }else{

        }
        // ..
      });

      }
    }

  }

 

  return (
    <section className='registration-part'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div className='box'>
                <div className='left'>
                  <h2>Get Started with easily register</h2>
                  <p style={{ marginBottom:"20px" }}>Free Register and you can enjoy</p>
                  <Collapse in={open}>
                    <Alert variant="filled" severity="error"
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
                      helperText={nameerr}
                      id="demo-helper-text-misaligned"
                      label="Full Name"
                      style={{ width:'355px',marginTop:'40px' }}
                      type='text'
                      onChange={(e)=>setName(e.target.value)}
                    /><br/>
                  <TextField
                      helperText={emailerr}
                      id="demo-helper-text-misaligned"
                      label="Enter Email"
                      style={{ width:'355px',marginTop:'40px' }}
                      type='email'
                      onChange={(e)=>setEmail(e.target.value)}
                    /><br/>
                  <TextField
                      helperText={passworderr ? passworderr : passwordlen ? passwordlen : ""}
                      id="demo-helper-text-misaligned" 
                      label="Password"
                      style={{ width:'355px',marginTop:'40px' }}
                      type='password'
                      onChange={(e)=>setPassword(e.target.value)}
                    /><br/>
                  <TextField
                      helperText={confirmpassworderr ? confirmpassworderr : matchpassword ? matchpassword : "" }
                      id="demo-helper-text-misaligned"
                      label="Confirm password"
                      style={{ width:'355px',marginTop:'40px' }}
                      type='password'
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                    /><br/>
                    <Button style={{ width:"360px",padding:"10px 0", borderRadius:'86px',background:'#5f35f5',marginTop:'40px',paddingBottom:'20px'  }} variant="contained"
                    onClick={handlesubmit }>Sign Up</Button>
                  <p className='msg'>Already have an account? <Link to='/login'>Login</Link></p>
                  
                </div>
              </div>
              
            </Grid>
            <Grid item xs={6}>
              <img style={{width:'100%',height:'110vh'}} src="./assets/images/writing2.jpg "/>
            </Grid>
        </Grid>
    </section>
    
  )
}

export default Registration