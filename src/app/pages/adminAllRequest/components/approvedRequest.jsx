'use client'

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
import { useQuery } from '@tanstack/react-query';
import ButtontoReceive from './buttontoReceive';
import axios from 'axios';
import { useEffect } from 'react';
import useApproveRequestStore from '@/app/store/approveRequestStore';

export default function ApprovedRequestTable() {

    let request = useApproveRequestStore((state) => state.request)
    let setRequest = useApproveRequestStore((state) => state.setRequest)

    let { data } = useQuery({
        queryKey : ['request'],
        queryFn : () => axios.get("https://requestsystembackend-2.onrender.com/api/getRequest/InProcess")
    })

    useEffect(() => {
      if(data)
      {
        setRequest(data.data)
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
      <TableContainer component={Paper} className="w-full mx-auto mt-8">
       
        <Table className="w-full shadow-lg ">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Document Type</TableCell>
              <TableCell className="font-bold">Purpose</TableCell>
              <TableCell className="font-bold">DateOfBirth</TableCell>
              <TableCell className="font-bold">Age</TableCell>
              <TableCell className="font-bold">Gender</TableCell>
              <TableCell className="font-bold">Address</TableCell>
              <TableCell className="font-bold">Number</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {request?.map((row) => (
              <TableRow key={row._id} className="hover:bg-gray-50">
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.typeOfDocument}</TableCell>
                <TableCell>{row.purpose}</TableCell>
                <TableCell>{convertDate(row.dateOfBirth)}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.contactNumber}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <ButtontoReceive reqId={row._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  