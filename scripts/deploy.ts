// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { registerContractInJsonDb } from "../helpers/contract-helpers";
import { testOwnerFunctions } from "./tasks/owner";

async function main(): Promise<void> {
  const mnemonic: string = process.env.MNEMONIC || "";
  // Hardhat always runs the compile task when running scripts through it.
  // If this runs in a standalone fashion you may want to call compile manually
  // to make sure everything is compiled
  // await run("compile");
  // We get the contract to deploy
  const TestTokenFactory: ContractFactory = await ethers.getContractFactory("Rental");
  const deployer = ethers.Wallet.fromMnemonic(mnemonic);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", balance, deployer.address);
  const rentalContract: Contract = await TestTokenFactory.deploy();
  await rentalContract.deployed();
  await testOwnerFunctions(deployer, rentalContract);
  //await registerContractInJsonDb(rentalContract.toUpperCase(), rentalContract);
  const balance1 = await ethers.provider.getBalance(deployer.address);
  console.log("Balance After:", balance1);
  console.log("Rental deployed to: ", rentalContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
