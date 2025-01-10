"use client"
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import useUserStore from '../store/userStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LandingNavbar = () => {
    const clearUser = useUserStore(state => state.clearUser);
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const [anchorEl, setAnchorEl] = useState(null);

    const mutation = useMutation({
        mutationFn: () => axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true }),
        onSuccess: () => {
            clearUser();
            router.push('/'); // Redirect to the home page
        },
    });

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateTo = (path) => {
        router.push(path);
        handleClose();
    };

    return (
        <Box className="w-full">
            <AppBar position="static" className="bg-black-400">
                <Toolbar className="justify-between">
                    <div className="flex items-center">
                        <img src="/img/img1.png" alt="Logo" className="mr-2 h-10 w-[50px]" />
                        <Typography variant="h6" component="div" className="hidden sm:block">
                            {user?.name}
                        </Typography>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-3">
                      <Button variant='outlined' color="inherit"  onClick={() => navigateTo('/')} className="ml-1">
                            Home
                        </Button>
                        <Button variant='outlined' color="inherit"  onClick={() => navigateTo('/pages/adminLogin')} className="ml-1">
                            Admin
                        </Button>
                        <Button  variant='outlined' color="inherit" onClick={() => navigateTo('/pages/register')} className="ml-1">
                            Sign Up
                        </Button>
                        <Button  variant='outlined' color="inherit" onClick={() => navigateTo('/pages/login')} className="ml-1">
                            Sign In
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                            className="p-2"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => navigateTo('/')}>Home</MenuItem>
                            <MenuItem onClick={() => navigateTo('/pages/login')}>Sign In</MenuItem>
                            <MenuItem onClick={() => navigateTo('/pages/register')}> Sign Up </MenuItem>
                            <MenuItem onClick={() => navigateTo('/pages/adminLogin')}> Admin </MenuItem>
                            
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default LandingNavbar;


