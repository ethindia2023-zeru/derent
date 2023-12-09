"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useProvider } from "wagmi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useConnectModal, useAccountModal, useChainModal } from "@rainbow-me/rainbowkit";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { loadPropertyListing, setInitialPropertyListingsLoaded } from "@/store/slices/homeSlice";

const DropDown = () => {
  // for routing
  const router = useRouter();
  const dispatch = useDispatch();
  const pro = useProvider();

  useEffect(() => {
    dispatch(loadPropertyListing({ pro }));
    dispatch(setInitialPropertyListingsLoaded({ initialPropertyListingsLoaded: true }));
    console.log("dispatched initial load");
  }, []);
  // for selection from drop down
  const handleSelectChange = selectedOption => {
    switch (selectedOption) {
      case "MyHouses":
        router.push("/my-house");
        break;
      case "MyRentals":
        router.push("/my-rentals");
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative inline-block">
      <div className="rounded-md focus:outline-none focus:ring focus:border-blue-300">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="py-2 px-2 rounded-[5px] text-white transition-opacity duration-300">My Profile</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSelectChange("MyHouses")}>
              <DropdownMenuLabel>My House</DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSelectChange("MyRentals")}>
              <DropdownMenuLabel>My Rentals</DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export const Navbar = () => {
  const { openConnectModal } = useConnectModal();

  const { address, isConnected } = useAccount();
  return (
    <div className="px-5 flex justify-between my-auto h-full pt-2 pb-6">
      <Link href="/">
        <Image width={85} height={85} alt="logoderent" src={"/logoderent.png"}></Image>
      </Link>
      <div className="flex gap-5 my-auto h-full">
        {isConnected && (
          <div className="space-x-4">
            {" "}
            <Link href="/post-for-rent">
              <Button className="py-2 px-2 rounded-[5px] text-white transition-opacity duration-300">
                Post for rent
              </Button>
            </Link>
            <DropDown />
          </div>
        )}
        {!isConnected && (
          <Button
            className="py-2 px-2 rounded-[5px] text-white transition-opacity duration-300"
            onClick={openConnectModal}
          >
            Post for rent
          </Button>
        )}
        <ConnectButton className="text-white" chainStatus="icon" />
      </div>
    </div>
  );
};
