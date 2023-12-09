"use client"
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { location } from '@/assets';

export const SideBarTenant = () => {
   // a state to store the active state of the sidebar
   const [active,setActive]=useState('assignment');
   // a funciton to handle the navigation
   const handleNavigate=(link)=>{
       setActive(link.label)
   }
   const NAV_ICONS=[
    {
        label:"My Listing",
        image:location,
        link:""
    },
    {
        label:"Initial Deposit",
        image:location,
        link:"/my-houses/deposit"
    }
]
    return (
   <div
   className="md:flex h-[100vh] min-w-[250px] md:flex-col gap-10 hidden px-5 py-5 lg:flex lg:flex-col "
   >
     {
       NAV_ICONS.map((link)=>{
           return (
               <Link href={link.link}>
                   <div onClick={()=>handleNavigate(link)} className={`flex px-3 rounded-lg py-2 gap-5 ${link.label===active&&'bg-[#2A3E5A]'} justify-start items-center hover:bg-[#2A3E5A] cursor-pointer transition-all duration-300 text-[#B0C5E7] hover:text-white`}>
                   <Image src={link.image} alt={link.label} width={36} height={36}/>
                   <p className=" ">{link.label}</p>
                   </div>
               </Link>
           )
       })
     } 
   </div>);
}
