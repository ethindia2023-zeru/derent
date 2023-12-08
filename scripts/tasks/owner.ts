import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
export async function testOwnerFunctions(testToken: Contract) {
  const [deployer, sender, receiver] = await ethers.getSigners();
  const days15 = 1296000;
  const securityDeposit = parseEther("100");
  const rent = parseEther("10");
  const waitingPeriod = days15;
  const location = "Banashankari";

  await testToken.connect(sender).addListing(securityDeposit, rent, waitingPeriod, location);
  console.log("added the listing");

  await testToken.connect(sender).updateListingStatus(1, true);
  console.log("updated the listing");

  await testToken.connect(receiver).paySecurityDeposit(1, { value: securityDeposit });
  console.log("after paying the security deposit");

  //   await testToken.connect(receiver).confirmOccupation(1, true);
  //   await testToken.connect(sender).confirmOccupation(1, true);
  //   console.log("occupation confirmed");

  //expect(await testToken.connect(deployer).updateListingStatus(1, false)).should.be.reverted;
  await testToken.connect(sender).claimSecurityDeposit(1);
  console.log("claimed the security deposit");

  const properties = await testToken.connect(sender).getListingByOwnerAddress(sender.address);
  console.log("properties of owner are", sender.address, properties);

  const rentStatus = await testToken.connect(sender).getRentStatus(1);
  console.log("rent status:", rentStatus);

  const rentInfo = await testToken.connect(sender).getRentStatusByOwnerAddress(sender.address);
  console.log("rentinfo:", rentInfo);
}
