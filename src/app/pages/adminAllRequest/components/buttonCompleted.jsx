"use client"
import { Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"
import axios from "axios"
import useCompleteRequestStore from '@/app/store/completeRequestStore';

export default function ButtontoComplete(props)
{
    let removeRequest = useCompleteRequestStore((state) => state.removeRequest)

    let mutation = useMutation({
      mutationFn : (data) => axios.patch(`https://requestsystembackend-2.onrender.com/api/completeRequest/${data}`),
    })

    let Complete = () => {
        Swal.fire({
            title: "transaction completed?",
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
                title: "record saved in the history",
                text: "user received the document",
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
                onClick={Complete}
                
            >
                  Complete
            </Button>
        </>
    )
}