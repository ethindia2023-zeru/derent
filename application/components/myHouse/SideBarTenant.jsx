"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdHome } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import Link from "next/link";

export const SideBarTenant = () => {
  // a state to store the active state of the sidebar
  const [active, setActive] = useState("My House");
  // a funciton to handle the navigation
  const handleNavigate = link => {
    setActive(link);
  };

  // Function to map icon identifier to actual component
  const renderIcon = iconIdentifier => {
    switch (iconIdentifier) {
      case "MdHome":
        return <MdHome />;
      case "TbMoneybag":
        return <TbMoneybag />;
      // Add more cases for other icons as needed
      default:
        return null;
    }
  };
  return (
    <div className="md:flex h-[100vh] min-w-[250px] md:flex-col gap-10 hidden px-5 py-5 lg:flex lg:flex-col ">
      <div className="flex flex-col h-screen py-3 pl-3 pr-0 bg-white  shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li
                className={`rounded-sm hover:bg-black hover:text-white ${
                  "My House" === active && "bg-black text-white"
                }`}
                onClick={() => handleNavigate("My House")}
              >
                <Link href="/my-house" className="flex items-center p-2 space-x-3 rounded-md">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg> */}
                  <MdHome size={24} />
                  <span>My House</span>
                </Link>
              </li>
              <li
                className={`rounded-sm hover:bg-black hover:text-white ${
                  "Deposit" === active && "bg-black text-white"
                }`}
                onClick={() => handleNavigate("Deposit")}
              >
                <Link href="/my-house/deposit" className="flex items-center p-2 space-x-3 rounded-md">
                  <TbMoneybag size={24} />
                  <span>Deposit</span>
                </Link>
              </li>
              <li
                className={`rounded-sm hover:bg-black hover:text-white ${
                  "Auction" === active && "bg-black text-white"
                }`}
                onClick={() => handleNavigate("Auction")}
              >
                <Link href="/my-house/auction" className="flex items-center p-2 space-x-3 rounded-md">
                  <TbMoneybag size={24} />
                  <span>Auction</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
