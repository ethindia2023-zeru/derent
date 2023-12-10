"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const page = () => {
  const propertyListing = useSelector(state => state.home.propertyListing);
  const { address } = useAccount();

  return (
    <>
      <Table className="w-fit mx-auto">
        <TableCaption className="w-[900px]"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>House</TableHead>
            <TableHead>Rent</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {propertyListing &&
            propertyListing
              .filter(property => {
                if (property.owner == address && !property.isConfirmedOccupation) return true;
                return false;
              })
              .map((property, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{property.propertyName}</TableCell>
                  <TableCell>{parseFloat(ethers.utils.formatEther(property.rent.toString())).toFixed(2)}</TableCell>
                  <TableCell>{property.isAuction ? "Auction" : "Rent"}</TableCell>
                  <TableCell>{property.isConfirmedOccupation ? "Rented" : "UnRented"}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
};

export default page;
