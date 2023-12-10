"use client";
import Image from "next/image";
import { useState } from "react";
import { search, filter } from "@/assets";
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
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { GetTransactionProvider } from "@/helpers/wallet/GetTransactionProvider";
import { useToast } from "@/components/ui/use-toast";
import { loadPropertyListing } from "@/store/slices/homeSlice";
import { bidOnProperty } from "@/actions/bidOnProperty";
import { MdPriceCheck, MdOutlinePercent } from "react-icons/md";
import { noHuman } from "@/assets";
import { RiP2PFill } from "react-icons/ri";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bid, setBid] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const { toast } = useToast();

  const dispatch = useDispatch();
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
      toast({
        variant: "successful",
        title: "Transaction Success",
        description: "Transaction sent successfully",
      });
      console.log("success", success);

      dispatch(loadPropertyListing({ pro: signer?.provider }));
      setOpenDialog(!openDialog);
    } else {
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "Transaction failed",
      });
      console.log("failed");
    }
  };

  const handleBidOnProperty = async propertyId => {
    const success = await bidOnProperty(signer?.provider, propertyId, ethers.utils.parseEther(bid.toString()));
    if (success) {
      toast({
        variant: "successful",
        title: "Transaction Success",
        description: "Transaction sent successfully",
      });
      console.log("success", success);

      dispatch(loadPropertyListing({ pro: signer?.provider }));
      setOpenDialog(!openDialog);
    } else {
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "Transaction failed",
      });
      console.log("failed");
    }
  };

  const handleBidInput = e => {
    const { value } = e.target;
    const newBid = parseFloat(value);
    console.log("newBid: ", newBid);
    setBid(newBid);
  };

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <div className="w-full">
      {/* home section */}
      <div className="bg-shadcn-black text-shadcn-white py-8 mt-5">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-5 text-[#3BA8AA]">DERENT</h2>
          <h1 className="text-4xl text-[#F97D03] font-extrabold mb-8">Creating a Hassle-Free Renting Experience</h1>
          <div className="flex gap-2 text-lg justify-center mt-10 mb-7 bg-gray text-[#666362]">
            <div>
              <span className="text-shadcn-white flex justify-center items-center">
                <MdPriceCheck size={24} />
                <span>Price Discovery </span> |
              </span>
            </div>
            <div>
              <span className="text-shadcn-white flex justify-center items-center">
                <RiP2PFill /> Peer to Peer |
              </span>
            </div>
            <div>
              <span className="text-shadcn-white flex items-center justify-center">
                {" "}
                <MdOutlinePercent /> Zero Commission |
              </span>
            </div>
            <div>
              <span className="text-shadcn-white flex ">
                <Image width={24} src={noHuman}></Image> No Human Interaction
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* tab section */}
      <div></div>
      <div></div>
      <Tabs defaultValue="rent" className=" bg-transparent">
        <TabsList className="flex justify-center w-auto">
          <TabsTrigger className="w-[30%]" value="rent">
            Rent
          </TabsTrigger>
          <TabsTrigger className="w-[30%]" value="auction">
            Auction
          </TabsTrigger>
        </TabsList>
        <div className="relative mx-auto w-fit mb-10">
          <div className="absolute inset-y-0 left-2 flex items-center pl-2  cursor-pointer" onClick={handleSearch}>
            <Image src={search} alt="search" height={24} width={24} />
          </div>
          <input
            type="text"
            className="mx-auto pl-14 w-[817px] bg-transparent pr-4 py-4 border border-gray-300 outline-none"
            placeholder="Search"
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            onChange={handleInputChange}
          />
        </div>
        <TabsContent value="rent">
          <div className="mx-5 my-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 place-content-center w-full gap-1">
            {propertyListing &&
              Object.values(propertyListing)
                .filter(house => {
                  if (house.isReserved) return false;
                  if (house.propertyId == 0) return false;
                  if (house.isAuction) return false;
                  return true;
                })
                .map((house, index) => (
                  <Dialog key={index} open={openDialog} onOpenChange={handleOpenDialog}>
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
                                  Rent:{" "}
                                  <span>
                                    {house.rent &&
                                      parseFloat(ethers.utils.formatEther(house.rent.toString())).toFixed(2)}{" "}
                                    ETH
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  Advance:{" "}
                                  <span>
                                    {house.advance &&
                                      parseFloat(ethers.utils.formatEther(house.advance.toString())).toFixed(2)}{" "}
                                    ETH
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  Initial Deposit:{" "}
                                  <span>
                                    {house.securityDeposit &&
                                      parseFloat(ethers.utils.formatEther(house.securityDeposit.toString())).toFixed(
                                        2,
                                      )}{" "}
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
                  if (house.isReserved) return false;
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
                            {!auctionStarted && (
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
                                <Button
                                  className=" mx-auto w-fit flex justify-center"
                                  onClick={() => handleBidOnProperty(house.propertyId)}
                                >
                                  Place Bid
                                </Button>
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
      {/* search bar */}
    </div>
  );
}
