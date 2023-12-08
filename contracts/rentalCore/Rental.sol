// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { IRental } from "../interfaces/IRental.sol";
import { Storage } from "./Storage.sol";

contract Rental is IRental, Storage {
    function addListing(
        uint256 propertyId,
        address owner,
        uint256 initialDeposit,
        uint256 rent,
        string memory location
    ) external {}

    function updateListingStatus(uint256 propertyId) external {}

    function claimSecurityDeposit(uint256 propertyId) external {}

    function getListingByOwnerAddress(address _owner) external view {}

    function getRentStatus(uint256 propertyId) external view {}

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
    }

    function payRent(uint256 propertyId) external payable{
        Storage.Property storage property = propertyIdToProperty[propertyId];
        require(property.isConfirmedByTenant, "Tenant has not confirmed the occupation");
        require(property.isConfirmedByOwner, "Owner has not confirmed the occupation");
        require(!property.rentPaid, "Rent has already been paid");
        require(property.rent <= msg.value, "Insufficient rent amount");
        property.rentPaid = true;
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
}
