"use client"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"
import useRequestStore from "@/app/store/requestStore"
import axios from "axios"

export default function CancelButton(props)
{
    
  let removeRequest = useRequestStore((state) => state.removeRequest)

    let mutation = useMutation({
      mutationFn : (data) => axios.patch(`http://localhost:4000/api/rejectRequest/${data}`),
    })

    let cancel = () => {
        Swal.fire({
            title: "Are you sure you want to Cancel request?",
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
                title: "request cancelled!",
                text: "request has been removed.",
                icon: "success"
              });
            }
          });
    }

    return(
        <>
            <Button 
                 variant={(props.status == "Pending") ? "contained" : "disabled" } 
                 color={(props.status == "Pending") ? "error" : "success" } 
                 className="hover:bg-red-700"
                onClick={cancel}
            >
                  cancel
            </Button>
        </>
    )
}