import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import snapshotGasCost from "@uniswap/snapshot-gas-cost";
import { parseEther } from "ethers/lib/utils";

describe("Rental", () => {
  async function deployContracts() {
    const [deployer, sender, receiver] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("Rental");
    const rentalContract = await contractFactory.deploy();

    //expect(await tokenContract.totalSupply()).to.eq(0);

    return { deployer, sender, receiver, rentalContract };
  }
  describe("Owner Specific functions", async () => {
    it("Should be able to add the property", async () => {
      const { deployer, sender, receiver, rentalContract } = await loadFixture(deployContracts);
      const days15 = 1296000;
      const securityDeposit = parseEther("100");
      const rent = parseEther("10");
      const waitingPeriod = days15;
      const location = "Banashankari";

      const id = await rentalContract.connect(sender).addListing(securityDeposit, rent, waitingPeriod, location);
      const properties = await rentalContract.getListingByOwnerAddress(sender.address);
      console.log("Properties:", properties);
      expect(properties[0].owner).to.eq(sender.address);
      expect(properties[0].securityDeposit).to.eq(securityDeposit);
      expect(properties[0].rent).to.eq(rent);
      expect(properties[0].waitingPeriod).to.eq(waitingPeriod);
    });

    it("Should be able to update the listing status to true", async () => {
      // this will reset the address and redeploy it so it will give 0 addresses
      const { deployer, sender, receiver, rentalContract } = await loadFixture(deployContracts);

      console.log("deployer is :", deployer.address, sender.address);
      await rentalContract.connect(sender).updateListingStatus(1, true);
      const properties = await rentalContract.getListingByOwnerAddress(sender.address);
      console.log("Properties:", properties);
      //   expect(properties[0].propertyListingStatus).to.eq(true);
      //   expect(properties[0].isReserved).to.eq(false);
      //   expect(properties[0].isConfirmedByOwner).to.eq(false);
      //   expect(properties[0].isConfirmedByTenant).to.eq(false);
      //   expect(properties[0].rentPaid).to.eq(false);
      //   expect(properties[0].tenant).to.eq(0);
    });

    // it("Should be able to update the listing status to false", async () => {
    //   const { deployer, sender, receiver, rentalContract } = await loadFixture(deployContracts);

    //   await rentalContract.connect(sender).updateListingStatus(1, false);
    //   const properties = await rentalContract.getListingByOwnerAddress(sender.address);
    //   //console.log("Properties:", properties);
    //   expect(properties[0].propertyListingStatus).to.eq(false);
    // });

    // it("Should be able to update the listing status to false", async () => {
    //   const { deployer, sender, receiver, rentalContract } = await loadFixture(deployContracts);

    //   expect(await rentalContract.connect(deployer).updateListingStatus(1, true)).should.be.reverted;
    //   //const properties = await rentalContract.getListingByOwnerAddress(sender.address);
    //   //console.log("Properties:", properties);
    //   //expect(properties[0].propertyListingStatus).to.eq(false);
    // });
  });
});
