"use client"

import AdminNavbar from "@/app/publicComponent/adminNavbar";
import { Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AdminDashboard() {

    
    const [pendingRequests, setPendingRequests] = useState(0);
    const [totalReceivedFee, setTotalReceivedFee] = useState(0);
    const [approvedRequests, setApprovedRequests] = useState(0);
    const [rejectedRequests, setRejectedRequests] = useState(0);
    const [forPickup, setForPickup] = useState(0);
    const [forDelivery, setForDelivery] = useState(0);
    
    let { data } = useQuery({
        queryKey : ["adminData"],
        queryFn : () => axios.get('https://requestsystembackend-2.onrender.com/api/adminDashboard'),
        refetchInterval : 5000
    })

    useEffect(() => {
        if(data)
        {
            let response = data.data
            setPendingRequests(response.pendingRequest);
            setTotalReceivedFee(response?.totalFee);
            setApprovedRequests(response?.approvedRequest);
            setRejectedRequests(response?.rejectRequest);
            setForPickup(response?.forPickUpRequest);
            setForDelivery(response?.forDeliverRequest);
            console.log("mounted")
        }
    }, [data])
     
    
   

    return (
        <div>
            <AdminNavbar />
            <br />
            <br />
            <Typography variant="h6" className="font-bold text-center">
                Admin Dashboard
            </Typography>
            <br />
            <div className="container m-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4" style={{width : "70%"}}>
                
                    <Card
                    
                    className={`shadow-lg bg-black text-white`}
                    >
                    <CardContent>
                        <Typography variant="h6" className="font-bold">
                            Pending Requests
                        </Typography>
                        <Typography variant="h4" className="font-extrabold mt-2">
                        {pendingRequests}
                        </Typography>
                    </CardContent>
                    </Card>


                    <Card
                    
                    className={`shadow-lg bg-black text-white`}
                    >
                    <CardContent>
                        <Typography variant="h6" className="font-bold">
                        Total Received Fee
                        </Typography>
                        <Typography variant="h4" className="font-extrabold mt-2">
                        {totalReceivedFee}
                        </Typography>
                    </CardContent>
                    </Card>



                    <Card
                    
                    className={`shadow-lg bg-black text-white`}
                    >
                    <CardContent>
                        <Typography variant="h6" className="font-bold">
                        Approved Requests
                        </Typography>
                        <Typography variant="h4" className="font-extrabold mt-2">
                        {approvedRequests}
                        </Typography>
                    </CardContent>
                    </Card>



                    <Card
                    
                    className={`shadow-lg bg-black text-white`}
                    >
                    <CardContent>
                        <Typography variant="h6" className="font-bold">
                        Rejected Requests
                        </Typography>
                        <Typography variant="h4" className="font-extrabold mt-2">
                        {rejectedRequests}
                        </Typography>
                    </CardContent>
                    </Card>




                    <Card
                    
                    className={`shadow-lg bg-black text-white`}
                    >
                    <CardContent>
                        <Typography variant="h6" className="font-bold">
                        For Pickup Requests
                        </Typography>
                        <Typography variant="h4" className="font-extrabold mt-2">
                        {forPickup}
                        </Typography>
                    </CardContent>
                    </Card>



                    <Card
                    
                    className={`shadow-lg bg-black text-white`}
                    >
                    <CardContent>
                        <Typography variant="h6" className="font-bold">
                        For Delivery Requests
                        </Typography>
                        <Typography variant="h4" className="font-extrabold mt-2">
                        { forDelivery}
                        </Typography>
                    </CardContent>
                    </Card>




                  

                    
                
            </div>
        </div>
    )
}

