import Link from "next/link"

export default function Home() {
  return(
    <div className="flex items-center justify-center h-screen">
      <div className="container m-auto   flex justify-center">
          <Link href="/pages/login" className='px-4 py-2 shadow bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none m-4'> sign in </Link>
          <Link href="/pages/register" className='px-4 py-2 shadow bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none m-4 '> sign up </Link>
          <Link href="/pages/adminLogin" className='px-4 py-2 shadow bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none m-4 '> Admin </Link>
      </div>
    </div>
  )
}
