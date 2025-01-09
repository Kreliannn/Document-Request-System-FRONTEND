"use client"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"
import axios from "axios"
import useApproveRequestStore from '@/app/store/approveRequestStore';

export default function ButtontoReceive(props)
{
    let removeRequest = useApproveRequestStore((state) => state.removeRequest)

    let mutation = useMutation({
      mutationFn : (data) => axios.patch(`http://localhost:4000/api/toReceiveRequest/${data}`),
    })

    let approve = () => {
        Swal.fire({
            title: "this document is ready to received??",
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
                title: "document is Ready for Pickup/Delivery!",
                text: "sready to received.",
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
                  toReceive
            </Button>
        </>
    )
}