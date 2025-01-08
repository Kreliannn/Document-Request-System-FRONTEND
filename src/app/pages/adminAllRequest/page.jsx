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
                    Request
                </Button>

                <Button variant={(table == "approved") ? "contained" : "outlined"} onClick={ ()=> setTable("approved")} >
                    Approved
                </Button>

                <Button variant={(table == "finished") ? "contained" : "outlined"} onClick={ ()=> setTable("finished")} >
                    Completed
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