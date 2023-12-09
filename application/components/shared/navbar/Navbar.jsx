"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useProvider } from "wagmi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useConnectModal, useAccountModal, useChainModal } from "@rainbow-me/rainbowkit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  // for post
  const [formData, setFormData] = useState({
    title:"",
    address: "",
    rent: "",
    advance: "",
    securityDeposit: "",
    isAuction:false,
    image: null,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setFormData(prevData => ({ ...prevData, image: file }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to server)
    console.log("Form submitted:", formData);
  };
  const handleRadio=(e)=>{
    const {value,name}=e.target;
    if(value==="for_rent"){
      setFormData(prevData=>({...prevData,isAuction:false}));
    }
    else{
      setFormData(prevData=>({...prevData,isAuction:true}));
    }
  }
  return (
    <div className="px-5 flex justify-between my-auto h-full pt-2 pb-6">
      <Link href="/">
        <Image width={85} height={85} alt="logoderent" src={"/logoderent.png"}></Image>
      </Link>
      <div className="flex gap-5 my-auto h-full">
        {isConnected && (
          <div className="space-x-4">
            {" "}
            {/* <Link href="/post-for-rent"> */}
            <Dialog className="mt-5 my-auto w-fit">
              <DialogTrigger><Button className="py-2 px-2 rounded-[5px] text-white transition-opacity duration-300">
                Post for rent
              </Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cityState" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="cityState" className="block text-gray-700 text-sm font-bold mb-2">
              Rent
            </label>
            <input
              type="number"
              id="rent"
              name="rent"
              placeholder="Eth"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="address"
            value={formData.address}
            onChange={handleChange}
            rows="1"
            className="w-full px-3 py-2 border rounded-md"
            required
          ></textarea>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">

          <div>
            <label htmlFor="financials" className="block text-gray-700 text-sm font-bold mb-2">
              Security Deposit
            </label>
            <input
              type="number"
              id="secuirtyDeposit"
              name="securityDeposit"
              placeholder="Eth"
              value={formData.securityDeposit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="financials" className="block text-gray-700 text-sm font-bold mb-2">
              Advance:
            </label>
            <input
              type="number"
              id="advance"
              name="advance"
              placeholder="Eth"
              value={formData.advance}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* for the radio button */}
        <div className="max-w-md  bg-white p-6 rounded-md shadow-md">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Listing Type:
      </label>

      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="listing_type"
            value="for_rent"
            onClick={handleRadio}
            defaultChecked
          />
          <span className="ml-2">For Rent</span>
        </label>
        <label className="inline-flex items-center ml-6">
          <input
            type="radio"
            className="form-radio text-blue-500"
            name="listing_type"
            onClick={handleRadio}
            value="auction"
          />
          <span className="ml-2">Auction</span>
        </label>
      </div>
    </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2"
          />
        </div>

        <Button
          type="submit"
          className=" flex justify-center mx-auto "
        >
          Post
        </Button>
      </form>
               </div>
              </DialogContent>
            </Dialog>

            {/* </Link> */}
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
