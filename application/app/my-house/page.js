"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { payAdvance } from "@/actions/payAdvance";
import { GetTransactionProvider } from "@/helpers/wallet/GetTransactionProvider";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadPropertyListing } from "@/store/slices/homeSlice";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { payRent } from "@/actions/payRent";
import { leaveProperty } from "@/actions/leaveProperty";

const page = () => {
  const dispatch = useDispatch();
  const propertyListing = useSelector(state => state.home.propertyListing);

  const { toast } = useToast();
  const signer = GetTransactionProvider();
  const { address } = useAccount();

  const handlePayRent = async (propertyId, rent) => {
    const success = await payRent(signer?.provider, propertyId, rent);
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

  const handleLeaveProperty = async propertyId => {
    const success = await leaveProperty(signer?.provider, propertyId);
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
            if (property.tenant == address && property.isConfirmedOccupation) return true;
            return false;
          })
          .map((property, index) => (
            <div key={index} className="flex justify-center">
              <Card className="">
                <CardHeader className="">
                  <CardTitle>Rented</CardTitle>
                  <CardDescription>Pay your rent with just one click</CardDescription>
                </CardHeader>
                <CardContent className="w-[500px] flex flex-col space-between h-auto space-y-8">
                  <div className="grid grid-cols-3 place-content-center">
                    <div className="flex flex-col">
                      Name: <span>{property.propertyName}</span>
                    </div>
                    <div className="flex flex-col">
                      Advance: <span>{ethers.utils.formatEther(property.advance.toString())} ETH</span>
                    </div>
                    <div className="flex flex-col">
                      Initial Deposit: <span>{ethers.utils.formatEther(property.securityDeposit.toString())} ETH</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 place-content-cente">
                    <div className="flex flex-col">
                      Rent: <span>{ethers.utils.formatEther(property.rent.toString())} ETH</span>
                    </div>
                    <div className="flex flex-col">
                      Status <span>{property.rentPaid ? "Paid" : "Due"}</span>
                    </div>
                    <div className="flex flex-col">
                      Due Date:<span>12-10-2020</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center gap-6">
                  <Button className="" onClick={() => handlePayRent(property.propertyId, property.rent)}>
                    Pay Rent
                  </Button>
                  <Button className="" onClick={() => handleLeaveProperty(property.propertyId)}>
                    Leave
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
    </>
  );
};

export default page;
