"use client"
import useUserStore from "@/app/store/userStore"
import UserNavbar from "@/app/publicComponent/userNavbar"

export default function UserDashboard() {

    let user = useUserStore(state => state.user)

    return (
        <div>
            <UserNavbar />
            <h1>User Dashboard welcome {user?.name}</h1>
        </div>
    )
}