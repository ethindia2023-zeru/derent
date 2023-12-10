// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { IRental } from "../interfaces/IRental.sol";
import { Storage } from "./Storage.sol";

contract Rental is IRental, Storage {
    //auction
    function startAuction() external {
        auctionStarted = !auctionStarted;
    }

    function bidOnProperty(uint256 propertyId, uint256 newBid) external {
        Property storage property = propertyIdToProperty[propertyId];
        require(auctionStarted, "Error: Auction not started");
        require(property.isAuction, "Error: Property not on auction");
        require(!property.isReserved, "already reserved cannot bid");
        if (property.bid < newBid) {
            property.bid = newBid;
            property.highestBidderTenant = msg.sender;
        }
    }

    function getBidWinnerForProperty(uint256 propertyId) external view returns (address) {
        Property memory property = propertyIdToProperty[propertyId];
        require(property.isAuction, "Error: Property not on auction");
        require(!auctionStarted, "Error: Auction not stopped");
        return property.highestBidderTenant;
    }

    function getIsAuction() external view returns (bool) {
        return auctionStarted;
    }

    event listingAdded(
        uint256 indexed propertyId,
        address indexed owner,
        string propertyName,
        address tenant,
        uint256 advance,
        uint256 securityDeposit,
        uint256 rent,
        uint256 waitingPeriodSecurityDeposit,
        string propertyLocation,
        uint256 rentPaidTimestamp,
        uint256 securityDepositTimestamp,
        bool isAuction,
        uint256 bid,
        address highestBidderTenant
    );

    // owner functions
    function addListing(
        uint256 advance,
        uint256 securityDeposit,
        uint256 rent,
        uint256 waitingPeriodSecurityDeposit,
        bool isAuction,
        string memory location,
        string memory propertyName
    ) external override {
        Property memory property = Property(
            ++totalProperties,
            propertyName,
            msg.sender,
            address(0),
            advance,
            securityDeposit,
            rent,
            waitingPeriodSecurityDeposit,
            location,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            0,
            0,
            isAuction,
            0,
            address(0)
        );
        emit listingAdded(
            totalProperties,
            msg.sender,
            propertyName,
            address(0),
            advance,
            securityDeposit,
            rent,
            waitingPeriodSecurityDeposit,
            location,
            0,
            0,
            isAuction,
            0,
            address(0)
        );
        propertyIdToProperty[totalProperties] = property;
        ownerToPropertyIds[msg.sender].push(totalProperties);
    }

    // function updateListingStatus(uint256 propertyId, bool listingStatus) external override {
    //     Property storage property = propertyIdToProperty[propertyId];
    //     require(msg.sender == property.owner, "Only owner can update the listing status");
    //     property.propertyListingStatus = listingStatus;
    //     if (listingStatus) {
    //         property.isReserved = false;
    //         property.isConfirmedByOwner = false;
    //         property.isConfirmedByTenant = false;
    //         property.rentPaid = false;
    //         property.tenant = address(0);
    //     }
    //     emit updateListingStatusEvent(propertyId, property.owner, listingStatus);
    // }

    function claimRent(uint256 propertyId) external override {
        Property memory property = propertyIdToProperty[propertyId];
        require(msg.sender == property.owner, "Only owner can claim the rent");
        require(property.rentPaid == true, "Error: Rent not paid");
        require(block.timestamp - property.rentPaidTimestamp > 1 seconds, "Error: Waiting period not over");

        // rent amount is already inside this rental contract just transfer it to owner
        require(tenantsRent[msg.sender] <= 0, "Error: Rent not paid");
        bool sent = payable(msg.sender).send(property.rent);
        require(sent, "Failed to send Ether");
        tenantsRent[msg.sender] = 0;
        property.rentPaidTimestamp = block.timestamp;
    }

    function raiseDisputeSecurityDeposit(uint256 propertyId) external {
        Property memory property = propertyIdToProperty[propertyId];
        require(msg.sender == property.owner, "Only the contract owner can call this function");
        //require(property.isConfirmedOccupation, "Tenant has not confirmed the occupation by paying advance");
        require((block.timestamp - property.securityDepositTimestamp) >= 1 seconds, "Waiting period not over");
        require(tenantsSecurityDeposit[property.tenant] > 0, "Tenant has not paid the security deposit");
        bool sent = payable(msg.sender).send(property.securityDeposit);
        require(sent, "Failed to send Ether");
    }

    event securityDepositPaidEvent(
        uint256 indexed propertyId,
        address indexed owner,
        address indexed tenant,
        bool isReserved,
        uint256 amount,
        uint256 timeStamp
    );

    // user functions
    function paySecurityDeposit(uint256 propertyId) external payable {
        Storage.Property storage property = propertyIdToProperty[propertyId];
        //require(property.isConfirmedByTenant, "Tenant has not confirmed the occupation");
        //require(property.isConfirmedByOwner, "Owner has not confirmed the occupation");
        require(!property.isReserved, "Property already reserved!");
        require(property.securityDeposit <= msg.value, "Insufficient security deposit amount");
        property.tenant = msg.sender;
        property.isReserved = true;
        property.securityDepositTimestamp = block.timestamp;
        tenantsSecurityDeposit[msg.sender] = msg.value;
        emit securityDepositPaidEvent(
            propertyId,
            property.owner,
            property.tenant,
            property.isReserved,
            property.securityDeposit,
            property.securityDepositTimestamp
        );
    }

    function payRent(uint256 propertyId) external payable {
        Storage.Property storage property = propertyIdToProperty[propertyId];
        require(property.isConfirmedByTenant, "Tenant has not confirmed the occupation");
        require(property.isConfirmedByOwner, "Owner has not confirmed the occupation");
        require(!property.rentPaid, "Rent has already been paid");
        require(property.rent <= msg.value, "Insufficient rent amount");
        property.rentPaid = true;
        tenantsRent[msg.sender] = msg.value;
    }

    function confirmOccupation(uint256 propertyId) external payable {
        Storage.Property storage property = propertyIdToProperty[propertyId];
        require(msg.sender == property.tenant, "Only the reserved tenant can call this function");
        require(msg.value >= property.advance, "Insufficient advance amount");

        property.isConfirmedOccupation = true;
        property.isConfirmedByOwner = true;
        property.isConfirmedByTenant = true;
        property.rentPaidTimestamp = block.timestamp;
    }

    function leaveProperty(uint256 propertyId) external {
        Storage.Property storage property = propertyIdToProperty[propertyId];
        require(msg.sender == property.tenant, "Only the property tenant can call this function");
        require(
            !(block.timestamp - property.rentPaidTimestamp < 1 seconds),
            "Cannot leave property after 60 days of not paying the rent"
        );
        // send security deposit to the owner
        bool sent = payable(property.owner).send(property.securityDeposit);
        require(sent, "Failed to send security deposit to owner");
        property.securityDeposit = 0;
        uint256 advance = tenantsAdvance[msg.sender];
        tenantsAdvance[msg.sender] = 0;
        sent = payable(property.owner).send((advance * 2000) / 10000);
        require(sent, "Failed to send 20% advance to owner");
        sent = payable(msg.sender).send((advance * 8000) / 10000);
        require(sent, "Failed to send 80% advance to tenant");
        property.tenant = address(0);
        property.isConfirmedOccupation = false;
        property.isReserved = false;
        property.propertyListingStatus = true;
    }

    function removeTenantFromProperty(uint256 propertyId) external {
        Storage.Property storage property = propertyIdToProperty[propertyId];
        require(msg.sender == property.owner, "Only the property owner can call this function");
        //require(block.timestamp - property.rentPaidTimestamp > 60 days, "You cannot remove tenant before 60 days");
        require(block.timestamp - property.rentPaidTimestamp > 1 seconds, "You cannot remove tenant before 60 days");
        // send security deposit to the owner
        bool sent = payable(property.owner).send(property.securityDeposit);
        require(sent, "Failed to send security deposit to owner");
        property.securityDeposit = 0;
        uint256 advance = tenantsAdvance[msg.sender];
        tenantsAdvance[msg.sender] = 0;
        sent = payable(property.owner).send(advance);
        require(sent, "Failed to send 100% advance to owner");
        property.tenant = address(0);
        property.isConfirmedOccupation = false;
        property.isReserved = false;
        property.propertyListingStatus = true;
    }

    //commonGetFunctions
function getAllPropertyListings() external view returns (Storage.Property[] memory) {
    Storage.Property[] memory properties = new Storage.Property[](totalProperties+1);
    for (uint256 i = 1; i <= totalProperties; i++) {
        Storage.Property storage property = propertyIdToProperty[i];
        properties[i] = property;
    }
    return properties;
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
        uint256[] memory rentPaid = new uint256[](ownerToPropertyIds[owner].length);
        uint256[] memory rentNotPaid = new uint256[](ownerToPropertyIds[owner].length);
        uint256[] memory propertyIds = ownerToPropertyIds[owner];

        for (uint256 i = 0; i < propertyIds.length; i++) {
            Storage.Property storage property = propertyIdToProperty[propertyIds[i]];
            require(property.owner == msg.sender, "Only owner can view the rent status");

            if (property.rentPaid) {
                rentPaid[i] = propertyIds[i];
            } else {
                rentNotPaid[i] = propertyIds[i];
            }
        }

        return (rentPaid, rentNotPaid);
    }

    function getDueDate(uint256 propertyId) external view returns (uint256) {
        Property memory property = propertyIdToProperty[propertyId];
        return property.rentPaidTimestamp + 30 days;
    }

    function getAdvanceDueDate(uint256 propertyId) external view returns (uint256) {
        Property memory property = propertyIdToProperty[propertyId];
        return property.securityDepositTimestamp + 15 days;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
