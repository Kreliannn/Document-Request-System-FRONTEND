"use client"
import AdminNavbar from "@/app/publicComponent/adminNavbar"
import RequestTable from "./components/request"
import ApprovedRequestTable from "./components/approvedRequest"
import FinishedRequestTable from "./components/finishedRequest"
import { useState } from "react"
import { Button } from "@mui/material"

export default function AdminAllRequest()
{
    let [ table, setTable ] = useState("request")


    return(
        <div className='w-full'> 
            <AdminNavbar />
            <br /><br />
            <div className='container m-auto w-80 flex justify-center gap-4 '>

                <Button variant={(table == "request") ? "contained" : "outlined"} onClick={ ()=> setTable("request")}>
                    Pending
                </Button>

                <Button variant={(table == "approved") ? "contained" : "outlined"} onClick={ ()=> setTable("approved")} >
                    InProcess
                </Button>

                <Button variant={(table == "finished") ? "contained" : "outlined"} onClick={ ()=> setTable("finished")} >
                    ToPickUP/Deliver
                </Button>

            </div>

            <div className='container-fluid m-auto w-full '>
                {(table == "request") ?  <RequestTable /> : null}
                {(table == "approved") ?  <ApprovedRequestTable /> : null}
                {(table == "finished") ?  <FinishedRequestTable /> : null}
            </div>
           
            
        </div>
    )
}   