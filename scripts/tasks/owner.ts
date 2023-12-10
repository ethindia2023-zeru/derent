import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";
import { parseEther } from "ethers/lib/utils";
export async function testOwnerFunctions(testToken: Contract) {
  const [deployer, owner, tenant] = await ethers.getSigners();
  const advance = parseEther("10");
  const securityDeposit = parseEther("1");
  const rent = parseEther("5");
  const days15 = 1296000;
  const waitingPeriod = days15;
  const location = "Banashankari";
  const propertyName = "House Name";

  //1.
  // owner adds the property not for auction
  // tenant pays security deposit
  // tenant confirms occupation by paying advance
  // tenant pays rent
  // owner claim rent
  await testToken
    .connect(deployer)
    .addListing(advance, securityDeposit, rent, waitingPeriod, false, location, propertyName);
  console.log("added the listing");

  // await testToken.connect(tenant).paySecurityDeposit(1, { value: securityDeposit });
  // console.log("after paying the security deposit");

  // await testToken.connect(tenant).confirmOccupation(1, { value: advance });
  // console.log("occupation confirmed by paying rent");

  // await testToken.connect(tenant).payRent(1, { value: rent });
  // console.log("rent paid");

  // await testToken.connect(owner).claimRent(1);
  // console.log("rent claimed my owner");

  // //2.
  // // owner adds the property not for auction
  // // tenant pays the security deposit
  // // tenant will not confirm the occupation
  // // owner will claim the security deposit by calling
  // //raiseDisputeSecurityDeposit

  // await testToken
  //   .connect(owner)
  //   .addListing(advance, securityDeposit, rent, waitingPeriod, false, location, propertyName);
  // console.log("added the listing");

  // await testToken.connect(tenant).paySecurityDeposit(2, { value: securityDeposit });
  // console.log("after paying the security deposit");

  // //await testToken.connect(tenant).confirmOccupation(1, { value: advance });
  // console.log("occupation not confirmed by tenant");

  // await testToken.connect(owner).raiseDisputeSecurityDeposit(2);
  // console.log("security deposit claimed my owner");

  // //3.
  // // owner adds the property for auction
  // // tenant pays security deposit
  // // tenant confirms occupation by paying advance
  // // tenant pays rent
  // // owner claim rent
  // // tenant doesn't pay the rent
  // // owner claim the advance amount
  // // added to the auction
  // // tenant 2 bids on the auction
  // // wins, bid on property, getBit winner for property

  // await testToken
  //   .connect(owner)
  //   .addListing(advance, securityDeposit, rent, waitingPeriod, true, location, propertyName);
  // console.log("added the listing");

  // await testToken.connect(tenant).paySecurityDeposit(3, { value: securityDeposit });
  // console.log("after paying the security deposit");

  // await testToken.connect(tenant).confirmOccupation(3, { value: advance });
  // console.log("occupation confirmed by paying rent");

  // await testToken.connect(tenant).payRent(3, { value: rent });
  // console.log("rent paid");

  // await testToken.connect(owner).claimRent(3);
  // console.log("rent claimed my owner");

  // console.log("tenant doesn't pay the rent for 2 months");

  // await testToken.connect(owner).removeTenantFromProperty(3);
  // console.log("tenant removed by owner");

  // await testToken.startAuction();
  // console.log("property automatically added for auction price");

  // await testToken.connect(owner).bidOnProperty(3, parseEther("11"));
  // console.log("tenant 2 bid 11 ETH on the property");

  // await testToken.startAuction();
  // console.log("auction stopped");

  // let bidder = await testToken.connect(owner).getBidWinnerForProperty(3);
  // console.log("winner of the bid", bidder);

  // //4.
  // // owner adds the property for auction
  // // tenant pays security deposit
  // // tenant confirms occupation by paying advance
  // // tenant pays rent
  // // owner claim rent
  // // tenant doesn't pay the rent
  // // tenant leaves the property
  // // added to the auction
  // // tenant 2 bids on the auction
  // // wins, bid on property, getBit winner for property

  // await testToken
  //   .connect(owner)
  //   .addListing(advance, securityDeposit, rent, waitingPeriod, true, location, propertyName);
  // console.log("added the listing");

  // await testToken.connect(tenant).paySecurityDeposit(4, { value: securityDeposit });
  // console.log("after paying the security deposit");

  // await testToken.connect(tenant).confirmOccupation(4, { value: advance });
  // console.log("occupation confirmed by paying rent");

  // await testToken.connect(tenant).payRent(4, { value: rent });
  // console.log("rent paid");

  // await testToken.connect(owner).claimRent(4);
  // console.log("rent claimed my owner");

  // console.log("tenant leaves the property");

  // await testToken.connect(tenant).leaveProperty(4);
  // console.log("tenant removed by owner");

  // await testToken.startAuction();
  // console.log("property automatically added for auction price");

  // await testToken.connect(owner).bidOnProperty(4, parseEther("11"));
  // console.log("tenant 2 bid 11 ETH on the property");

  // await testToken.startAuction();
  // console.log("auction stopped");

  // bidder = await testToken.connect(owner).getBidWinnerForProperty(4);
  // console.log("winner of the bid", bidder);

  // //get all properties listing
  // const allProperties = await testToken.getAllPropertyListings();
  // console.log("All properties are :", allProperties);

  // // get listing by owneraddress
  // const allPropertiesByOwner = await testToken.getListingByOwnerAddress(owner.address);
  // console.log("AllPropertiesByOwner are :", allPropertiesByOwner);

  // // get rent status
  // const rentStatus = await testToken.getRentStatus(1);
  // console.log("getRentStatus 1 :", rentStatus);

  // // get rent status by owneraddress
  // const rentStatusByOwnerAddress = await testToken.connect(owner).getRentStatusByOwnerAddress(owner.address);
  // console.log("rentStatusByOwnerAddress  :", rentStatusByOwnerAddress);

  // //get due date
  // const dueDate = await testToken.getDueDate(1);
  // console.log("dueDate  :", dueDate);

  // // get advance due date
  // const dueDateAdvance = await testToken.getAdvanceDueDate(1);
  // console.log("dueDateAdvance  :", dueDateAdvance);
}
