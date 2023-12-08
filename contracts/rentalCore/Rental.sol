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
        string memory location
    ) external {
        Property memory property = Property(
            ++totalProperties,
            msg.sender,
            address(0),
            securityDeposit,
            rent,
            location,
            true,
            false,
            false,
            false,
            true,
            false
        );
        ownerToPropertyIds[msg.sender].push(property);
    }

    function updateListingStatus(uint256 propertyId, bool isReserved, bool listingStatus) external {
        Property storage property = propertyIdToProperty[propertyId];
        property.propertyListingStatus = listingStatus;
        if (listingStatus) {
            property.isReserved = false;
            property.isConfirmedByOwner = false;
            property.isConfirmedByTenent = false;
            property.rentPaid = false;
            property.tenant = address(0);
        }
    }

    function claimSecurityDeposit(uint256 propertyId) external {
        Property memory property = propertyIdToProperty[propertyId];
        require(msg.sender == property.owner, "Only owner can claim the security deposit");
        require(property.isConfirmedByTenant == false, "Error: Already Confirmed by tenant");
        require(property.isConfirmedByOwner == false, "Error: Already Confirmed by owner");
        // security amount is already inside this rental contract just transfer it to owner
        bool sent = payable(msg.sender).send(property.securityDeposit);
        require(sent, "Failed to send Ether");
    }

    function getListingByOwnerAddress(address _owner) external view returns (Property[] memory) {
        uint256[] propertyIds = ownerToPropertyIds[_owner];
        Property[] memory properties = new Property[](propertyIds);
        for (uint256 i = 0; i < propertyIds; i++) {
            properties[i] = propertyIdToProperty[propertyIds[i]];
        }
        return properties;
    }

    function getRentStatus(uint256 propertyId) external view {}

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
