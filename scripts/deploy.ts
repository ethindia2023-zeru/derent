import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { Rental__factory } from "../typechain";
import fs from "fs";
import { ChainIdsToNetwork } from "./ChainIds";
import { testOwnerFunctions } from "./tasks/owner";
async function main(): Promise<void> {
  const [deployer, owner, tenant]: Signer[] = await ethers.getSigners();
  const chainId: number = await ethers.provider.getNetwork().then(network => network.chainId);
  const chainName: string | undefined = ChainIdsToNetwork(chainId);
  console.log("Chain ID: ", ChainIdsToNetwork(chainId));
  console.log("Chain name: ", chainName);
  console.log("Deployer: ", await deployer.getAddress());
  const rentalContract: Contract = await new Rental__factory(deployer).deploy();
  console.log("Rental deployed to: ", rentalContract.address);

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
    address: rentalContract.address,
    deployer: await deployer.getAddress(),
  };
  //await testOwnerFunctions(rentalContract);
  // Add the address for the 'arbitrum' chain here
  // contractAddresses["Rental"]["arbitrum"] = {
  //   "address": rentalContract.address,
  //   "deployer": await deployer.getAddress()
  // };

  // Write the updated addresses back to the JSON file
  fs.writeFileSync("deployedAddresses.json", JSON.stringify(contractAddresses, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
