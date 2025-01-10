"use client"
import useUserStore from "@/app/store/userStore"
import UserNavbar from "@/app/publicComponent/userNavbar"
import { Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function UserDashboard() {


    let [info, setInfo] = useState(null)
    
    let { data } = useQuery({
        queryKey : ["adminData"],
        queryFn : () => axios.get('http://localhost:4000/api/userDashboard', {withCredentials : true})
    })

    useEffect(() => {
        if(data)
        {
            let response = data.data
            
            setInfo([
                { title: 'Pending Requests', count: response.pendingRequest, color: 'bg-yellow-500' },
                { title: 'Completed Requests', count: response.completedRequest, color: 'bg-purple-500' },
                { title: 'Approved Requests', count: response.approvedRequest, color: 'bg-green-500' },
                { title: 'Rejected Requests', count: response.rejectRequest, color: 'bg-red-500' },
                { title: 'For Pickup', count: response.forPickUpRequest, color: 'bg-blue-500' },
                { title: 'For Delivery', count: response.forDeliverRequest, color: 'bg-gray-500' },
              ] )
        }
    }, [data])

    

    return (
        <div>
            <UserNavbar />
            <br />
            <br />
            <Typography variant="h6" className="font-bold text-center">
                User Dashboard
            </Typography>
            <br />
            <div className="container m-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 w-screen md:w-3/4" >
                {info?.map((stat, index) => (
                    <Card
                    key={index}
                    className={`shadow-lg ${stat.color} text-white`}
                    >
                    <CardContent>
                        <Typography variant="h6" className="font-bold">
                        {stat.title}
                        </Typography>
                        <Typography variant="h4" className="font-extrabold mt-2">
                        {stat.count}
                        </Typography>
                    </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

