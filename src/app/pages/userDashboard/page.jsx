"use client"
import useUserStore from "@/app/store/userStore"
import UserNavbar from "@/app/publicComponent/userNavbar"
import { Card, CardContent, Typography } from '@mui/material';

export default function UserDashboard() {

    
    let pendingRequests = 2
    let completedRequest = 2
    let approvedRequests = 2
    let rejectedRequest = 2
    let forPickupRequests = 2
    let forDeliveryRequests = 2

     
    
      const stats = [
        { title: 'Pending Requests', count: pendingRequests, color: 'bg-yellow-500' },
        { title: 'Completed Requests', count: completedRequest, color: 'bg-purple-500' },
        { title: 'Approved Requests', count: approvedRequests, color: 'bg-green-500' },
        { title: 'Rejected Requests', count: rejectedRequest, color: 'bg-red-500' },
        { title: 'For Pickup', count: forPickupRequests, color: 'bg-blue-500' },
        { title: 'For Delivery', count: forDeliveryRequests, color: 'bg-gray-500' },
      ];

    return (
        <div>
            <UserNavbar />
            <br />
            <br />
            <Typography variant="h6" className="font-bold text-center">
                User Dashboard
            </Typography>
            <br />
            <div className="container m-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4" style={{width : "70%"}}>
                {stats.map((stat, index) => (
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

