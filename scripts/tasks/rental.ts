// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { testOwnerFunctions } from "./owner";
import { ChainIdsToNetwork } from "../ChainIds";
import { Rental__factory } from "../../typechain";
import fs from "fs";

async function main(): Promise<void> {
  const [deployer, owner, tenant]: Signer[] = await ethers.getSigners();
  const chainId: number = await ethers.provider.getNetwork().then(network => network.chainId);
  const chainName: string | undefined = ChainIdsToNetwork(chainId);
  console.log("Chain ID: ", ChainIdsToNetwork(chainId));
  console.log("Chain name: ", chainName);
  console.log("Deployer: ", await deployer.getAddress());
  const lendingPoolImpl: Contract = await new Rental__factory(deployer).deploy();
  console.log("Rental deployed to: ", lendingPoolImpl.address);

  // Read the existing JSON file
  let contractAddresses: any = {};
  try {
    contractAddresses = JSON.parse(fs.readFileSync("deployedAddresses.json", "utf8"));
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
  }

  // Append the address to the respective chain
  contractAddresses["Rental"] = contractAddresses["Rental"] || {};
  contractAddresses["Rental"][chainName] = {
    address: lendingPoolImpl.address,
    deployer: await deployer.getAddress(),
  };

  fs.writeFileSync("deployedAddresses.json", JSON.stringify(contractAddresses, null, 2));

  await testOwnerFunctions(lendingPoolImpl);
  //const properties = await testToken.getListingByOwnerAddress(sender.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
