'use client'

import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography, 
  Paper,
  IconButton
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import UserNavbar from '@/app/publicComponent/userNavbar';
import axios from 'axios';
import { useQuery, useMutation} from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckIcon className="text-green-500" />;
    case 'error':
      return <ErrorIcon className="text-red-500" />;
    default:
      return <InfoIcon className="text-blue-500" />;
  }
};

export default function NotificationPage() {

    let [notif, setNotif] = useState([])

    let { data } = useQuery({
        queryKey : ['notif'],
        queryFn : () => axios.get("https://requestsystembackend-2.onrender.com/api/getNotif", { withCredentials : true }),
        refetchInterval : 5000
    })

    let mutation = useMutation({
        mutationFn : (id) => axios.delete("http://localhost:4000/api/deleteNotif/" + id)
    })

    useEffect(() => {
        if(data)
        {
            let response = data.data
            setNotif(response.reverse())
        }
    }, [data])

    let remove = (id) => {
        setNotif(notif.filter((prev) => prev._id != id))
        mutation.mutate(id)
     
    }




  return (
    <>
    <UserNavbar />
    <div className="container mx-auto px-4 py-8">

      <Paper elevation={3} className="p-4">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h4" component="h1" className="flex items-center">
            <NotificationsIcon className="mr-2" />
            Notifications
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {notif.length} new notifications
          </Typography>
        </div>
        
        <List className="divide-y divide-gray-200">
          {notif.map((notification) => (
            <ListItem 
              key={notification._id}
              className="py-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
              secondaryAction={
                <IconButton edge="end" aria-label="delete" className="text-gray-400 hover:text-red-500" onClick={() => remove(notification._id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar className="bg-gray-200">
                  {getIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" className="font-medium">
                    {notification.text}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" className="text-gray-500">
                    {notification.date}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        
        {notif.length === 0 && (
          <Typography variant="body1" className="text-center text-gray-500 py-8">
            No new notifications
          </Typography>
        )}
      </Paper>
    </div>
    
    </>
    
  );
}

