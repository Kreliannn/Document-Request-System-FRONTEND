"use client"
import useUserStore from "@/app/store/userStore"
import UserNavbar from "@/app/publicComponent/userNavbar"
import RequestForm from "./components/form"

export default function UserDashboard() {

    let user = useUserStore(state => state.user)

    return (
        <div>
            <UserNavbar />
   
            <br />
            <div className="container m-auto" style={{width : "60%"}}>
                <RequestForm />
            </div>
          
            <br /><br /><br />
        </div>
    )
}