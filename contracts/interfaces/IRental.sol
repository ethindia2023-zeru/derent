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
        uint256 advance,
        uint256 initialDeposit,
        uint256 rent,
        uint256 waitingPeriodSecurityDeposit,
        bool isAuction,
        string memory location,
        string memory propertyName
    ) external;

    // function updateListingStatus(uint256 propertyId, bool listingStatus) external;

    function claimRent(uint256 propertyId) external;

    function getListingByOwnerAddress(address _owner) external view returns (Storage.Property[] memory);

    function getRentStatus(uint256 propertyId) external view returns (bool);

    function getRentStatusByOwnerAddress(address _owner) external view returns (uint256[] memory, uint256[] memory);

    // user functions
    function paySecurityDeposit(uint256 propertyId) external payable;

    function payRent(uint256 propertyId) external payable;

    // common functions
    function confirmOccupation(uint256 propertyId) external payable;

    function getAllPropertyListings() external view returns (Storage.Property[] memory);
}
