import Image from 'next/image'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function LandingpageNavbar()
{

    return(
        <nav className="bg-white/95 backdrop-blur-sm fixed w-full z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/img/img1.png"
              alt="Barangay Logo"
              width={70}
              height={70}
              className="rounded-full"
            />
            <div className="text-left">
              <h1 className="text-lg font-bold text-gray-800">Barangay Kanlurang Mayao</h1>
              <p className="text-sm text-gray-600">Lucena City</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outlined" >
              <Link href="/">Home</Link>
            </Button>
            <Button variant="outlined" >
              <Link href="/pages/login">Sign In</Link>
            </Button>
            <Button variant="outlined" >
              <Link href="/pages/register">Sign Up</Link>
            </Button>
            <Button variant="contained" >
              <Link href="/pages/adminLogin">Admin Login</Link>
            </Button>
          </div>
        </div>
      </nav>
    )
}