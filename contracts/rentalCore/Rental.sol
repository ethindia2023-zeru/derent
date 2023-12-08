// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { IRental } from "../interfaces/IRental.sol";
import { Storage } from "./Storage.sol";

contract Rental is IRental, Storage {
    function addListing(
        uint256 propertyId,
        address owner,
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
            false
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

    function getRentStatusByOwnerAddress(address _owner) external view {}

    // user functions
    function paySecurityDeposit(uint256 propertyId) external {}

    function payRent(uint256 propertyId) external {}

    // common functions
    function confirmOccupation(uint256 propertyId, bool isConfirmed) external {}

    function getAllPropertyListings() external view {}

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
