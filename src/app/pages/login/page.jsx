"use client"
import { TextField, Button, Grid, Box, Typography, Paper, Link } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUserStore from "@/app/store/userStore";
import LandingpageNavbar from "@/app/publicComponent/landingpageNavbar";
import Image from 'next/image';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let setUser = useUserStore(state => state.setUser)
  let user = useUserStore(state => state.user)

  console.log(user)
  let mutation = useMutation({
    mutationFn : (data) => axios.post('https://requestsystembackend-2.onrender.com/api/login', data, { withCredentials: true }),
    onSuccess: (response) => {
      console.log(response)
      setUsername('')
      setPassword('')
      alert('Login Successful')
      window.location.href = '/pages/userDashboard'
    },
    onError: (error) => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title:error.response.data,
        text: "please try again"
      })
    }
  })

  let signIn = () => {
    let user = {
      username: username,
      password: password
    }
    mutation.mutate(user)
  }

  return (
    <>
      <LandingpageNavbar />
      
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)', // Assuming navbar height is 64px
          backgroundColor: '#f4f6f8',
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
  
          </Box>
          <Typography variant="h4" gutterBottom align="center" className="font-bold text-primary">
            Sign In
          </Typography>
          <Typography variant="body1" align="center" className="mb-6 text-gray-600">
            Access your Barangay Document Request account
          </Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  type="text"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  fullWidth
                  variant="contained" 
                  color="primary"
                  sx={{ 
                    padding: '12px',
                    fontSize: '1rem',
                    textTransform: 'none'
                  }}
                  onClick={signIn}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/pages/register" className="text-primary hover:underline">
                Create Account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
