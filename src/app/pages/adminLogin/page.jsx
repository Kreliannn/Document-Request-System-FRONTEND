"use client"
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AdminLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let adminLogin = () => {
    if(username == "admin" && password == "123456789")
    {
      window.location.href = "/pages/adminDashboard"
    }
    else
    {
      Swal.fire({
        icon : "error",
        title : "incorrect",
        text : "please try again"
      })
    }
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
          Admin Login
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="username"
                variant="outlined"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <Button 
                fullWidth
                variant="contained" 
                color="primary"
                sx={{ padding: '12px' }}
                onClick={adminLogin}
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
