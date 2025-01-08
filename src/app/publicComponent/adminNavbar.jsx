"use client"
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useUserStore from '../store/userStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {

   
    let router = useRouter();

   

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ADMIN
                    </Typography>

                    {/* Navigation Links */}
                    <Button color="inherit" onClick={() => router.push('/pages/userDashboard')}  sx={{ marginLeft: 1 }}>Dashboard</Button>
                    <Button color="inherit" onClick={() => router.push('/pages/adminAllRequest')}  sx={{ marginLeft: 1 }}>All Request</Button>
                    

                    {/* Logout Button */}
                    <Button color="inherit"  onClick={() =>  router.push('/')} sx={{ marginLeft: 5 }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default AdminNavbar;
