"use client";
import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { payAdvance } from "@/actions/payAdvance";
import { GetTransactionProvider } from "@/helpers/wallet/GetTransactionProvider";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadPropertyListing } from "@/store/slices/homeSlice";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

const page = () => {
  const [advancePay, setAdvancePay] = useState(false);

  const dispatch = useDispatch();
  const propertyListing = useSelector(state => state.home.propertyListing);

  const { toast } = useToast();
  const signer = GetTransactionProvider();
  const { address } = useAccount();

  const handlePayAdvance = async (propertyId, advance) => {
    const success = await payAdvance(signer?.provider, propertyId, advance);
    if (success) {
      toast({
        variant: "successful",
        title: "Transaction Success",
        description: "Transaction sent successfully",
      });
      console.log("success", success);

      dispatch(loadPropertyListing({ pro: signer?.provider }));
    } else {
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "Transaction failed",
      });
      console.log("failed");
    }
  };

  return (
    <>
      {propertyListing &&
        propertyListing
          .filter(property => {
            if (property.tenant == address && !property.isConfirmedOccupation) return true;
            return false;
          })
          .map((property, index) => (
            <div>
              <Card className="w-auto" key={index}>
                <CardHeader className="">
                  <CardTitle>Advance</CardTitle>
                  <CardDescription>Pay your advance here</CardDescription>
                </CardHeader>
                <CardContent className="w-[500px] flex flex-col space-between h-auto space-y-8">
                  <div className="grid grid-cols-3 place-content-center">
                    <div className="flex flex-col">
                      Name <span>{property.propertyName}</span>
                    </div>
                    <div className="flex flex-col">
                      Advance <span>{ethers.utils.formatEther(property.advance.toString())} ETH</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 place-content-cente">
                    <div className="flex flex-col">
                      Due Date<span>12-10-2020</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="">
                  <Button className="" onClick={() => handlePayAdvance(property.propertyId, property.advance)}>
                    Pay Advance
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
    </>
  );
};

export default page;
