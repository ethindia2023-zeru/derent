import { ethers } from "ethers";
import rental_abi from "@/artifacts/contracts/rentalCore/Rental.sol/Rental.json";

export const RentalContract = (pro, rentalContractAddress) =>
  new ethers.Contract(rentalContractAddress, rental_abi.abi, pro);
