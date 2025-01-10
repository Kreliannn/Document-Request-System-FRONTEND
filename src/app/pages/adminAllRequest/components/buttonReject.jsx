"use client"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"
import useRequestStore from "@/app/store/requestStore"
import axios from "axios"

export default function ButtonReject(props)
{
    
  let removeRequest = useRequestStore((state) => state.removeRequest)

    let mutation = useMutation({
      mutationFn : (data) => axios.patch(`https://requestsystembackend-2.onrender.com/api/rejectRequest/${data}`),
    })

    let reject = () => {
        Swal.fire({
            title: "Are you sure you want to Reject this request?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {

            mutation.mutate(props.reqId)
            removeRequest(props.reqId)

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
                onClick={reject}
            >
                  Reject
            </Button>
        </>
    )
}