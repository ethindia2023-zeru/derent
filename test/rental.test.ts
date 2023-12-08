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
  describe("Add Property", async () => {
    it("Should be able to add the property", async () => {
      const { deployer, sender, receiver, rentalContract } = await loadFixture(deployContracts);
      const days15 = 1296000;
      const securityDeposit = parseEther("100");
      const rent = parseEther("10");
      const waitingPeriod = days15;
      const location = "Banashankari";

      await rentalContract.connect(sender).addListing(securityDeposit, rent, waitingPeriod, location);
      const properties = await rentalContract.getListingByOwnerAddress(sender.address);
      console.log("Properties:", properties);
      expect(properties[0].owner).to.eq(sender.address);
      expect(properties[0].securityDeposit).to.eq(securityDeposit);
      expect(properties[0].rent).to.eq(rent);
      expect(properties[0].waitingPeriod).to.eq(waitingPeriod);
    });
  });
});
