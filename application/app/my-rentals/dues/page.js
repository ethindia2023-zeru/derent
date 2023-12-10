"use client";

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
import { claimRent } from "@/actions/claimRent";
import { removeTenantFromProperty } from "@/actions/removeTenantFromProperty";

const page = () => {
  const dispatch = useDispatch();
  const propertyListing = useSelector(state => state.home.propertyListing);

  const { toast } = useToast();
  const signer = GetTransactionProvider();
  const { address } = useAccount();

  const handleClaimRent = async propertyId => {
    const success = await claimRent(signer?.provider, propertyId);
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

  const handleRemoveTenantFromProperty = async propertyId => {
    const success = await removeTenantFromProperty(signer?.provider, propertyId);
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
    <div>
      {propertyListing &&
        propertyListing
          .filter(property => {
            if (property.owner == address && property.isConfirmedOccupation) return true;
            return false;
          })
          .map((property, index) => (
            <Table className="w-fit mx-auto" key={index}>
              <TableCaption key={index} className="w-[900px]"></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>House</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Rent Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{property.propertyName}</TableCell>
                  <TableCell>{parseFloat(ethers.utils.formatEther(property.rent.toString())).toFixed(2)}</TableCell>
                  <TableCell>{property.rentPaid ? "Paid" : "Due"}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleClaimRent(property.propertyId)}>Claim Rent</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleRemoveTenantFromProperty(property.propertyId)}>Remove</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
    </div>
  );
};

export default page;
