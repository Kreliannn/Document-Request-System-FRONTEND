"use client"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"


export default function ApproveButton(props)
{

    let requestId = props.reqId

    

    let approve = () => {
        Swal.fire({
            title: "Are you sure you want to approve?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "approved!",
                text: "request has been approved.",
                icon: "success"
              });
            }
          });
    }

    return(
        <>
            <Button 
                variant="contained" 
                color="success" 
                className="bg-green-500 hover:bg-green-600"
                onClick={approve}
                
            >
                  Approve
            </Button>
        </>
    )
}