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

const UserNavbar = () => {

    let clearUser = useUserStore(state => state.clearUser);
    let router = useRouter();

    let mutation = useMutation({
        mutationFn: () => axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true }),
        onSuccess: () => {
            clearUser();
            router.push('/'); // Redirect to the home page
        },
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        USER
                    </Typography>

                    {/* Navigation Links */}
                    <Button color="inherit" onClick={() => router.push('/pages/userDashboard')}  sx={{ marginLeft: 1 }}>Dashboard</Button>
                    <Button color="inherit" onClick={() => router.push('/pages/userRequestDocuments')}  sx={{ marginLeft: 1 }}>Request Document</Button>
                    <Button color="inherit" onClick={() => router.push('/all-requests')}  sx={{ marginLeft: 1 }}>All Requests</Button>
                    <Button color="inherit" onClick={() => router.push('/history')}  sx={{ marginLeft: 1 }}>History</Button>

                    {/* Logout Button */}
                    <Button color="inherit"  onClick={() => mutation.mutate()} sx={{ marginLeft: 5 }}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default UserNavbar;
