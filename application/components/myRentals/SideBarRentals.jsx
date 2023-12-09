"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'
import { location } from '@/assets'
import { useRouter } from 'next/navigation';
import { MdList,MdOutlineManageAccounts } from "react-icons/md";

export const SideBarRentals = () => {
    // a state to store the active state of the sidebar
    const router=useRouter();
    const [active,setActive]=useState("My Listing");
    // a funciton to handle the navigation
    const handleNavigate=(link)=>{
        setActive(link);
    }

  return (
    <div
    className="md:flex h-[100vh] min-w-[250px] md:flex-col gap-10 hidden px-5 py-5 lg:flex lg:flex-col "
    >
      {/* {
        NAV_ICONS.map((link)=>{
            return (
                <Link href={link.link}>
                    <div onClick={()=>handleNavigate(link)} className={`flex px-3 rounded-lg py-2 gap-5 ${link.label===active&&'bg-[#2A3E5A]'} justify-start items-center hover:bg-[#2A3E5A] cursor-pointer transition-all duration-300 text-[#B0C5E7] hover:text-white`}>
                    {renderIcon(link.image)}
                    <p className=" ">{link.label}</p>
                    </div>
                </Link>
            )
        })
      }  */}
      <div className="flex flex-col h-screen py-3 pl-3 pr-0 bg-white  shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className={`rounded-sm hover:bg-black hover:text-white ${"My Listing"===active&&'bg-black text-white'}`} onClick={()=>handleNavigate("My Listing")}>
                <Link
                  href="/my-rentals"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <MdList size={24}/>
                  <span>My Listings</span>
                </Link>
              </li>
              <li className={`rounded-sm hover:bg-black hover:text-white ${"Manage"===active&&'bg-black text-white'}`} onClick={()=>handleNavigate("Manage")}>
                <Link
                  href="/my-rentals/dues"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                <MdOutlineManageAccounts size={24}/>
                  <span>Manage</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
