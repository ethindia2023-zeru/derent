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
        }
    }

    function claimSecurityDeposit(uint256 propertyId) external {}

    function getListingByOwnerAddress(address _owner) external view {}

    function getRentStatus(uint256 propertyId) external view {}

    function getRentStatusByOwnerAddress(address _owner) external view {}

    // user functions
    function paySecurityDeposit(uint256 propertyId) external {}

    function payRent(uint256 propertyId) external {}

    // common functions
    function confirmOccupation(uint256 propertyId, bool isConfirmed) external {}

    function getAllPropertyListings() external view {}
}
