"use client"
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUserStore from "@/app/store/userStore";

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let setUser = useUserStore(state => state.setUser)
  let user = useUserStore(state => state.user)

  console.log(user)
  let mutation = useMutation({
    mutationFn : (data) => axios.post('http://localhost:4000/api/login', data, { withCredentials: true }),
    onSuccess: (response) => {
      setEmail('')
      setPassword('')
      setUser(response.data)
      window.location.href = '/pages/userDashboard'
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title:error.response.data,
        text: "please try again"
      })
    }
  })


  let signIn = () => {
    let user = {
      username: email,
      password: password
    }
    mutation.mutate(user)
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
          Sign in
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
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
                sx={{ padding: '12px' }}
                onClick={signIn}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
