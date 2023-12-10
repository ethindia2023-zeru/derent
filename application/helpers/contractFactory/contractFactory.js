import { ethers } from "ethers";
const rentalContractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "propertyName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tenant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "advance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "securityDeposit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rent",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "waitingPeriodSecurityDeposit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "propertyLocation",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rentPaidTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "securityDepositTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isAuction",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "highestBidderTenant",
        type: "address",
      },
    ],
    name: "listingAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tenant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isReserved",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timeStamp",
        type: "uint256",
      },
    ],
    name: "securityDepositPaidEvent",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "advance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "securityDeposit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "waitingPeriodSecurityDeposit",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isAuction",
        type: "bool",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "propertyName",
        type: "string",
      },
    ],
    name: "addListing",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "newBid",
        type: "uint256",
      },
    ],
    name: "bidOnProperty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "claimRent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "confirmOccupation",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "getAdvanceDueDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPropertyListings",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "propertyId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "propertyName",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "tenant",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "advance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "securityDeposit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "waitingPeriodSecurityDeposit",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "propertyLocation",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isReserved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isConfirmedByTenant",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isConfirmedByOwner",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isConfirmedOccupation",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "rentPaid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "propertyListingStatus",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "securityDepositClaimedStatus",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "rentPaidTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "securityDepositTimestamp",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isAuction",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "bid",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "highestBidderTenant",
            type: "address",
          },
        ],
        internalType: "struct Storage.Property[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "getBidWinnerForProperty",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "getDueDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getIsAuction",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "getListingByOwnerAddress",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "propertyId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "propertyName",
            type: "string",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "tenant",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "advance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "securityDeposit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rent",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "waitingPeriodSecurityDeposit",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "propertyLocation",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isReserved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isConfirmedByTenant",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isConfirmedByOwner",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isConfirmedOccupation",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "rentPaid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "propertyListingStatus",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "securityDepositClaimedStatus",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "rentPaidTimestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "securityDepositTimestamp",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isAuction",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "bid",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "highestBidderTenant",
            type: "address",
          },
        ],
        internalType: "struct Storage.Property[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "getRentStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getRentStatusByOwnerAddress",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "leaveProperty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "payRent",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "paySecurityDeposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "raiseDisputeSecurityDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "propertyId",
        type: "uint256",
      },
    ],
    name: "removeTenantFromProperty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
export const RentalContract = (pro, rentalContractAddress) =>
  new ethers.Contract(rentalContractAddress, rentalContractAbi, pro);
