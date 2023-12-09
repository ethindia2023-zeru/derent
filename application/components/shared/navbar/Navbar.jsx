"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
const DropDown=()=>{
  // for routing
  const router=useRouter();
  // for selection from drop down
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    switch (selectedOption) {
      case 'MyHouses':
        router.push('/my-houses');
        break;
      case 'MyRentals':
        router.push('/my-rentals')
        break;
      case 'Disconnect':
        break;
      default:
        break;
    }
  };
  return  <div className="relative inline-block">
  <select
    id="profileDropdown"
    className=" py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
    onChange={handleSelectChange}
  >
    <option selected disabled>My Profile</option>
    <option value="MyHouses">My Houses</option>
    <option value="MyRentals">My Rentals</option>
    <option value="Disconnect">Disconnect</option>
  </select>
</div>
}
export const Navbar = () => {
  const { address, isConnected } = useAccount()
  return (
    <div className=' mx-5 flex justify-between my-auto h-full mb-5'>
    <Link href="/">Logo</Link>
        <div className='flex gap-5 my-auto h-full'>
        <Link href="/post-for-rent">
          <button className='py-2 px-2 bg-blue-500 rounded-[5px] text-white hover:bg-blue-600 transition-opacity duration-300'>Post for rent</button>
        </Link>
        {
          isConnected?<ConnectButton/>:<DropDown/>
        }
        </div>
    </div>
  )
}

