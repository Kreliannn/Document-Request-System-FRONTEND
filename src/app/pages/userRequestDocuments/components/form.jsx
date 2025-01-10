'use client'

import React, { useState } from 'react';
import { 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Typography,
  ThemeProvider,
  createTheme,
  Paper
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useUserStore from '@/app/store/userStore';
import Swal from 'sweetalert2';
const theme = createTheme();

export default function RequestDocumentForm() {

    let user = useUserStore(state => state.user)

  const [fullName, setFullName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [transaction, setTransaction] = useState('');
 
  const [feeDoc, setFeeDoc] = useState(0);
  const [feeDel, setFeeDel] = useState(0);

  let mutation = useMutation({
    mutationFn: (data) => axios.post('http://localhost:4000/api/requestDocuments', data, { withCredentials: true }),
    onSuccess: (response) => {
      setFullName('')
      setEmail('')
      setDateOfBirth('')
      setAge('')
      setGender('')
      setAddress('')
      setContactNumber('')
      setDocumentType('')
      setPurpose('')
      setPaymentMode('')
      setTransaction('')
      setFeeDel(0)
      setFeeDel(0)
      Swal.fire({
        icon: 'success',
        title: response.data,
        text: "Your request has been submitted"
      })
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: error.response.data,
        text: "Please try again"
      })
    }
  })

  let submit = () => {
    mutation.mutate({
        name : fullName,
        email : email,
        dateOfBirth : dateOfBirth,
        age : age,
        gender : gender,
        address : address,
        contactNumber : contactNumber,
        typeOfDocument : documentType,
        purpose : purpose,
        transaction : transaction,
        modeOfPayment : paymentMode,
        referenceNumber : referenceNumber,
        fee : (feeDoc + feeDel)
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto p-4">
        <Typography variant="h4" className="mb-4 text-center">
          Barangay Document Request Form
        </Typography>
       
        <div  className="space-y-4">
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="shadow-lg"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow-lg"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              className="shadow-lg"
              required
            />
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="shadow-lg"
            />
            <FormControl fullWidth>
              <InputLabel  className='bg-white'>Gender</InputLabel>
              <Select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="shadow-lg"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            multiline
            rows={2}
            className="shadow-lg"
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className="shadow-lg"
          />
          <FormControl fullWidth>
            <InputLabel className='bg-white'>Type of Document</InputLabel>
            <Select
              name="documentType"
              value={documentType}
              onChange={(e) => {
                let document = e.target.value
                setDocumentType(document)
                let value = 0
                switch(document)
                {
                  case "Indigency":
                    value = 30
                  break;

                  case "Clearance":
                    value = 25
                  break;

                  case "Residency":
                    value = 40
                  break;

                  case "BussinessPermit":
                    value = 450
                  break;

                  case "Endorsment":
                    value = 50
                  break;
                }

                setFeeDoc(value)
              }}
              required
              className="shadow-lg"
            >
              <MenuItem value="Indigency"> Barangay Indigency Certificate  ₱30 </MenuItem>
              <MenuItem value="Clearance"> Barangay Clearance ₱25</MenuItem>
              <MenuItem value="Residency"> Barangay Residency Certificate ₱40</MenuItem>
              <MenuItem value="BussinessPermit">Barangay Bussiness Permit ₱450</MenuItem>
              <MenuItem value="Endorsment">Barangay Endorsment ₱50</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Purpose"
            name="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            multiline
            rows={3}
            className="shadow-lg"
          />
          <FormControl fullWidth>
            <InputLabel className='bg-white'>Mode of Payment</InputLabel>
            <Select
              name="paymentMode"
              value={paymentMode}
              onChange={(e) => 
              {
                let payment = e.target.value
                setPaymentMode(payment)
                
              }}
              required
              className="shadow-lg"
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="BankTransfer">Bank Transfer</MenuItem>
              <MenuItem value="gcash">GCash</MenuItem>
              <MenuItem value="creditCard">Credit Card</MenuItem>
            </Select>
          </FormControl>

          {
            (paymentMode == "creditCard" || paymentMode == "gcash" || paymentMode == "BankTransfer" ) ? <TextField fullWidth label="Reference Number" name="referenceNumber" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} required className="shadow-lg" /> : null
          } 
          
          <FormControl fullWidth>
            <InputLabel className='bg-white'>Transaction</InputLabel>
            <Select
              name="transaction"
              value={transaction}
              onChange={(e) => {
                const value = e.target.value;
                setTransaction(value);
                setFeeDel(value === "deliver" ? 50 : 0);
                
              }}
              required
              className="shadow-lg"
            >
              <MenuItem value="pick up">pick up</MenuItem>
              <MenuItem value="deliver">deliver ₱50</MenuItem>
            </Select>
          </FormControl>

          

          <Paper className="shadow-lg border">
            <Typography variant="h4" className="m-3 text-bold">
              Fee: ₱{feeDoc + feeDel}
            </Typography>

            {(paymentMode === "creditCard" || 
              paymentMode === "gcash" || 
              paymentMode === "BankTransfer") && (
                <Typography variant="h6" className="m-3">
                  If you choose online payment, the transaction will follow a "payment-first" policy. Please ensure that you include the reference number before submitting your request; otherwise, the admin will reject it.
                </Typography>
            )}
          </Paper>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="w-full shadow-lg h-12" 
            onClick={submit}
          >
            Submit Request
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

