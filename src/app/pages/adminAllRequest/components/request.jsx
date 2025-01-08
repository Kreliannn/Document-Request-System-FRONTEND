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
import axios from 'axios';

export default function RequestTable() {

    let { data } = useQuery({
        queryKey : ['request'],
        queryFn : () => axios.get("http://localhost:4000/api/getRequest")
    })

    let request = data?.data

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
    <TableContainer component={Paper} className="w-full max-w-4xl mx-auto mt-8">
        
      <Table className="min-w-full  shadow-lg">
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="font-bold">Full Name</TableCell>
            <TableCell className="font-bold">Type of Document</TableCell>
            <TableCell className="font-bold">Purpose</TableCell>
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
              <TableCell>{convertDate(row.requestDate)}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="error" 
                  className="bg-red-500 hover:bg-red-600"
                >
                  Reject
                </Button>
              </TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="success" 
                  className="bg-green-500 hover:bg-green-600"
                >
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

