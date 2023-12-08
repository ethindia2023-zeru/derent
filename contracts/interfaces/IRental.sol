// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Storage } from "../rentalCore/Storage.sol";

interface IRental {
    // owner functions
    struct AddListingStruct {
        uint256 propertyId;
        address owner;
        uint256 securityDeposit;
        uint256 rent;
        string location;
    }

    function addListing(
        uint256 propertyId,
        address owner,
        uint256 initialDeposit,
        uint256 rent,
        uint256 waitingPeriod,
        string memory location
    ) external;

    function updateListingStatus(uint256 propertyId, bool listingStatus) external;

    function claimSecurityDeposit(uint256 propertyId) external;

    function getListingByOwnerAddress(address _owner) external view returns (Storage.Property[] memory);

    function getRentStatus(uint256 propertyId) external view returns (bool);

    function getRentStatusByOwnerAddress(address _owner) external view;

    // user functions
    function paySecurityDeposit(uint256 propertyId) external;

    function payRent(uint256 propertyId) external;

    // common functions
    function confirmOccupation(uint256 propertyId, bool isConfirmed) external;

    function getAllPropertyListings() external view;
}
