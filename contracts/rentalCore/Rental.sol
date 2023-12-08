// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { IRental } from "../interfaces/IRental.sol";
import { Storage } from "./Storage.sol";

contract Rental is IRental, Storage {
    function addListing(
        uint256 securityDeposit,
        uint256 rent,
        uint256 waitingPeriod,
        string memory location
    ) external override {
        Property memory property = Property(
            ++totalProperties,
            msg.sender,
            address(0),
            securityDeposit,
            rent,
            waitingPeriod,
            location,
            true,
            false,
            false,
            false,
            true,
            false,
            0,
            0
        );
        propertyIdToProperty[totalProperties] = property;
        ownerToPropertyIds[msg.sender].push(totalProperties);
    }

    function updateListingStatus(uint256 propertyId, bool listingStatus) external override {
        Property storage property = propertyIdToProperty[propertyId];
        require(msg.sender == property.owner, "Only owner can update the listing status");
        property.propertyListingStatus = listingStatus;
        if (listingStatus) {
            property.isReserved = false;
            property.isConfirmedByOwner = false;
            property.isConfirmedByTenant = false;
            property.rentPaid = false;
            property.tenant = address(0);
        }
    }

    function claimSecurityDeposit(uint256 propertyId) external override {
        Property memory property = propertyIdToProperty[propertyId];
        require(msg.sender == property.owner, "Only owner can claim the security deposit");
        require(property.isConfirmedByTenant == false, "Error: Already Confirmed by tenant");
        require(property.isConfirmedByOwner == false, "Error: Already Confirmed by owner");
        // security amount is already inside this rental contract just transfer it to owner
        bool sent = payable(msg.sender).send(property.securityDeposit);
        require(sent, "Failed to send Ether");
        tenantsSecurityDeposit[msg.sender] = 0;
    }

    function claimRent (uint256 propertyId) external override {
        Property memory property = propertyIdToProperty[propertyId];
        require(msg.sender == property.owner, "Only owner can claim the rent");
        require(property.rentPaid == true, "Error: Rent not paid");
        require(property.rentPaidTimestamp + property.waitingPeriod <= block.timestamp, "Error: Waiting period not over");
        // rent amount is already inside this rental contract just transfer it to owner
        require(tenantsRent[msg.sender] <= 0, "Error: Rent not paid");
        bool sent = payable(msg.sender).send(property.rent);
        require(sent, "Failed to send Ether");
        tenantsRent[msg.sender] = 0;
    }

    function raiseDispute (uint256 propertyId) internal {
        Property memory property = propertyIdToProperty[propertyId];
    }

    function getListingByOwnerAddress(address _owner) external view override returns (Property[] memory) {
        uint256[] memory propertyIds = ownerToPropertyIds[_owner];
        Property[] memory properties = new Property[](propertyIds.length);
        for (uint256 i = 0; i < propertyIds.length; i++) {
            properties[i] = propertyIdToProperty[propertyIds[i]];
        }
        return properties;
    }

    function getRentStatus(uint256 propertyId) external view override returns (bool) {
        Property memory property = propertyIdToProperty[propertyId];
        return property.rentPaid;
    }

    function getRentStatusByOwnerAddress(address owner) external view returns (uint256[] memory, uint256[] memory) {
        // get rent status of each property
        uint256[] memory rentPaid;
        uint256[] memory rentNotPaid;
        uint256[] memory propertyIds = ownerToPropertyIds[owner];
        for(uint256 i = 0; i < propertyIds.length; i++){
            Storage.Property storage property = propertyIdToProperty[propertyIds[i]];
            require(property.owner <= msg.sender, "Only owner can view the rent status");
            if(property.rentPaid){
                rentPaid[i] = propertyIds[i];
            }
            else{
                rentNotPaid[i] = propertyIds[i];
            }
        }
        return (rentPaid, rentNotPaid);
    }

    // user functions
    function paySecurityDeposit(uint256 propertyId) external payable{
        Storage.Property storage property = propertyIdToProperty[propertyId];
        require(property.isConfirmedByTenant, "Tenant has not confirmed the occupation");
        require(property.isConfirmedByOwner, "Owner has not confirmed the occupation");
        require(!property.isReserved, "Security deposit has already been paid");
        require(property.securityDeposit <= msg.value, "Insufficient security deposit amount");
        property.tenant = msg.sender;
        property.isReserved = true;
        property.securityDepositTimestamp = block.timestamp;
        tenantsSecurityDeposit[msg.sender] = msg.value;
    }

    function payRent(uint256 propertyId) external payable{
        Storage.Property storage property = propertyIdToProperty[propertyId];
        require(property.isConfirmedByTenant, "Tenant has not confirmed the occupation");
        require(property.isConfirmedByOwner, "Owner has not confirmed the occupation");
        require(!property.rentPaid, "Rent has already been paid");
        require(property.rent <= msg.value, "Insufficient rent amount");
        property.rentPaid = true;
        property.rentPaidTimestamp = block.timestamp;
        tenantsRent[msg.sender] = msg.value;
    }

    // common functions
    function confirmOccupation(uint256 propertyId, bool isConfirmed) external {
        Storage.Property storage property = propertyIdToProperty[propertyId];

        if(msg.sender == property.owner) {
            property.isConfirmedByOwner = isConfirmed;
            return;
        }
        else if(msg.sender == property.tenant) {
            property.isConfirmedByTenant = isConfirmed;
            return;
        }
        else{
            revert("You are not authorized to confirm occupation");
        }
    }

    function getAllPropertyListings() external view returns (Storage.Property[] memory){
        Storage.Property[] memory properties = new Storage.Property[](totalProperties);
        for(uint256 i = 0; i < totalProperties; i++){
            Storage.Property storage property = propertyIdToProperty[i];
            properties[i] = property;
        }
        return properties;
    }
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
