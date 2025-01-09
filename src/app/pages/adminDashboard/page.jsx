import useUserStore from "@/app/store/userStore"
import AdminNavbar from "@/app/publicComponent/adminNavbar";
import { Card, CardContent, Typography } from '@mui/material';

export default function AdminDashboard() {

    
   
    let pendingRequests = 2
    let Fee = 2
    let approvedRequests = 2
    let rejectedRequest = 2
    let forPickupRequests = 2
    let forDeliveryRequests = 2

     
    
      const stats = [
        { title: 'Pending Requests', count: pendingRequests, color: 'bg-yellow-500' },
        { title: 'Total Received Fee', count: Fee, color: 'bg-purple-500' },
        { title: 'Approved Requests', count: approvedRequests, color: 'bg-green-500' },
        { title: 'Rejected Requests', count: rejectedRequest, color: 'bg-red-500' },
        { title: 'For Pickup', count: forPickupRequests, color: 'bg-blue-500' },
        { title: 'For Delivery', count: forDeliveryRequests, color: 'bg-gray-500' },
      ];

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

