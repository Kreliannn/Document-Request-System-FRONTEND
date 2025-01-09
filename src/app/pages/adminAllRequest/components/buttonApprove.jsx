"use client"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"
import axios from "axios"
import useRequestStore from "@/app/store/requestStore"

export default function buttonApprove(props)
{
    let removeRequest = useRequestStore((state) => state.removeRequest)

    let mutation = useMutation({
      mutationFn : (data) => axios.patch(`http://localhost:4000/api/approveRequest/${data}`),
    })

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

              mutation.mutate(props.reqId)
              removeRequest(props.reqId)

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