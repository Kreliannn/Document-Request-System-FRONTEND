'use client'

import Image from 'next/image'
import { Button } from '@mui/material'
import Link from 'next/link'
import "./style.css"
import LandingpageNavbar from './publicComponent/landingpageNavbar'



export default function LandingPage() {
  return (
    <div className="min-h-screen to-white landingPage" style={{backgroundImage: "url('/public/img/img2.jpeg')",}}>
      {/* Navigation Bar */}
     <LandingpageNavbar />

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex  justify-center example"
        style={{
          
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-1 text-center text-white px-4">
          <br /><br /> <br /><br /> <br /> <br /> <br />
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
           Barangay Kanlurang Mayao
          </h1>
          <p className="text-md md:text-2xl mb-8 max-w-3xl mx-auto">
            Your one-stop portal for requesting barangay documents and certificates online
          </p>
          <Button size="lg" className="text-lg px-8" variant="contained" color='primary'>
            <Link href='/pages/login'> Get Started </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Document Requests",
                description: "Request barangay clearance, certificates, and other documents online"
              },
              {
                title: "Quick Processing",
                description: "Fast and efficient processing of your document requests"
              },
              {
                title: "Digital Records",
                description: "Secure digital storage of your barangay records"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Barangay Kanlurang Mayao. All rights reserved.</p>
          <p className="text-gray-400">Lucena City, Philippines</p>
        </div>

        

      </footer>
    </div>
  )
}

