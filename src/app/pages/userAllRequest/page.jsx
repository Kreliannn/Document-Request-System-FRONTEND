"use client"
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button 
} from '@mui/material';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import UserNavbar from '@/app/publicComponent/userNavbar';
import CancelButton from './components/cancelButton';

import useUserRequestStore from "@/app/store/userRequestStore"


export default function RequestTable() {
  
    let request = useUserRequestStore((state) => state.request)
    let setRequest = useUserRequestStore((state) => state.setRequest)

    let { data } = useQuery({
      queryKey : ["userRequest"],
      queryFn : () => axios.get("http://localhost:4000/api/userRequest", {withCredentials : true})
    })

     useEffect(() => {
        if(data)
        {
          let res = data.data
          setRequest(res.reverse())
        }
     }, [data])

   
 

    let convertDate = (rawDate) =>
    {
        const date = new Date(rawDate);

        // Extract components
        const month = date.getMonth() + 1; // Months are 0-indexed
        const day = date.getDate();
        const year = date.getFullYear();

        // Combine into desired format
        const formattedDate = `${month}/${day}/${year}`;
        return(formattedDate); // Output: 1/8/2025
    }


   

 

  return (
    <>
        <UserNavbar />
        <br />
       <h1 className='text-center text-xl m-3'> User Request Status </h1>
        <hr />
        <TableContainer component={Paper} className="w-4/5 mx-auto mt-8">
        
        <Table className="min-w-full  shadow-lg">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Type of Document</TableCell>
              <TableCell className="font-bold">ModeOfPayment</TableCell>
              <TableCell className="font-bold">Transaction</TableCell>
              <TableCell className="font-bold">Fee</TableCell>
              <TableCell className="font-bold">RequestDate</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {request?.map((row) => (
              <TableRow key={row._id} className="hover:bg-gray-50">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.typeOfDocument}</TableCell>
                <TableCell>{row.modeOfPayment}</TableCell>
                <TableCell>{row.transaction}</TableCell>
                <TableCell>{row.fee}</TableCell>
                <TableCell>{convertDate(row.requestDate)}</TableCell>
                <TableCell>
                  {row.status === "Pending" && (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                      {row.status}
                    </span>
                  )}
                  {row.status === "InProcess" && (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                      {row.status}
                    </span>
                  )}
                  {row.status === "ToReceived" && (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-violet-800 bg-violet-100 rounded-full">
                      {row.status}
                    </span>
                  )}
                  {row.status === "Rejected" && (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
                      {row.status}
                    </span>
                  )}
                  {row.status === "Completed" && (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                      {row.status}
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <CancelButton status={row.status} reqId={row._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
