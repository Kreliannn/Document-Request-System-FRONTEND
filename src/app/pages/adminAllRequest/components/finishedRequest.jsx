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

export default function finishedRequestTable() {

    let { data } = useQuery({
        queryKey : ['request'],
        queryFn : () => axios.get("http://localhost:4000/api/getRequest")
    })

    let request = data?.data


  return (
    <TableContainer component={Paper} className="w-100 mx-auto mt-8">
       
      <Table className="w-100 mx-auto shadow-lg">
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="font-bold">Full Name</TableCell>
            <TableCell className="font-bold">email</TableCell>
            <TableCell className="font-bold">Type of Document</TableCell>
            <TableCell className="font-bold">address</TableCell>
            <TableCell className="font-bold">modeOfPayment</TableCell>
            <TableCell className="font-bold"> transaction mode </TableCell>
            <TableCell className="font-bold"> fee </TableCell>
            <TableCell className="font-bold">Status</TableCell>
            <TableCell className="font-bold">completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {request?.map((row) => (
            <TableRow key={row._id} className="hover:bg-gray-50">
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.typeOfDocument}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.modeOfPayment}</TableCell>
              <TableCell>{row.transaction}</TableCell>
              <TableCell>{row.fee}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="success" 
                  className="bg-green-500 hover:bg-green-600"
                >
                  Claimed
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

