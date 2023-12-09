import { ethers } from "ethers"
import rental_abi from "@/artifacts/contracts/rentalCore/Rental.sol/Rental.json"

export const RentalContract = (pro) =>
    new ethers.Contract('0x7c2C195CD6D34B8F845992d380aADB2730bB9C6F', rental_abi.abi, pro)

// export const TestToken = (rental_address, pro) =>
//     new ethers.Contract(rental_address, rental_abi.abi, pro)
