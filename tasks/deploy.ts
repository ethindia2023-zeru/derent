import { task } from "hardhat/config";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { Rental__factory } from "../typechain";
import fs from "fs";

task("deploy", "Deploy lending pool for dev enviroment").setAction(async ({}, localBRE) => {
  await localBRE.run("set-DRE");

  const [deployer, owner, tenant]: Signer[] = await ethers.getSigners();
  const chainName: string = ethers.provider.network.name;
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
  // Add the address for the 'arbitrum' chain here
  // contractAddresses["Rental"]["arbitrum"] = {
  //   "address": lendingPoolImpl.address,
  //   "deployer": await deployer.getAddress()
  // };

  // Write the updated addresses back to the JSON file
  fs.writeFileSync("deployedAddresses.json", JSON.stringify(contractAddresses, null, 2));
});
