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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSearchTerm(value);
  };

  // a function to handle the search
  const handleSearch = () => {
    // logic for searching a home for rent
    console.log("searching for", searchTerm);
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
            {houseData.map(house => (
              <Dialog>
                <DialogTrigger>
                  <RentCard key={house.key} {...house} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rent House</DialogTitle>
                    <DialogDescription>
                      <Card>
                        <CardHeader>
                          <CardTitle>house.title</CardTitle>
                          <CardDescription>Pay the initial deposit and book your house</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-10">
                            <div className="flex flex-col">
                              Rent: <span>₹{house.price}</span>
                            </div>
                            <div className="flex flex-col">
                              Advance: <span>₹house.advance</span>
                            </div>
                            <div className="flex flex-col">
                              Initial Deposit: <span>₹{house.initialdeposit}</span>
                            </div>
                          </div>
                          <Button className=" mx-auto w-fit flex justify-center">Submit</Button>
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
            {auctionData.map(house => (
              <Dialog>
                <DialogTrigger>
                  <RentCard key={house.key} {...house} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Auction </DialogTitle>
                    <DialogDescription>
                      <Card>
                        <CardHeader>
                          <CardTitle>house.title</CardTitle>
                          <CardDescription>Please place your bid here</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between mb-10">
                            <div className="flex flex-col">
                              MinBid: <span>₹{house.minBid}</span>
                            </div>
                            <Input className=" w-[50%]" type="number" placeholder="Place Your Bid" />{" "}
                          </div>
                          <Button className=" mx-auto w-fit flex justify-center">Place Bid</Button>
                        </CardContent>
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
