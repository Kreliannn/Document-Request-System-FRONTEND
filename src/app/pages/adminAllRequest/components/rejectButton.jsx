"use client"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"


export default function RejectButton(props)
{
    let requestId = props.reqId

    let approve = () => {
        Swal.fire({
            title: "Are you sure you want to Reject this request?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "rejected!",
                text: "request has been rejected.",
                icon: "success"
              });
            }
          });
    }

    return(
        <>
            <Button 
                 variant="contained" 
                 color="error" 
                 className="bg-red-500 hover:bg-red-600"
                onClick={approve}
            >
                  Reject
            </Button>
        </>
    )
}