// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storage {
    struct Property {
        uint256 propertyId;
        address owner;
        address tenant;
        uint256 securityDeposit;
        uint256 rent;
        uint256 waitingPeriod; // to claim the deposit and list it again
        string propertyLocation;
        bool isReserved;
        bool isConfirmedByTenant;
        bool isConfirmedByOwner;
        bool rentPaid;
        bool propertyListingStatus;
        bool securityDepositClaimedStatus;
        uint256 rentPaidTimestamp;
        uint256 securityDepositTimestamp;
    }
    uint256 totalProperties;
    mapping(uint256 => Property) propertyIdToProperty;
    mapping(address => uint256[]) ownerToPropertyIds;

    mapping(address => uint256) tenantsAdvance;
        mapping(address => uint256) tenantsSecurityDeposit;
    mapping(address => uint256) tenantsRent;

}
