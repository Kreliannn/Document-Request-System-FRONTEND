'use client'

import React, { use } from 'react';
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
import ButtonApprove from './buttonApprove';
import ButtonReject from './buttonReject';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useRequestStore from '@/app/store/requestStore';
import { useEffect } from 'react';

export default function RequestTable() {

  let request = useRequestStore((state) => state.request)
  let setRequest = useRequestStore((state) => state.setRequest)

    let { data } = useQuery({
        queryKey : ['request'],
        queryFn : () => axios.get("http://localhost:4000/api/getRequest/Pending")
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
    <TableContainer component={Paper} className="w-100 mx-auto mt-8">
        
      <Table className="min-w-full  shadow-lg">
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="font-bold">Full Name</TableCell>
            <TableCell className="font-bold">Type of Document</TableCell>
            <TableCell className="font-bold">Purpose</TableCell>
            <TableCell className="font-bold">ModeOfPayment</TableCell>
            <TableCell className="font-bold">Fee</TableCell>
            <TableCell className="font-bold">ReferenceNum</TableCell>
            <TableCell className="font-bold">RequestDate</TableCell>
            <TableCell className="font-bold">Status</TableCell>
            <TableCell className="font-bold">Reject</TableCell>
            <TableCell className="font-bold">Approve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {request?.map((row) => (
            <TableRow key={row._id} className="hover:bg-gray-50">
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.typeOfDocument}</TableCell>
              <TableCell>{row.purpose}</TableCell>
              <TableCell>{row.modeOfPayment}</TableCell>
              <TableCell>₱{row.fee}</TableCell>
              <TableCell>{(row.referenceNumber) ? row.referenceNumber : "none"}</TableCell>
              <TableCell>{convertDate(row.requestDate)}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <ButtonReject reqId={row._id} />
              </TableCell>
              <TableCell>
                <ButtonApprove reqId={row._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

