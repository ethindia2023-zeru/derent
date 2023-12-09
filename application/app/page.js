"use client";
import Image from "next/image";
import { useState } from "react";
import { search, filter } from "@/assets";
import { houseData, auctionData } from "@/data";
import { RentCard } from "@/components/home/RentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { paySecurityDeposit } from "@/actions/paySecurityDeposit";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { GetTransactionProvider } from "@/helpers/wallet/GetTransactionProvider";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bid, setBid] = useState("");

  const propertyListing = useSelector(state => state.home.propertyListing);
  const auctionStarted = useSelector(state => state.home.auctionStarted);

  const signer = GetTransactionProvider();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSearchTerm(value);
  };

  // a function to handle the search
  const handleSearch = () => {
    // logic for searching a home for rent
    console.log("searching for", searchTerm);
  };

  const handlePayInitialDeposit = async (propertyId, securityDeposit) => {
    const success = await paySecurityDeposit(signer?.provider, propertyId, securityDeposit);
    if (success) {
      console.log("success", success);
    } else {
      console.log("failed");
    }
  };

  const handleBidInput = e => {
    const { value } = e.target;
    const newBid = parseFloat(value);
    console.log("newBid: ", newBid);
    setBid(newBid);
  };

  return (
    <div className="w-full">
      {/* search bar */}
      <div className="relative mx-auto w-fit mb-10">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer" onClick={handleSearch}>
          <Image src={search} alt="search" height={24} width={24} />
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-2 hover:text-gray-700 cursor-pointer rounded-full "
          onClick={handleSearch}
        >
          <Image src={filter} alt="search" height={24} width={24} />
        </div>
        <input
          type="text"
          className="mx-auto pl-12 w-[817px] bg-transparent pr-4 py-2 border border-gray-300 rounded-full outline-none"
          placeholder="Search"
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          onChange={handleInputChange}
        />
      </div>
      {/* tab section */}
      <Tabs defaultValue="rent">
        <TabsList className="flex justify-center w-auto">
          <TabsTrigger value="rent">Rent</TabsTrigger>
          <TabsTrigger value="auction">Auction</TabsTrigger>
        </TabsList>
        <TabsContent value="rent">
          <div className="mx-5 my-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 place-content-center w-full gap-1">
            {propertyListing &&
              Object.values(propertyListing)
                .filter(house => {
                  if (house.propertyId == 0) return false;
                  if (house.isAuction) return false;
                  return true;
                })
                .map((house, index) => (
                  <Dialog key={index}>
                    <DialogTrigger>
                      <RentCard
                        key={index}
                        image={"/newHouse.jpg"}
                        price={house.rent}
                        address={house.propertyLocation}
                        title={house.propertyName}
                      />{" "}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rent House</DialogTitle>
                        <DialogDescription>
                          <Card>
                            <CardHeader>
                              <CardTitle>{house.propertyName}</CardTitle>
                              <CardDescription>Pay the initial deposit and book your house</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between mb-10">
                                <div className="flex flex-col">
                                  Rent: <span>{house.rent && ethers.utils.formatEther(house.rent.toString())} ETH</span>
                                </div>
                                <div className="flex flex-col">
                                  Advance:{" "}
                                  <span>{house.advance && ethers.utils.formatEther(house.advance.toString())} ETH</span>
                                </div>
                                <div className="flex flex-col">
                                  Initial Deposit:{" "}
                                  <span>
                                    {house.securityDeposit &&
                                      ethers.utils.formatEther(house.securityDeposit.toString())}{" "}
                                    ETH
                                  </span>
                                </div>
                              </div>
                              <Button
                                className="mx-auto w-fit flex justify-center"
                                onClick={() => handlePayInitialDeposit(house.propertyId, house.securityDeposit)}
                              >
                                Pay
                              </Button>
                            </CardContent>
                          </Card>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ))}
          </div>
        </TabsContent>
        <TabsContent value="auction">
          <div className=" mx-5 my-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 place-content-center w-full gap-1">
            {propertyListing &&
              Object.values(propertyListing)
                .filter(house => {
                  if (!house.isAuction) return false;
                  return true;
                })
                .map((house, index) => (
                  <Dialog key={index}>
                    <DialogTrigger>
                      <RentCard
                        key={index}
                        image={"/newHouse.jpg"}
                        price={house.rent}
                        address={house.propertyLocation}
                        title={house.propertyName}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          <div className="flex items-center">
                            Auction{" "}
                            {auctionStarted ? (
                              <div className="text-[green] pl-2">(Running)</div>
                            ) : (
                              <div className="text-[red] pl-2">(Closed)</div>
                            )}
                          </div>
                        </DialogTitle>
                        <DialogDescription>
                          <Card>
                            <CardHeader>
                              <CardTitle>{house.propertyName}</CardTitle>
                              {auctionStarted ? (
                                <CardDescription>Please place your bid here</CardDescription>
                              ) : (
                                <CardDescription>Please come back after 5</CardDescription>
                              )}
                            </CardHeader>
                            {auctionStarted && (
                              <CardContent>
                                <div className="flex flex-col items-center justify-between mb-10">
                                  <div className="flex items-center justify-between space-x-[120px] pb-6">
                                    <div className="flex flex-col">
                                      Advance:{" "}
                                      <span>
                                        {house.advance && ethers.utils.formatEther(house.advance.toString())} ETH
                                      </span>
                                    </div>
                                    <div className="flex flex-col">
                                      Initial Deposit:{" "}
                                      <span>
                                        {house.securityDeposit &&
                                          ethers.utils.formatEther(house.securityDeposit.toString())}{" "}
                                        ETH
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                      Min. Rent Bid: <span>1 ETH</span>
                                    </div>
                                    <Input
                                      value={bid}
                                      className="w-[50%]"
                                      type="number"
                                      placeholder="Place Your Bid for Rent"
                                      onChange={handleBidInput}
                                    />{" "}
                                  </div>
                                </div>
                                <Button className=" mx-auto w-fit flex justify-center">Place Bid</Button>
                              </CardContent>
                            )}
                          </Card>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
