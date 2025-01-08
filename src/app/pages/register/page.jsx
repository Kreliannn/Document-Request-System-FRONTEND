
"use client"
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    let mutation = useMutation({
        mutationFn : (data) => axios.post('http://localhost:4000/api/register', data),
        onSuccess: (response) => {
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            Swal.fire({
              icon: 'success',
              title: response.data,
              text: "please proceed to login"
          })
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: error.response.data,
                text: "Please try again",
            })
        }
    })

    let register = () => {
        let newUser = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        mutation.mutate(newUser)
    }


  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
        
      <Box 
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: 400,
        }}
      >
        <Typography variant="h5" gutterBottom align="center">
          Sign Up
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                
                fullWidth
                label="Full Name"
                variant="outlined"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                fullWidth
                variant="contained" 
                color="primary"
                sx={{ padding: '12px' }}

                onClick={register}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
