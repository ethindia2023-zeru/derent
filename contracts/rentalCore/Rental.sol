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

    function getRentStatusByOwnerAddress(address _owner) external view {}

    // user functions
    function paySecurityDeposit(uint256 propertyId) external {}

    function payRent(uint256 propertyId) external {}

    // common functions
    function confirmOccupation(uint256 propertyId, bool isConfirmed) external {}

    function getAllPropertyListings() external view {}
}
